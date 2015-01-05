var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};
console.log('include carousel');


(function(exports, w, getEventListener, imgLoader, Hamr, Mod, $) {
    'use strict';

    var doc = w.document;

    function Carousel($element, data, getPaneView) {

        if (typeof data === 'undefined') return console.warn('No Carousel data provided');
        getPaneView = getPaneView || getDefaultPaneView;

        var self = this,
            $prev = null,
            $next = null,

            $container = null,
            $panes = null,



            paneDataList = data.panes || data.images,
            location = data.location,


            widths = [],
            ratios = [],

            averagePaneWidth = 0,
            paneCount = 0,
            currentIndex = 0,
            totalOffset = (w.innerWidth / 2),
            totalWidth = 0;


        this.init = function() {

            createContainer();

            var imageLoader = imgLoader.getImageLoader(location);

            createPanes(paneDataList, imageLoader);

            $(w).on("load resize orientationchange", function() {
                updateViewDimensions();
                self.showPane(currentIndex, false);
            });
        };

        function createContainer() {
            $container = $('<ul/>');
            $container.height(w.innerHeight);

            $element.append($container);
        }

        function createNavigation() {
            $prev = $('<div/>');
            $next = $('<div/>');

            $prev.addClass('prev disabled');
            $next.addClass('next');

            $prev.css({
                'left': 0,
                'height': w.innerHeight + 'px',
            });

            $next.css({
                'right': 0,
                'height': w.innerHeight + 'px',
            });

            $element.append($prev);
            $element.append($next);

            new Hamr($prev[0]).on("tap", function() {
                self.prev();
            });

            new Hamr($next[0]).on("tap", function() {
                self.next();
            });
        }

        function createPanes(paneDataList, imageLoader) {
            imageLoader.loadImages(paneDataList, onImageLoad);
        }



        function onImageLoad(img, data) {
            $container.append(getPaneView(img, data));

            addRatio(img);

            $panes = $container.find('li');
            paneCount = $panes.length;
            if (paneCount === 1) { //TODO: more robust check for first image load
                createNavigation();
                $container.css('transform', 'translate(' + (totalOffset - (widths[0] / 2)) + 'px,0)');
            }

            updateViewDimensions();
            self.showPane(currentIndex, false);
        }

        function getDefaultPaneView(img, data) {
            var $li = $('<li/>'),
                $img = $(img);

            $li.append($img);

            return $li;
        }

        function addRatio(img) {
            // store the ratio for resize recalculations
            ratios.push(img.naturalHeight / img.naturalWidth);
        }



        function updateViewDimensions() {

            updatePaneDimensions();
            // Set the container and navigation links to the height of the screen.
            updateContainerDimension(totalWidth, w.innerHeight);

            updateNavigationDimensions(w.innerHeight);
        }


        /**
         * set the pane dimensions and scale the container
         */
        function updatePaneDimensions() {
            var windowHeight = w.innerHeight,
                windowWidth = w.innerWidth;

            widths = [];
            totalWidth = 0;

            for (var i = 0; i < $panes.length; i++) {
                var newWidth = parseInt((windowHeight / ratios[i]), 10),
                    $pane = $($panes[i]);

                if (newWidth >= windowWidth) {
                    newWidth = windowWidth;
                    $pane.addClass('full-width');
                } else {
                    $pane.addClass('full-height');
                }

                $pane.width(newWidth);

                widths.push(newWidth);

                totalWidth += newWidth;
            }


            totalOffset = (windowWidth / 2);

            averagePaneWidth = parseInt((totalWidth / $panes.length), 10);
        }

        function updateContainerDimension(width, height) {
            $container.width(width);
            $container.height(height);
        }

        function updateNavigationDimensions(height) {
            $prev.height(height);
            $next.height(height);
        }




        function updateViewState(index, doAnimate) {
            updatePaneState(index);
            updateContainerOffset(index, doAnimate);
            updateNavigationState(index);
        }

        function updatePaneState(index) {
            $panes.css('opacity', 0.4);
            $panes.get(index).style['opacity'] = 1;
        }

        /*
         * Move the whole list of panels by x. Animation optional.
         */
        function updateContainerOffset(index, animate) {
            var x = 0;

            for (var i = 0; i < index; i++) {
                x -= widths[i];
            }

            x += (totalOffset - (widths[index] / 2));

            $container.removeClass("animate");

            if (animate) {
                $container.addClass("animate");
            }

            if (Mod.csstransforms3d)
                $container.css("transform", "translate3d(" + x + "px,0,0)");
            else
                $container.css("transform", "translate(" + x + "px,0)");
        }


        function updateNavigationState(index) {
            if (index > 0)
                $prev.removeClass('disabled');
            else {
                $prev.addClass('disabled');
            }

            if (index >= (paneCount - 1))
                $next.addClass('disabled');
            else {
                $next.removeClass('disabled');
            }
        }


        function getNavigationView($element, ctrl) {
            var $prev, $next;

            return {
                create: function createNavigation() {
                    $prev = $('<div/>');
                    $next = $('<div/>');

                    $prev.addClass('prev disabled');
                    $next.addClass('next');

                    $prev.css({
                        'left': 0,
                        'height': w.innerHeight + 'px',
                    });

                    $next.css({
                        'right': 0,
                        'height': w.innerHeight + 'px',
                    });

                    $element.append($prev);
                    $element.append($next);

                    new Hamr($prev[0]).on("tap", function() {
                        ctrl.prev();
                    });

                    new Hamr($next[0]).on("tap", function() {
                        ctrl.next();
                    });
                },
                update: function updateNavigationState(index) {
                    if (index > 0)
                        $prev.removeClass('disabled');
                    else {
                        $prev.addClass('disabled');
                    }

                    if (index >= (paneCount - 1))
                        $next.addClass('disabled');
                    else {
                        $next.removeClass('disabled');
                    }
                },
                updateDimensions: function updateNavigationDimensions(height) {
                    $prev.height(height);
                    $next.height(height);
                }
            };
        }


        /**
         * show pane by index
         */
        this.showPane = function(index, doAnimate) {
            var count = 0;

            // between the bounds
            index = Math.max(0, Math.min(index, paneCount - 1));
            currentIndex = index;

            updateViewState(currentIndex, doAnimate);

        };
        this.next = function() {
            return this.showPane(currentIndex + 1, true);
        };
        this.prev = function() {
            return this.showPane(currentIndex - 1, true);
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

                    for (var i = 0; i < currentIndex; i++) {
                        pane_offset -= widths[i];
                    }

                    pane_offset += (totalOffset - (widths[currentIndex] / 2));

                    var drag_offset = ((100 / 440) * ev.gesture.deltaX) / paneCount;

                    // slow down at the first and last pane
                    if ((currentIndex === 0 && ev.gesture.direction == "right") ||
                        (currentIndex == paneCount - 1 && ev.gesture.direction == "left")) {
                        drag_offset *= 0.4;
                    }

                    updateContainerOffset(ev.gesture.deltaX + pane_offset);
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
                    if (Math.abs(ev.gesture.deltaX) > ((averagePaneWidth / 10) * 3)) {
                        if (ev.gesture.direction == 'right') {
                            self.prev();
                        } else {
                            self.next();
                        }
                    } else {
                        self.showPane(currentIndex, true);
                    }
                    break;
            }
        }

        new Hamr($element[0], {
            drag_lock_to_axis: true
        }).on("release dragleft dragright swipeleft swiperight", handleHammer);

    }

    exports.carousel = {
        Carousel: Carousel,
        getCarousel: function(element, data, getPaneView) {

            var eve = getEventListener();
            eve.addListener('update', function(index){ console.log('index', index); });
            eve.emit('update', 3);

            return new Carousel(element, data, getPaneView);
        }
    };

}(Pathways.components.core, window, Pathways.core.events.getEventListener, Pathways.components.core.imageLoader, Hammer, Modernizr, jQuery));
