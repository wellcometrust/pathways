(function(mod, overlay, $) {

    function Modal(elm) {

        var self = this,
            $elm = elm,
            baseClass = 'modal-box',
            hiddenClass = 'modal-box-hidden',
            shownClass = 'modal-box-shown',
            $overlay,
            $img;

        this.init = function() {

            var img = new Image(),
                ctrl = overlay.getCtrl(),
                $overlay = ctrl.$overlay,
                $img = $(img),
                $container = $('<div/>').addClass(baseClass + ' ' + hiddenClass),
                caption = $elm.attr('data-caption'),
                $caption = caption ? $('<p>' + $elm.attr('data-caption') + '</p>').addClass('text') : '';

            img.src = $elm.attr('data-image');

            $container.on('click', ctrl.closeHandler);

            img.onload = function() {
                $overlay.append($container);
                $container.append($img);
                $container.append($caption);
                $container.removeClass(hiddenClass).addClass(shownClass);
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
