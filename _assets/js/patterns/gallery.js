/*
    Carousel pattern initiator followed by the component.
*/
Pathways.components.gallery = function(element, data) {
    var $elem = $(element),
        $panel = $elem.closest('.panel'),
        panelId = $panel.attr('id');

    $(element).on('click', function(e) {

        var $overlay = $('<div class="overlay"></div>'),
            $close = $('<div class="close"></div>'),
            $loading = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');

        $overlay.css('height', window.innerHeight);

        $('body').append($overlay);

        $overlay.show();
        $overlay.css('background-color', 'rgba(0,0,0,0.8)');

        $overlay.append($loading);

        $loading.css({
            position: 'absolute',
            top: ((window.innerHeight / 2) - 12),
            left: ((window.innerWidth / 2) - 35)
        });

        // prevent scrolling
        $('body').addClass('modal-open');

        setTimeout(function() {
            // Load the carousel
            var $div = $('<div class="carousel"></div>');
            $overlay.append($div);

            var carousel = new Carousel(".carousel", data);
            carousel.init();

            $overlay.append($close);
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            $('body').removeClass('modal-open');

            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

    });

};

function Carousel(element, data) {

    if (typeof data === 'undefined') return console.warn('No gallery data provided');

    var self = this,
        _element = document.querySelector(element),
        $element = $(element),
        $prev = null,
        $next = null,

        $container = null,
        $panes = null,

        images = data.images,
        location = data.location,

        widths = [],
        ratios = [],

        pane_width = 0,
        pane_count = 0,
        current_pane = 0,
        total_offset = (window.innerWidth / 2);


    /**
     * initial
     */
    this.init = function() {

        // Steps to loading the carousel:
        // - Set up the carousel container
        // - Load the first image.
        // - On load, calculate dimensions of the image, update the container, set local width vars, move the container so the image is in the centre.
        // - Load the navigation
        // - Load rest of the images sequentially in the onload event of the previous one.
        // - Update the container and local variables on each load, keeping the carousel in the correct place.

        // Create the container
        $container = $('<ul/>');
        $container.height(window.innerHeight);

        $element.append($container);

        // Load the first image
        var imagesCopy = [].concat(images);
        var first = imagesCopy[0];

        loadImage(first, function() {
            loadNavigation();

            $panes = $element.find('li');
            pane_count = $panes.length;

            $container.css('transform', 'translate(' + (total_offset - (widths[0] / 2)) + 'px,0)');
            setPaneDimensions();

            imagesCopy.shift();

            // load the rest of the images
            loadImages(imagesCopy);
        });

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
        });
    };

    /*
     * Load an image and take a function to call once the image has finished asynchronously loading
     */
    var loadImage = function(obj, callback) {
        var img = new Image(),
            $li = $('<li/>'),
            $img;

        img.src = '/_assets/img/' + location + obj.image + '.jpg';

        img.onload = function() {
            $img = $(img);
            $img.css('height', '100%');

            $li.append($img);

            // add potential text
            if (obj.text) {
                var $child = $('<div>' + obj.text + '</div>').addClass('text');

                $li.append($child);
            }

            // what is the ratio of the image?
            var w = img.naturalWidth,
                h = img.naturalHeight,
                ratio = (h / w),
                newWidth = window.innerHeight / ratio;

            // store the width and ratio for resize recalculations
            widths.push(newWidth);
            ratios.push(ratio);

            // set the panel to the image's width
            $li.width(newWidth);

            // Add it to the container
            $container.append($li);

            // calculate and set the width of the whole container
            var total = widths.reduce(function(a, b) {
                return a + b;
            });

            $container.width(total);

            if (callback)
                callback.call();
        };
    };

    /*
     * Takes an array of image objects and recursively sets up a callback chain to load in images sequentially
     */
    var loadImages = function(images) {
        if (images.length) {
            loadImage(images[0], function() {
                $panes = $element.find('li');
                pane_count = $panes.length;
                setPaneDimensions();

                images.shift();

                loadImages(images);
            });
        }
    };

    /*
     * load the navigation into the carousel
     */
    var loadNavigation = function() {
        $prev = $('<div/>'),
            $next = $('<div/>');

        $prev.addClass('prev disabled');
        $next.addClass('next');

        $prev.css({
            'left': 0,
            'height': window.innerHeight + 'px',
        });

        $next.css({
            'right': 0,
            'height': window.innerHeight + 'px',
        });

        $element.append($prev);
        $element.append($next);

        new Hammer($prev[0]).on("tap", function() {
            self.prev();
        });

        new Hammer($next[0]).on("tap", function() {
            self.next();
        });
    };

    /**
     * set the pane dimensions and scale the container
     */
    function setPaneDimensions() {
        var total_width = 0,
            wH = window.innerHeight;

        widths = [];

        for (var i = 0; i < $panes.length; i++) {
            var newWidth = wH / ratios[i];

            $panes[i].style['width'] = newWidth + 'px';

            widths.push(newWidth);

            total_width += newWidth;
        }

        $container.width(total_width);
        total_offset = (window.innerWidth / 2);

        pane_width = parseInt(total_width / $panes.length);

        // Set the container and navigation links to the height of the screen.
        $container.css('height', wH);

        $prev.height(wH);
        $next.height(wH);

        self.showPane(current_pane, false);
    }


    /**
     * show pane by index
     */
    this.showPane = function(index, animate) {
        var offset = 0,
            count = 0;

        // between the bounds
        index = Math.max(0, Math.min(index, pane_count - 1));
        current_pane = index;

        for (var i = 0; i < index; i++) {
            offset -= widths[i];
        }

        offset += (total_offset - (widths[index] / 2));

        $panes.css('opacity', 0.4);
        $panes.get(current_pane).style['opacity'] = 1;

        setContainerOffset(offset, animate);

        if (index > 0)
            $prev.removeClass('disabled');
        else {
            $prev.addClass('disabled');
        }

        if (index >= (pane_count - 1))
            $next.addClass('disabled');
        else {
            $next.removeClass('disabled');
        }
    };

    /*
     * Move the whole list of panels by x. Animation optional.
     */
    function setContainerOffset(x, animate) {
        $container.removeClass("animate");

        if (animate) {
            $container.addClass("animate");
        }

        if (Modernizr.csstransforms3d)
            $container.css("transform", "translate3d(" + x + "px,0,0)");
        else
            $container.css("transform", "translate(" + x + "px,0)");
    }

    this.next = function() {
        return this.showPane(current_pane + 1, true);
    };
    this.prev = function() {
        return this.showPane(current_pane - 1, true);
    };


    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch (ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                var pane_offset = 0,
                    count = 0;

                for (var i = 0; i < current_pane; i++) {
                    pane_offset -= widths[i];
                }

                pane_offset += (total_offset - (widths[current_pane] / 2));

                var drag_offset = ((100 / 440) * ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                if ((current_pane === 0 && ev.gesture.direction == "right") ||
                    (current_pane == pane_count - 1 && ev.gesture.direction == "left")) {
                    drag_offset *= 0.4;
                }

                setContainerOffset(ev.gesture.deltaX + pane_offset);
                break;

            case 'swipeleft':
                self.next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                self.prev();
                ev.gesture.stopDetect();
                break;

            case 'release':
                // more then 30% moved, navigate
                if (Math.abs(ev.gesture.deltaX) > ((pane_width / 10) * 3)) {
                    if (ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                } else {
                    self.showPane(current_pane, true);
                }
                break;
        }
    }

    new Hammer($element[0], {
        drag_lock_to_axis: true
    }).on("release dragleft dragright swipeleft swiperight", handleHammer);
}
