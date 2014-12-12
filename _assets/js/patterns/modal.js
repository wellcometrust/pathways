(function(mod, overlay, ga, $) {

    function Modal(elm, data) {

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
                src = $elm.attr('data-image'),
                caption = $elm.data('caption'),
                download = $elm.data('download'),
                gaLabel = ($elm.data('ga') || src) + ' - download',
                $caption = caption ? $('<p>' + caption + '</p>').addClass('text') : '';
                $download = download ? $('<a>Download</a>')
                            .attr('href', download).addClass('download')
                            .click(function(){
                                ga.send(gaLabel);
                            }) : '';

            //console.log('ga', gaTracking);
            img.src = $elm.attr('data-image');
            $caption.append($download);

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
            var modal = new Modal($(this), data);
            modal.init();
        });

    };



}(Pathways.components, Pathways.components.core.overlay, Pathways.components.core.ga, jQuery));
