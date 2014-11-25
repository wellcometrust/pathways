var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};

(function(w, exports, utils, $) {

    function OverlayCtrl() {
        var rootSel = 'body',
            activeClass = 'modal-open',
            closeTmpl = '<div class="close"></div>',
            overlayTmpl = '<div class="overlay"></div>',

            $root = $(rootSel);

        function addDocListeners(resizeHandler) {
            $(w).on('resize', resizeHandler);
        }

        function removeDocListeners(resizeHandler) {
            $(w).off('resize', resizeHandler);
        }

        function getResizeHandler($overlay) {
            return function() {
                $overlay.css('height', utils.getHeightWithOffset(0));
            };

        }

        function create(tmpl, $root, $close) {
            var $el = $(tmpl);
            $el.append($close);
            $root.append($el);
            return $el;
        }

        function init($el, onInitHandler, onClickHandler) {

            var resizeHandler = getResizeHandler($el);
            //addDocListeners(resizeHandler);

            $el.on('click', function() {
                $root.removeClass(activeClass);

                if (typeof onClickHandler !== 'undefined') onClickHandler();

                w.setTimeout(function() {
                    $el.remove();
                    // removeDocListeners(resizeHandler);
                }, 1000); // give css transition time
            });

            w.setTimeout(function() {
                // prevent scrolling
                $root.addClass(activeClass);

                if (typeof onInitHandler !== 'undefined') onInitHandler();
                //resizeHandler();

            }, 50); // delay before adding class to ensure transition event will fire


        }

        this.get = function(onInitHandler, onClickHandler) {
            this.$overlay = create(overlayTmpl, $root, $(closeTmpl));
            init(this.$overlay, onInitHandler, onClickHandler);
            return this.$overlay;
        };

    }

    exports.overlay = {
        OverlayCtrl: OverlayCtrl,
        getOverlay: function(onInitHandler, onClickHandler) {
            var ctrl = new OverlayCtrl();
            var $overlay = ctrl.get(onInitHandler, onClickHandler);
            return $overlay;
        }
    };

}(window, Pathways.components.core, Pathways.utils, jQuery));
