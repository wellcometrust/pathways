var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};
console.log('include carousel');


(function(exports, w, getEventListener, imgLoader, Hamr, Mod, $) {
    'use strict';

    var doc = w.document;

    function getCarouselCtrl($element, data, _paneCtrlFactory) {

        if (typeof data === 'undefined') return console.warn('No Carousel data provided');


        var navCtrl = null,
            containerCtrl = null,
            paneCtrl = null,

            paneCtrlFactory = _paneCtrlFactory,

            currentIndex = 0;

        var ob = Object.create(getEventListener());

        function setPaneCtrlIndices(index, doAnimate) {
            containerCtrl.setPaneIndex(index, doAnimate);
            paneCtrl.setPaneIndex(index);
            navCtrl.setPaneIndex(index);
        }

        ob.init = function init() {
            containerCtrl = getContainerCtrl($element, this);
            containerCtrl.create();

            navCtrl = getNavigationCtrl($element, this);

            paneCtrl = getPanesCtrl(containerCtrl.getElement(), this, data, paneCtrlFactory, function() {
                // console.log('first loaded');
                navCtrl.create();
                ob.setPaneIndex(ob.getCurrentIndex(), false);
            });
            paneCtrl.create();

            $(w).on("resize orientationchange", function() {
                ob.resize();
                ob.reset(false);
            });
        };
        ob.setPaneIndex = function setPaneIndex(index, doAnimate) {
            var count = 0;

            // between the bounds
            index = Math.max(0, Math.min(index, paneCtrl.getPaneCount() - 1));
            setPaneCtrlIndices(index, doAnimate);

            currentIndex = index;
            this.emit('setPaneIndex', index, doAnimate);
        };
        ob.updateCtrls = function updateCtrls(doAnimate) {
            setPaneCtrlIndices(currentIndex, doAnimate);
        };
        ob.resize = function resize() {
            paneCtrl.resize();
            containerCtrl.resize(paneCtrl.getTotalWidth(), w.innerHeight);
            navCtrl.resize(w.innerHeight);
        };
        ob.next = function next() {
            return this.setPaneIndex(currentIndex + 1, true);
        };
        ob.prev = function prev() {
            return this.setPaneIndex(currentIndex - 1, true);
        };
        ob.getCurrentIndex = function getCurrentIndex() {
            return currentIndex;
        };
        ob.setFactory = function setFactory(factory) {
            paneCtrlFactory = factory;
        };

        ob.setOffset = function setOffset(x, animate) {
            containerCtrl.updateOffset(x, animate);
        };

        ob.getOffsetAtIndex = function getOffsetAtIndex(index) {
            return paneCtrl.getPanesOffsetAtIndex(index);
        };
        ob.getPaneCount = function getPaneCount() {
            return paneCtrl.getPaneCount();
        };
        ob.getAveragePaneWidth = function getAveragePaneWidth() {
            return paneCtrl.getAveragePaneWidth();
        };
        ob.reset = function reset(doAnim){
            doAnim = (typeof doAnim === 'boolean') ? doAnim : true;
            containerCtrl.updateOffset(paneCtrl.getPanesOffsetAtIndex(currentIndex), doAnim);
        };

        return ob;

    }

    function getPanesCtrl($container, ctrl, data, paneCtrlFactory, onFirst) {
        var $panes = null,
            paneDataList = data.panes || data.images,
            location = data.location,

            panes = [],
            paneCount = 0,
            totalOffset = (w.innerWidth / 2),
            totalWidth = 0;

        function addPane($pane) {
            $container.append($pane);
        }

        return {
            create: function() {

                panes = paneDataList.map(function(paneData, index) {
                    var pane = paneCtrlFactory(paneData, index, function onReady(pane) {
                        if (typeof onFirst === 'function') onFirst.call();
                        onFirst = null;
                        ctrl.resize();
                    }).create();

                    addPane(pane.getPane());
                    return pane;
                });


                paneCount = panes.length;
            },
            setPaneIndex: function(index) {
                panes.forEach(function(pane) {
                    pane.setIndex(index);
                });
            },
            resize: function(height) {

                panes.forEach(function(pane) {
                    pane.resize();
                });

                totalWidth = panes.map(function(pane) {
                    return pane.getWidth();
                }).reduce(function(last, curr){
                    return last + curr;
                });

                var windowWidth = w.innerWidth;

                totalOffset = (windowWidth / 2);
            },


            getPaneCount: function() {
                return paneCount;
            },

            getAveragePaneWidth: function() {
                return parseInt((totalWidth / paneCount), 10);
            },
            getTotalWidth: function() {
                return totalWidth;
            },
            getPanesOffsetAtIndex: function(index) {
                var offset = 0;
                for (var i = 0; i < index; i++) {
                    offset -= panes[i].getWidth();
                }
                offset += (totalOffset - (panes[index].getWidth() / 2));
                return offset;
            }
        };
    }

    function getContainerCtrl($element, ctrl) {
        var $container;

        return {
            create: function() {
                $container = $('<ul/>');
                $container.height(w.innerHeight);

                $element.append($container);
            },
            setPaneIndex: function(index, animate) {
                this.updateOffset(ctrl.getOffsetAtIndex(index), animate);
            },
            updateOffset: function(x, animate) {
                $container.removeClass("animate");

                if (animate) {
                    $container.addClass("animate");
                }

                if (Mod.csstransforms3d)
                    $container.css("transform", "translate3d(" + x + "px,0,0)");
                else
                    $container.css("transform", "translate(" + x + "px,0)");
            },
            resize: function(width, height) {
                $container.width(width);
                $container.height(height);
            },
            getElement: function() {
                return $container;
            }
        };
    }


    function getNavigationCtrl($element, ctrl) {
        var $prev, $next;

        return {
            create: function create() {
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
                    // console.log('hammr prev');
                    ctrl.prev();
                });

                new Hamr($next[0]).on("tap", function() {
                    // console.log('hammr next');
                    ctrl.next();
                });
            },
            setPaneIndex: function setPaneIndex(index) {
                if (index > 0)
                    $prev.removeClass('disabled');
                else {
                    $prev.addClass('disabled');
                }

                if (index >= (ctrl.getPaneCount() - 1))
                    $next.addClass('disabled');
                else {
                    $next.removeClass('disabled');
                }
            },
            resize: function resize(height) {
                $prev.height(height);
                $next.height(height);
            }
        };
    }




    function initHammer(ctrl, $element) {


        function handleHammer(ev) {
            // disable browser scrolling
            // console.log('hamr', ev.type);
            ev.gesture.preventDefault();

            var currentIndex = ctrl.getCurrentIndex(),
                paneCount = ctrl.getPaneCount(),
                averagePaneWidth = ctrl.getAveragePaneWidth();

            switch (ev.type) {
                case 'dragright':
                case 'dragleft':
                    // stick to the finger
                    var x = ctrl.getOffsetAtIndex(currentIndex);

                    var drag_offset = ((100 / 440) * ev.gesture.deltaX) / paneCount;

                    // slow down at the first and last pane
                    if ((currentIndex === 0 && ev.gesture.direction == "right") ||
                        (currentIndex == paneCount - 1 && ev.gesture.direction == "left")) {
                        drag_offset *= 0.4;
                    }

                    ctrl.setOffset(ev.gesture.deltaX + x);
                    break;

                case 'swipeleft':
                    ctrl.next();
                    ev.gesture.stopDetect();
                    break;

                case 'swiperight':
                    ctrl.prev();
                    ev.gesture.stopDetect();
                    break;

                case 'release':
                    // more then 30% moved, navigate
                    if (Math.abs(ev.gesture.deltaX) > ((averagePaneWidth / 10) * 3)) {
                        if (ev.gesture.direction == 'right') {
                            ctrl.prev();
                        } else {
                            ctrl.next();
                        }
                    } else {
                        ctrl.reset();
                    }
                    break;
            }
        }

        new Hamr($element[0], {
            drag_lock_to_axis: true
        }).on("release dragleft dragright swipeleft swiperight", handleHammer);
    }

    exports.carousel = {
        //Carousel: Carousel,
        getCarousel: function(element, data, paneCtrlFactory) {

            var ctrl = getCarouselCtrl(element, data, paneCtrlFactory);

            initHammer(ctrl, element);

            return ctrl;

            // return new Carousel(element, data, getPaneCtrl);
        }
    };

}(Pathways.components.core, window, Pathways.core.events.getEventListener, Pathways.components.core.imageLoader, Hammer, Modernizr, jQuery));
