/*
    Carousel pattern initiator followed by the component.
*/

Pathways.Gallery = function() {

    $('body').on('click', '[data-component="gallery"]', function(e) {

        var $overlay    = $('<div class="overlay"></div>'),
            $close      = $('<div class="close"></div>');

        $overlay.css('height', window.innerHeight );

        $('body').append( $overlay );

        $overlay.show();
        $overlay.css('background-color', 'rgba(0,0,0,0.8)');

        setTimeout(function() {
            // Load the carousel
            var $div = $('<div class="carousel"></div>');
            $overlay.append($div);

            var carousel = new Carousel(".carousel");
            carousel.init();

            $overlay.append( $close );
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

    });

}

function Carousel(element)
{
    var self            = this,
        _element        = document.querySelector(element),
        element         = $(element),
        $prev           = null,
        $next           = null,

        container       = null,
        panes           = null,

        widths          = [],
        heights         = [],
        ratios          = [],

        pane_width      = 0,
        pane_count      = 0,
        current_pane    = 0,
        total_offset    = (window.innerWidth / 2);


    /**
     * initial
     */
    this.init = function() {
        // Load the images, run the rest of the logic after all the images have loaded via anonymous callback function.
        loadImages(function() {

            // reset
            container   = $(">ul", element);
            panes       = $(">ul>li", element);
            pane_count  = panes.length;

            loadNavigation();

            _element.querySelector('ul').style['-webkit-transform'] = 'translate('+ (total_offset - (widths[0] / 2)) +'px,0)';
            setPaneDimensions();

            panes.css('opacity', 0.4);
            panes.first().css('opacity', 1);
        });

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
        })
    };

    var loadImages = function(callback) {
        var ul              = document.createElement('ul'),
            totalImages     = imageDB.length,
            imagesLoaded    = 0;

        ul.style['height'] = window.innerHeight + 'px';

        imageDB.forEach(function(obj) {
            var li  = document.createElement('li'),
                img = new Image();

            img.src = '/_assets/img/mesmer/carousel/' + obj.image + '.jpg';
            img.style['height'] = '100%';
            li.style['height']  = '100%';

            li.appendChild(img);

            if( obj.text ) {
                var span = document.createElement('span'),
                    txt = document.createTextNode(obj.text);

                span.classList.add('text');
                span.appendChild(txt);
                li.appendChild(span);
            }

            ul.appendChild(li);

            img.onload = function(elm) {
                imagesLoaded++;

                if( imagesLoaded == totalImages ) {
                    // resize the panes/container
                    var _panes      = _element.querySelectorAll('li'),
                        totalWidth  = 0;

                    for(var i = 0; i < _panes.length; i++) {
                        var w = parseInt( window.getComputedStyle(_panes[i]).width ),
                            h = parseInt( window.getComputedStyle(_panes[i]).height );
                        
                        widths.push(w);
                        heights.push(h);
                        ratios.push( (w / h) );

                        _panes[i].style['width'] = w + 'px';

                        totalWidth += w;
                    }
                    ul.style['width'] = totalWidth + 'px';

                    callback.call();
                }
            }
        });

        _element.appendChild(ul);

        container = $(ul);
    }

    var loadNavigation = function() {
        $prev   = $('<div/>'),
        $next  = $('<div/>');

        $prev.addClass('prev');
        $next.addClass('next');

        $prev.css({
            'left':     0,
            'height':   window.innerHeight + 'px',
        });

        $next.css({
            'right':    0,
            'height':   window.innerHeight + 'px',
        });

        element.append($prev);
        element.append($next);

        $prev.on('click', function() {
            self.prev();
        });

        $next.on('click', function() {
            self.next();
        });
    }

    /**
     * set the pane dimensions and scale the container
     */
    function setPaneDimensions() {
        var $ul         = element.find('ul'),
            total_width = 0;

        widths  = [];
        heights = [];

        console.log(ratios);
        
        for (var i = 0; i < panes.length; i++) {
            var newHeight = window.innerHeight,
                newWidth  = ratios[i] * window.innerHeight;

            // panes[i].style['height']    = newHeight + 'px';
            panes[i].style['width']     = newWidth + 'px';

            widths.push(newWidth);
            heights.push(newHeight);

            total_width += newWidth;
        };
        
        container.width(total_width);
        total_offset = (window.innerWidth / 2);

        pane_width = parseInt(total_width / panes.length);

        // Heights
        $ul.css('height', window.innerHeight);
        container.css('height', window.innerHeight);

        $prev.height( window.innerHeight );
        $next.height( window.innerHeight );

        self.showPane(current_pane, false);
    };


    /**
     * show pane by index
     */
    this.showPane = function(index, animate) {
        var offset  = 0,
            count   = 0;

        // between the bounds
        index           = Math.max(0, Math.min(index, pane_count-1));
        current_pane    = index;

        for (var i = 0; i < index; i++) {
            offset -= widths[i];
        };

        offset += (total_offset - (widths[index] / 2));

        panes.css('opacity', 0.4);
        panes.get(current_pane).style['opacity'] = 1;

        setContainerOffset(offset, animate);
    };

    function setContainerOffset(percent, animate) {
        container.removeClass("animate");

        if(animate) {
            container.addClass("animate");
        }

        container.css("transform", "translate3d("+ percent +"px,0,0)");
    }

    this.next = function() { return this.showPane(current_pane+1, true); };
    this.prev = function() { return this.showPane(current_pane-1, true); };


    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch(ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                var pane_offset = 0,
                    count       = 0;

                for (var i = 0; i < current_pane; i++) {
                    pane_offset -= widths[i];
                };

                pane_offset += (total_offset - (widths[current_pane] / 2));

                var drag_offset = ((100/440)*ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                if((current_pane == 0 && ev.gesture.direction == "right") ||
                    (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
                    drag_offset *= .4;
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
                if(Math.abs(ev.gesture.deltaX) > ( (pane_width / 10) * 3 )) {
                    if(ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                }
                else {
                    self.showPane(current_pane, true);
                }
                break;
        }
    }

    new Hammer(element[0], { drag_lock_to_axis: true }).on("release dragleft dragright swipeleft swiperight", handleHammer);
}

var imageDB = [
    {
        image: 'L0000475',
        text: 'Here is some test text. Lorem ipsum is for suckers!'
    },
    {
        image: 'L0000477EA',
    },
    {
        image: 'L0028102',
        text: 'Here is some test text. Lorem ipsum is for suckers!'
    },
    {
        image: 'V0011934',
        text: 'Here is some test text. Lorem ipsum is for suckers!'
    },
];
