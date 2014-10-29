
Pathways.CropZoom = function() {

    var $elm    = $('.crop-zoom'),
        url     = '';
    
        
    $elm.css({
        position:   'absolute',
        opacity:    Modernizr.touch ? 1 : 0,
        width:      window.innerWidth,
        'z-index':  10
    });

    window.addEventListener('resize', function() {
        $elm.css( { 'width': window.innerWidth } );
    })

    // Tap targets
    $elm.find('.tap-target').each(function() {
        var $target     = $(this),
            key         = $target.data('crop');

        if( !db[key] ) {
            console.warn('No related info was found for this tap target');
            return;
        }

        var image       = url + db[key]['image'],
            title       = db[key]['title']      ? db[key]['title']      : '',
            text        = db[key]['text']       ? db[key]['text']       : '',
            position    = db[key]['position']   ? db[key]['position']   : '',
            img         = new Image(),
            content;

        img.src = image;

        // Create the text content
        content = title != '' ? '<h2>'+title+'</h2>' : '';
        content += '<p>'+ text + '</p>';

        // Set up the tap on the target.
        Hammer( $target.get(0) ).on('tap', function(e) {
            e.gesture.preventDefault();

            var $overlay    = $('<div class="overlay"></div>'),
                $popup      = $('<div class="popup"></div>'),
                $image_crop = $(img).addClass('image-crop'),
                $text       = $('<div class="text"></div>'),
                $close      = $('<div class="close"></div>');

            // Add in the elements
            $text.html(content);
            $popup.append( $image_crop );
            $popup.append( $text );

            $overlay.append($popup);
            $overlay.append( $close );
            $('body').append($overlay);

            $overlay.css('height', window.outerHeight );

            $overlay.css('background-color', 'rgba(0,0,0,0.9)');

            // Set an event so that after the image transitions in, show the text
            $image_crop.get(0).addEventListener('transitionend', function() {                
                $text.css( { top: (window.innerHeight - $text.outerHeight() - 15) } );

                if( position == 'right' )
                    $text.css('right', 40);
                else
                    $text.css('left', 40);

                $text.addClass('show');
            });

            $image_crop.css( { top: 0, left: 0, 'transform': 'translate(0, '+(Pathways.panelHeight / 4)+'px)', opacity: 0 } );

            // prevent scrolling
            $('body').addClass('modal-open');

            // Animate in the text
            setTimeout(function() {
                $image_crop.addClass('animate');

                if( window.innerHeight > window.innerWidth )
                    $image_crop.css({ 'transform': 'translate(0, '+ ((window.innerHeight - $image_crop.height()) / 2) +'px)', opacity: 1 });
                else
                    $image_crop.css({ 'transform': 'translate(0, 0)', opacity: 1 });
            }, 50);

            $image_crop.on('click', function() {
                $overlay.css('opacity', 0);
                $('body').removeClass('modal-open');
                setTimeout(function() {
                    $overlay.remove();
                }, 600);
            });

            $close.on('click', function() {
                $overlay.css('opacity', 0);
                $('body').removeClass('modal-open');
                setTimeout(function() {
                    $overlay.remove();
                }, 600);
            });

            window.addEventListener('resize', function() {
                $overlay.css('height', window.innerHeight );
                $text.css( { top: (window.innerHeight - $text.outerHeight() - 15) } );
            })
        });
    });

}
