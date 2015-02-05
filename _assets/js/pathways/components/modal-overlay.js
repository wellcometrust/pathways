(function(components, overlay, ga, $) {

    "use strict";

    var baseClass = 'modal-box',
        hiddenClass = 'modal-box-hidden',
        shownClass = 'modal-box-shown',
        openTxt = ' - open',
        downloadTxt = ' - download';

    function Modal(elm, data) {

        var self = this,
            $elm = elm,
            $overlay,
            $img;

        this.init = function() {

            var img = new Image(),
                ctrl = overlay.getCtrl(),
                $overlay = ctrl.$overlay,
                $img = $(img),
                $container = $('<div/>').addClass(baseClass + ' ' + hiddenClass),

                src = data.image,
                caption = data.title,
                download = data.download,
                gaTmp = data.ga || src + openTxt,
                gaLabel = gaTmp.replace(openTxt, downloadTxt),
                $caption = caption ? $('<p>' + caption + '</p>').addClass('text') : '',
                $download = download ? $('<a>Download</a>')
                .attr('href', download).addClass('download')
                .click(function() {
                    ga.send(gaLabel);
                }) : '';

            img.src = src;
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

    components.create('modal-overlay', function(element, data) {

        $(element).find('[data-modal]').on('click', function() {
            var id = $(this).data('modal');
            if (!id) return console.warn('No id defined for modal element: ' + this);
            var mData = data[id];
            if (!mData) return console.warn('No data defined for modal id \'' + id + '\'');
            mData.ga = mData.ga + openTxt;
            ga.send(mData.ga);
            var modal = new Modal($(this), mData);
            modal.init();
        });
    });


}(Pathways.components, Pathways.components.core.overlay, Pathways.core.ga, jQuery));
