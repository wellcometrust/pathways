var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};

(function(exports, w, utils, $) {

    function OverlayCtrl(onInitCallback, onCloseCallback) {

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

        function getCloseHandler($el, onCloseCb) {
            return function() {
                $root.removeClass(activeClass);
                if (typeof onCloseCb !== 'undefined') onCloseCb();
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

        function init($el, onInitHandler, onClickHandler) {
            $el.on('click', onClickHandler);

            w.setTimeout(function() {
                // prevent scrolling
                $root.addClass(activeClass);
                if (typeof onInitHandler !== 'undefined') onInitHandler();

            }, 50); // delay before adding class to ensure transition event will fire
        }

        this.$close = $(closeTmpl);
        this.$overlay = create(overlayTmpl, $root, this.$close);
        this.closeHandler = getCloseHandler(this.$overlay, onCloseCallback);
        var clickHandler = getClickHandler(this.$overlay, this.$close, this.closeHandler);

        init(this.$overlay, onInitCallback, clickHandler);

    }

    exports.overlay = {
        OverlayCtrl: OverlayCtrl,
        getOverlay: function(onInitHandler, onClickHandler) {
            return new OverlayCtrl(onInitHandler, onClickHandler).$overlay;
        },
        getCtrl: function(onInitHandler, onClickHandler) {
            return new OverlayCtrl(onInitHandler, onClickHandler);
        }
    };

}(Pathways.components.core, window, Pathways.utils, jQuery));
