
Pathways.LibraryLayer = function(panel_height) {

    var $gap    = $('.library-layer .gap'),
        height  = $gap.height(),
        state   = 'closed';

    $gap.css({ 'height': 0, 'transition': 'height 0.4s ease' });
    $('.library-layer .button').html('open');

    $('.library-layer').on('click', '.button', function() {
        if( state == 'closed' ) {
            $(this).html('close');
            $('.library-layer .gap').css('height', height);
            state = 'open';

            // scroll to the top of the library layer
            $('html, body').animate({
                scrollTop: ($gap.offset().top - 100)
            }, 500)
        }
        else {
            $(this).html('open');
            $('.library-layer .gap').css('height', 0);
            state = 'closed';
        }

        return false;
    });

    $('.gap').on('click', 'a', function(e) {
        var $this = $(this);

        if( $this.data('embed') ) {
            var embed_str   = '<div class="wellcomePlayer" data-uri="'+ $this.data('embed') +'" data-assetsequenceindex="0" data-assetindex="0" data-zoom="-0.6441,0,2.2881,1.4411" data-config="/service/playerconfig" style="width:800px; height:600px; background-color: #000"></div>',
                $embed      = $(embed_str),
                $overlay    = $('<div/>').addClass('overlay').css('height', panel_height ),
                $iframe     = $('<iframe/>').attr('src', $this.attr('href'));

            if( $this.data('width') )
                $iframe.attr('width', $this.data('width') );

            if( $this.data('height') )
                $iframe.attr('height', $this.data('height') );

            $overlay.append($embed);
            $('body').append($overlay);

            $overlay.show().css('background-color', 'rgba(0,0,0,0.8)');
            
            positionCenter($embed);

            $overlay.append( $('<script id="embedWellcomePlayer" src="http://wellcomelibrary.org/spas/player/build/wellcomeplayer/js/embed.js"><\/script>') );

            $overlay.on('click', function() {
                this.addEventListener('transitionend', function() { $(this).remove() }, false);
                $overlay.css('opacity', 0);
                window.embedScriptIncluded = false;
            })

            window.addEventListener('resize', function() {
                $overlay.css('height', panel_height );
            })

            e.preventDefault();
            return false; 
        }
    });

}
