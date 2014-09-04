
Pathways.LibraryLayer = function() {

    var $gap                = $('.library-layer .gap'),
        $further_reading    = $('.further-reading'),
        height              = $gap.height(),
        state               = 'closed';

    $gap.css({ 'height': 0, 'transition': 'height 0.4s ease' });
    $('.library-layer .button').html('open');

    $('.further-reading, .library-layer .controls').on('click', function() {
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
            var embed_str   = '<div class="wellcomePlayer" data-no-load="true" data-config="/player-config.js" data-uri="'+ $this.data('embed') +'" data-assetsequenceindex="0" data-assetindex="0" data-zoom="-0.6441,0,2.2881,1.4411" data-config="/service/playerconfig" style="width:'+playerWidth+'px; height:'+playerHeight+'px; background-color: #000"></div>',
                $embed      = $(embed_str),
                $overlay    = $('<div class="overlay"></div>'),
                $close      = $('<div class="close"></div>');
                $iframe     = $('<iframe/>').attr('src', $this.attr('href'));

            $iframe.attr('width', playerWidth );
            $iframe.attr('height', playerHeight );

            $overlay.css('height', Pathways.panel_height );

            $('body').append($overlay);

            $overlay.show();
            $overlay.css('background-color', 'rgba(0,0,0,0.8)');

            setTimeout(function() {
                Pathways.Utils.positionCenter($embed);
                $overlay.append($embed);

                window.initPlayers($('.wellcomePlayer'));
                //$overlay.append( $('<script id="embedWellcomePlayer" src="/wellcomeplayer/js/embed.js"><\/script>') );
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

                $iframe.css('width', playerWidth );
                $iframe.css('height', playerHeight );

                $embed.css('width', playerWidth );
                $embed.css('height', playerHeight );
            });

            $(document).bind("onToggleFullScreen", function (event, isFullScreen) {
                console.log('full screen: ' + isFullScreen);
            });

            // test currentViewUri event
            $(document).bind("onCurrentViewUri", function (event, uri) {
                console.log('download uri: ' + uri);
            });

            e.preventDefault();
            return false; 
        }
    });

}
