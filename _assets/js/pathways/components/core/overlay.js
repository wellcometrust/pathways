var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};

(function(exports, w, getEventListener, utils, $) {

    function getOverlayCtrl() {

        var rootSel = 'body',
            activeClass = 'modal-open',
            closeTmpl = '<div class="close"></div>',
            overlayTmpl = '<div class="overlay"></div>',

            $root = $(rootSel);


        function create(tmpl, $root, $close) {
            var $el = $(tmpl);
            $el.append($close);
            $root.append($el);
            return $el;
        }

        function getCloseHandler($el, ctrl) {
            return function() {
                $root.removeClass(activeClass);
                ctrl.emit('close');
                w.setTimeout(function() {
                    $el.remove();
                }, 1000); // give css transition time
            };
        }

        function getClickHandler($el, $close, onCloseHandler) {
            return function(e) {
                if (e.target == $el[0] || e.target == $close[0]) { // only if we've clicked on overlay or close btn
                    onCloseHandler();
                }
            };
        }

        function init($el, ctrl, onClickHandler) {
            $el.on('click', onClickHandler);

            w.setTimeout(function() {
                // prevent scrolling
                $root.addClass(activeClass);

                ctrl.emit('init');
            }, 50); // delay before adding class to ensure transition event will fire
        }



        var ctrl = Object.create(getEventListener());
        ctrl.$close = $(closeTmpl);
        ctrl.$overlay = create(overlayTmpl, $root, ctrl.$close);
        ctrl.closeHandler = getCloseHandler(ctrl.$overlay, ctrl);

        var clickHandler = getClickHandler(ctrl.$overlay, ctrl.$close, ctrl.closeHandler);

        init(ctrl.$overlay, ctrl, clickHandler);

        return ctrl;
    }

    exports.overlay = {
        // OverlayCtrl: OverlayCtrl,
        getOverlay: function(onInitHandler, onClickHandler) {
            var overlay = getOverlayCtrl();
            overlay.on('close', onClickHandler);
            overlay.on('init', onInitHandler);
            return overlay.$overlay;
        },
        getCtrl: function(onInitHandler, onClickHandler) {
            var overlay = getOverlayCtrl();
            overlay.on('close', onClickHandler);
            overlay.on('init', onInitHandler);
            return overlay;
        }
    };

}(Pathways.components.core, window, Pathways.core.events.getEventListener, Pathways.utils, jQuery));
