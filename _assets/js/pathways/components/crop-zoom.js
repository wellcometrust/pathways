(function(components, w, doc, overlay, $, utils) {

    components.create('crop-zoom', function(element, data) {
        var $elem = $(element),
            db = data;

        if (typeof db === 'undefined' || db === null) return console.warn('No data supplied to cropZoom component for ' + $elem.attr('id'));

        $elem.find('.tap-target').each(function() {
            var $target = $(this),
                key = $target.data('crop'),
                query = db[key];

            if (typeof query === 'undefined' || query === null) return console.warn('No related info was found for this tap target');

            var image = query.image,
                title = query.title ? query.title : '',
                text = query.text ? query.text : '',
                position = query.position ? query.position : '',
                img = new Image(),
                content;

            img.src = image;

            // Create the text content
            content = title !== '' ? '<h2>' + title + '</h2>' : '';
            content += '<p>' + text + '</p>';

            // Set up the tap on the target.
            Hammer($target.get(0)).on('tap', function(e) {
                e.gesture.preventDefault();

                var ctrl = overlay.getCtrl();

                var $overlay = ctrl.$overlay,
                    $popup = $('<div class="popup"></div>'),
                    $imageCrop = $(img).addClass('image-crop'),
                    $text = $('<div class="text"></div>');

                // Add in the elements
                $text.html(content);
                $popup.append($imageCrop);
                $popup.append($text);

                $overlay.append($popup);

                setTimeout(function() {
                    $text.css({
                        top: (window.innerHeight - $text.outerHeight() - 15)
                    });

                    if (position == 'right')
                        $text.css('right', 40);
                    else
                        $text.css('left', 40);

                    $text.addClass('show');
                }, 500);
                //Can't use transtionend with ie9 :( the delay is css timing value

                // Set an event so that after the image transitions in, show the text
                // $imageCrop.get(0).addEventListener('transitionend', function() {
                //     $text.css({
                //         top: (window.innerHeight - $text.outerHeight() - 15)
                //     });

                //     if (position == 'right')
                //         $text.css('right', 40);
                //     else
                //         $text.css('left', 40);

                //     $text.addClass('show');
                // });

                $imageCrop.css({
                    top: 0,
                    left: 0,
                    'transform': 'translate(0, ' + (Pathways.viewportHeight) + 'px)',
                    opacity: 0
                });

                // Animate in the text
                setTimeout(function() {
                    $imageCrop.addClass('animate');

                    $imageCrop.css({
                        'transform': 'translate(0, ' + ((window.innerHeight - $imageCrop.height()) / 2) + 'px)',
                        opacity: 1
                    });

                }, 50);

                $imageCrop.on('click', ctrl.closeHandler);

                window.addEventListener('resize', function() {
                    $text.css({
                        top: (window.innerHeight - $text.outerHeight() - 15)
                    });
                });
            });
        });
    });

}(Pathways.components, window, document, Pathways.components.core.overlay, jQuery, Pathways.utils));
