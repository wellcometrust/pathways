
(function( w, undefined ){
    'use strict';

    var doc = w.document;

    var Pathways = {
        orientation:    w.innerWidth > w.innerHeight ? 'landscape' : 'portrait',                            // pretty crude but it'll do
        panel_height:   w.innerHeight < 550 ? 550 : w.innerHeight,                                          // 550px minimum panel height
        supports_touch: ('ontouchstart' in w) || (w.DocumentTouch && document instanceof DocumentTouch),    // is it a touch device?

        aspect_ratio:   1900 / 1050,

        init: function() {

            this.level = this.getEnhancementLevel();

            if( Pathways.supports_touch && Pathways.orientation == 'portrait' )
                Pathways.panel_height = 550;

            // Progressive loading. Some things need to happen before window load
            if( Pathways.level > 3 ) {
                Pathways.resizeAllTheThings();

                w.addEventListener('resize', function() {
                    Pathways.resizeAllTheThings();
                });
            }

            w.addEventListener('resize', function() {
                Pathways.resizeSomeThings();
            });

            // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
            w.addEventListener('load', function() {

                // If it's a non-touch device, load the scenes.
                if( Pathways.level > 3 ) {
                    Pathways.LoadScenes();
                }

                // If it's iPad width or larger, load the components
                if( Pathways.level > 2 ) {
                    Pathways.loadComponents();
                }

                // For things that need resizing all the time, even on touch devices.
                Pathways.resizeSomeThings();

                Pathways.configurePanels();

                Pathways.loadVideo();
            });

        }

    }

    // expose
    w.Pathways = Pathways;

    /*
        Do a few checks on screen size and touch abilities to allocate a level to the current device. This will be used to determine
        what gets loaded when.

        Need to further refine the levels.
    */
    Pathways.getEnhancementLevel = function() {
        
        // small screen
        var level = 0;

        // small to mid screens
        if( w.innerWidth >= 480 )
            level = 1;

        // ~ iPad portrait (mid screens)
        if( w.innerWidth >= 760 )
            level = 2;

        // ~ iPad landscape (mid screens)
        if( w.innerWidth >= 1020 )
            level = 3;

        if( w.innerWidth >= 1020 && !Pathways.supports_touch )
            level = 4;

        return level;
    }

    Pathways.configurePanels = function() {
        var _panels = doc.querySelectorAll('[data-config]'),
            length  = _panels.length;

        this.panels = [];

        for (var i = 0; i < length; i++) {
            var data    = _panels[i].getAttribute('data-config'),
                ob2     = JSON.parse(data);
        };
    }

    Pathways.loadComponents = function() {
        var loaded  = [],
            _panels = doc.querySelectorAll('[data-component]');

        for (var i = 0; i < _panels.length; i++) {
            var _panel  = _panels[i],
                handler = _panel.getAttribute('data-component');

            if ( handler ) {
                var handlerClass = Pathways.Utils.toTitleCase(handler);

                // Check the handler exists and it hasn't already been loaded
                if ( Pathways[handlerClass] != null && loaded.indexOf(handlerClass) == -1 ) {
                    Pathways[handlerClass](Pathways.panel_height);
                    loaded.push(handlerClass);
                }
                
                if( Pathways[handlerClass] == null )
                    console.warn('Could not load the necessary component: ' + handlerClass);
            }
        };
    }

    Pathways.loadVideo = function() {
        var _videos = doc.querySelectorAll('.bg-container.video');

        for (var i = 0; i < _videos.length; i++) {
            var _video  = _videos[i],
                sources = _video.getAttribute('data-src').replace(/\s+/g, ' ').split(' ');

            if( sources && sources.length ) {
                var video = doc.createElement('video');
                
                sources.forEach(function(e) {
                    var source = doc.createElement('source');
                    source.src = e;

                    video.appendChild(source);
                });
                
                video.loop  = true;

                if( Pathways.level < 4 ) {
                    video.controls  = true;
                    video.preload   = 'none';
                }

                _video.innerHTML = '';
                _video.appendChild( video );
            }
        }

        /*
            Feature videos

            These videos are embedded into the page already as they're classed as content. All we're doing here is removing
            the controls and allowing the files to preload since, in theory, the user in on a fast(er) desktop-like connection. Assumptions, ahoy!
        */
        if( !Pathways.supports_touch ) {
            var _panels = doc.querySelectorAll('.talking-head, .animation');

            for (var i = 0; i < _panels.length; i++) {
                var _panel = _panels[i],
                    _video = _panel.querySelector('video');

                _video.setAttribute('preload', 'true');
                _video.removeAttribute('controls');
            };
        }
    }

    Pathways.resizeSomeThings = function() {
        if( w.innerWidth < 768 ) {
            return;
        }

        var new_height      = w.innerWidth / Pathways.aspect_ratio,
            p_height        = Pathways.supports_touch ? 550 : Pathways.panel_height,
            _containers     = doc.querySelectorAll('.preserve-ratio');

        for (var i = 0; i < _containers.length; i++) {            
            var _container  = _containers[i],
                _img        = _container.querySelector('img'),
                img_height  = _img.offsetHeight,
                new_height  = w.innerWidth / Pathways.aspect_ratio,
                prefixes    = ['-ms-', '-moz-', '-webkit-', ''];

            if( p_height > new_height ) {
                for (var p = 0; p < prefixes.length; p++) {
                    _container.style[prefixes[p]+'transform'] = 'translate(0, '+ ( (p_height - new_height) / 2 ) +'px)';
                }
            }

        }

    }

    Pathways.resizeAllTheThings = function() {

        this.level = this.getEnhancementLevel();

        Pathways.panel_height = w.innerHeight < 550 ? 550 : w.innerHeight;

        if( doc.querySelector('.start') )
            doc.querySelector('.start').style['height'] = Pathways.panel_height + 'px';

        // Set the heights of the panels to a minimum of the window height, or the height of the content.
        // Use any offsets set on the panel to increase height where necessary.
        var _panels = doc.querySelectorAll('.panel');
        
        for( var i = 0; i < _panels.length; i++ ) {
            var _panel = _panels[i],
                _bg     = _panel.querySelector('.bg-container'),
                height  = _panel.offsetHeight,
                offset  = (Pathways.supports_touch || !_panel.getAttribute('data-offset-height')) ? 0 : _panel.getAttribute('data-offset-height');

            if( height < Pathways.panel_height || offset ) {
                _panel.style['height'] = Pathways.panel_height + parseInt(offset) + 'px';
            }

            _bg.style['height'] = Pathways.panel_height + 'px';
        }
    }

    Pathways.init();
    
})( this );

// Utility functions

Pathways.Utils = (function(){
    return {
        toTitleCase: function(str){
            str = str.replace(/-/g,' ').replace(/_/g,' ');
            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
            return str.replace(/\W/g,'');
        },

        positionCenter: function($elm) {
            var width   = $elm.width(),
                height  = $elm.height(),

                top     = (window.innerHeight / 2) - (height / 2),
                left    = (window.innerWidth / 2) - (width / 2);

            $elm.css({ position: 'absolute', top: top, left: left });
        }
    }
})();

Pathways.Scene  = {};
Pathways.Scenes = [];


