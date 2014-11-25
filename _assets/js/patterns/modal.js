//var Pathways = Pathways || {};
//Pathways.components = Pathways.components || {};
//Pathways.components.core = Pathways.components.core || {};


(function(mod, overlay, $) {

    function Modal(elm) {

        var self = this,
            $elm = elm,
            baseClass = 'modal-img',
            hiddenClass = 'modal-img-hidden',
            shownClass = 'modal-img-shown',
            $overlay,
            $img;

        this.init = function() {

            var img = new Image(),
                $overlay = overlay.getOverlay(),
                $img = $(img).addClass(baseClass + ' ' + hiddenClass);

            img.src = $elm.attr('data-image');

            img.onload = function() {
                $overlay.append($img);
                $img.removeClass(hiddenClass).addClass(shownClass);
            };

        };
    }

    mod.modal = function(element, data) {

        $(element).find('.modal').on('click', function() {
            var modal = new Modal($(this));
            modal.init();
        });

    };



}(Pathways.components, Pathways.components.core.overlay, jQuery));
