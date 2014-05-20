
Pathways.CropZoom = function(panel_height) {

    $('.crop-zoom').css({'position': 'absolute', 'opacity': 0, 'z-index': 20});

    var $elm            = $('.crop-zoom'),
        image_top       = $elm.offset().top,
        trigger         = $('.tap-block').offset().top,
        duration        = panel_height / 2,
        image_height    = panel_height,
        inview          = false,
        hidden          = true;

    function onResize() {
        $elm.css({ width: window.outerWidth, height: window.outerHeight });
    }

    // Tap targets
    $elm.find('.tap-target').each(function() {
        var $target = $(this),
            key     = $target.data('crop'),
            image   = '../_assets/img/mesmer/'+ db[key]['image'],
            text    = db[key]['text'],
            img     = new Image();

        img.src = image;

        var ratio = img.width / img.height;

        // Set up the tap on the target.
        Hammer( $target.get(0) ).on('tap', function(e) {
            e.gesture.preventDefault();

            var $popup,
                $image_crop,
                $text,
                $overlay;

            // create popup in memory
            $popup      = $('<div/>').addClass('popup');
            $image_crop = $(img).addClass('image-crop');
            $text       = $('<div/>').addClass('text').html(text);

            $popup.append( $image_crop );
            $popup.append( $text );

            $overlay = $('<div/>').addClass('overlay').css('height', window.outerHeight );

            $overlay.append($popup);
            $('body').append( $overlay );

            $image_crop.css( { top: ($target.offset().top - window.scrollY) + 10, left: $target.offset().left + 10, height: $target.height() - 10 } );

            $overlay.show();

            var width   = 'auto',
                height  = 'auto';

            if( window.innerWidth < 900 ) {
                width = '40%';
            }
            else {
                height = window.outerHeight - 120;
            }

            $image_crop.get(0).addEventListener('transitionend', function() {
                $text.css( { top: 40, left: ($image_crop.offset().left + $image_crop.width() + 40) } ).addClass('show');
            });

            $image_crop.addClass('animate');

            $image_crop.css({
                top:    40,
                left:   120,
                width:  width,
                height: height,
                opacity: 1
            })

            $overlay.css('background-color', 'rgba(0,0,0,0.8)');

            $overlay.on('click', function() {
                this.addEventListener('transitionend', function() { $(this).remove() }, false);
                $(this).css('opacity', 0);
            });

            resizeQueue.push(function() {
                $overlay.css('height', window.outerHeight );
                
                if( window.innerWidth < 900 ) {
                    $image_crop.css('height', 'auto');
                    $image_crop.css('width',  '40%');
                }
                else {
                    $image_crop.css('width', 'auto');
                    $image_crop.css('height', window.outerHeight - 60 );
                }

                $text.css( { left: ($image_crop.offset().left + $image_crop.width() + 40) } );
            })
        });
    });


    onResize();
}
