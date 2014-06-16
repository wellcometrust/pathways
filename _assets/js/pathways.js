(function(window) {

    'use strict';

    var Pathways = function(options) {
        var Pathways        = this,
            panel_height    = window.innerHeight < 750 ? (750 + 15) : (window.innerHeight + 15),

            supports_touch  = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);

        /************************
            Private functions
        *************************/

        var init = function() {

            loadComponents();
            resizeAllTheThings();

            if( !supports_touch ) {
                window.Pathways.LoadScenes();
                loadVideo();
            }

            window.addEventListener('resize', function() {
                resizeAllTheThings();
            });
        }

        var loadComponents = function() {
            var loaded = [];

            $('[data-component]').each(function(){
                var handler = $(this).attr('data-component');

                if ( handler ) {
                    var handlerClass = toTitleCase(handler);

                    // Check the handler exists and it hasn't already been loaded
                    if ( window.Pathways[handlerClass] != null && loaded.indexOf(handlerClass) == -1 ) {
                        window.Pathways[handlerClass](panel_height);
                        loaded.push(handlerClass);
                    }
                    
                    if( window.Pathways[handlerClass] == null )
                        console.warn('Could not load the necessary component: ' + handlerClass);
                }
            });
        }

        var loadVideo = function() {
            $('.bg-container.video').each(function() {
                var $this   = $(this),
                    src     = $this.data('src');

                if( src ) {
                    var video = document.createElement('video');
                    
                    video.src   = src;
                    video.loop  = true;

                    $this.html(video);
                }
            });
        }

        var resizeAllTheThings = function() {
            panel_height = window.innerHeight < 750 ? (750 + 15) : (window.innerHeight + 15);

            // Set the heights of the panels to a minimum of the window height, or the height of the content.
            // Use any offsets set on the panel to increase height where necessary.
            $('.panel').each(function() {
                var $this   = $(this),
                    $bg     = $this.find('.bg-container'),
                    height  = $this.height();

                if( height < panel_height || $this.data('offset-height') ) {
                    $this.css('height', panel_height + ( $this.data('offset-height') ? $this.data('offset-height') : 0 ) );
                }

                $bg.css('height', panel_height);
            });
        }

        // Utils
        var toTitleCase = function(str){
            str = str.replace('-',' ').replace('_',' ');
            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
            return str.replace(/\W/g,'');
        }

        /************************
            Public functions
        *************************/

        init();
        return Pathways;
    }

    window.Pathways = Pathways;
})(window);

