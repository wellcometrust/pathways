
Pathways.LibraryLayer = function(panel_height) {

    var $gap    = $('.library-layer .gap'),
        height  = $gap.height(),
        state   = 'closed';

    $gap.css({ 'height': 0, 'transition': 'height 0.4s ease' });
    $('.library-layer .button').html('open');

    $('.library-layer').on('click', '.bar', function() {
        if( state == 'closed' ) {
            $('.library-layer .gap').css('height', height);
            state = 'open';

            // scroll to the top of the library layer
            $('html, body').animate({
                scrollTop: ($gap.offset().top - 100)
            }, 500)
        }
        else {
            $('.library-layer .gap').css('height', 0);
            state = 'closed';
        }

        return false;
    });

    $gap.on('click', 'a', function(e) {
        var $this           = $(this),
            playerWidth     = (window.innerWidth - 180),
            playerHeight    = (window.innerHeight - 180);

        if( $this.data('embed') ) {
            var embed_str   = '<div class="wellcomePlayer" data-uri="'+ $this.data('embed') +'" data-assetsequenceindex="0" data-assetindex="0" data-zoom="-0.6441,0,2.2881,1.4411" data-config="/service/playerconfig" style="width:'+playerWidth+'px; height:'+playerHeight+'px; background-color: #000"></div>',
                $embed      = $(embed_str),
                $overlay    = $('<div class="overlay"></div>'),
                $close      = $('<div class="close"></div>');
                $iframe     = $('<iframe/>').attr('src', $this.attr('href'));

            $iframe.attr('width', playerWidth );
            $iframe.attr('height', playerHeight );

            $overlay.css('height', panel_height );

            $('body').append($overlay);

            $overlay.show();
            $overlay.css('background-color', 'rgba(0,0,0,0.8)');

            setTimeout(function() {
                positionCenter($embed);
                $overlay.append($embed);

                $overlay.append( $('<script id="embedWellcomePlayer" src="http://wellcomelibrary.org/spas/player/build/wellcomeplayer/js/embed.js"><\/script>') );
                $overlay.append( $close );
            }, 800);

            $overlay.on('click', function() {
                this.addEventListener('transitionend', function() { $(this).remove() }, false);
                $overlay.css('opacity', 0);
                window.embedScriptIncluded = false;
            })

            window.addEventListener('resize', function() {
                playerWidth     = (window.innerWidth - 180),
                playerHeight    = (window.innerHeight - 180);

                $overlay.css('height', window.innerHeight );

                console.log(playerWidth);

                $iframe.css('width', playerWidth );
                $iframe.css('height', playerHeight );

                $embed.css('width', playerWidth );
                $embed.css('height', playerHeight );
            });

            e.preventDefault();
            return false; 
        }
    });

}
