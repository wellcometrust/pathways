(function(window) {

    'use strict';

    var Pathways = function(options) {
        var Pathways        = this,
            orientation     = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
            panel_height    = window.innerHeight < 550 ? 550 : window.innerHeight,

            supports_touch  = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);

        /************************
            Private functions
        *************************/

        var init = function() {

            // Progressive loading. Some things need to happen before window load
            if( !supports_touch || orientation == 'landscape' ) {
                resizeAllTheThings();

                window.addEventListener('resize', function() {
                    resizeAllTheThings();
                });
            }

            window.addEventListener('resize', function() {
                resizeSomeThings();
            });

            // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
            window.addEventListener('load', function() {

                // If it's a non-touch device, load the scenes.
                if( !supports_touch ) {
                    window.Pathways.LoadScenes();
                }

                // If it's iPad width or larger, load the components
                if( window.innerWidth > 720 ) {
                    loadComponents();
                }

                // For things that need resizing all the time, even on touch devices.
                resizeSomeThings();

                configurePanels();

                loadVideo();
            })
        }

        var configurePanels = function() {
            var _panels = document.querySelectorAll('[data-config]'),
                length  = _panels.length;

            for (var i = 0; i < length; i++) {
                var data    = _panels[i].getAttribute('data-config'),
                    ob2     = JSON.parse(data);

                console.log( ob2 );
            };
        }

        var loadComponents = function() {
            var loaded = [];

            $('[data-component]').each(function(){
                var handler = $(this).attr('data-component');

                if ( handler ) {
                    var handlerClass = window.Pathways.Utils.toTitleCase(handler);

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
                    sources = $this.data('src').replace(/\s+/g, ' ').split(' ');

                // If it's a touch device and the video is not marked as content, bail.
                if( supports_touch && !$this.hasClass('content') )
                    return;

                if( sources && sources.length ) {
                    var video = document.createElement('video');
                    
                    sources.forEach(function(e) {
                        var source = document.createElement('source');
                        source.src = e;

                        video.appendChild(source);
                    });
                    
                    video.loop  = true;

                    if( supports_touch ) {
                        video.controls  = true;
                        video.preload   = 'none';
                    }

                    $this.html(video);
                }
            });
        }

        var resizeSomeThings = function() {
            if( supports_touch ) {
                return;
            }
            
            $('.preserve-ratio').each(function() {
                var $this           = $(this),
                    $img            = $this.find('img').first(),
                    img_height      = $img.outerHeight();

                $img.css('transform', 'translate(0, '+ ( (panel_height - img_height) / 2 ) +'px)');
            });
        }

        var resizeAllTheThings = function() {
            panel_height = window.innerHeight < 550 ? (550 + 10) : (window.innerHeight + 10);

            $('.start').css('height', panel_height);

            // Set the heights of the panels to a minimum of the window height, or the height of the content.
            // Use any offsets set on the panel to increase height where necessary.
            $('.panel').each(function() {
                var $this   = $(this),
                    $bg     = $this.find('.bg-container'),
                    height  = $this.outerHeight(),
                    offset  = (supports_touch || !$this.data('offset-height')) ? 0 : $this.data('offset-height');

                if( height < panel_height || offset ) {
                    $this.css('height', panel_height + offset );
                }

                $bg.css('height', panel_height);
            });
        }

        /************************
            Public functions
        *************************/

        init();
        return Pathways;
    }

    Pathways.Utils = (function(){
        return {
            toTitleCase: function(str){
                str = str.replace(/-/g,' ').replace(/_/g,' ');
                str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
                return str.replace(/\W/g,'');
            }
        }
    })();

    Pathways.Scene  = {};
    Pathways.Scenes = [];

    window.Pathways = Pathways;
})(window);

