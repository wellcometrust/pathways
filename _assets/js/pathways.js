(function(w, undefined) {
    'use strict';

    var doc = w.document;

    var Pathways = {
        orientation: (w.innerWidth / w.innerHeight) > 1.2 ? 'landscape' : 'portrait', // pretty crude but it'll do
        panel_height: w.innerHeight < 550 ? 550 : w.innerHeight, // 550px minimum panel height
        supports_touch: ('ontouchstart' in w) || (w.DocumentTouch && document instanceof DocumentTouch), // is it a touch device?

        aspect_ratio: 1900 / 1050,

        muted: false,
        muteButton: null,

        init: function() {

            // Get the enhancement level
            this.level = this.getEnhancementLevel();

            //
            this.storePanelConfig();

            if (Pathways.supports_touch && Pathways.orientation == 'portrait')
                Pathways.panel_height = 550;

            // Progressive loading. Some things need to happen before window load
            if (Pathways.level >= 3) {
                Pathways.resizeAllTheThings();
            }

            w.addEventListener('resize', function() {

                Pathways.panel_height = w.innerHeight < 550 ? 550 : w.innerHeight;
                Pathways.level = Pathways.getEnhancementLevel();

                Pathways.resizeSomeThings();

                if (Pathways.level > 3) {
                    Pathways.resizeAllTheThings();
                }
            });

            // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
            w.addEventListener('load', function() {

                // If it's a non-touch device, load the scenes.
                if (Pathways.level > 3) {
                    Pathways.LoadScenes();
                }

                // If it's iPad width or larger, load the components
                if (Pathways.level > 2) {
                    Pathways.loadComponents();
                }

                // For things that need resizing all the time, even on touch devices.
                Pathways.resizeSomeThings();

                Pathways.muteButton = Pathways.initMute('.mute');

                Pathways.initVideo(Pathways.muteButton);
                Pathways.initAudio();

                

                Pathways.globalAudio = Pathways.initGlobalAudio();

                Pathways.hideAllTextTracks();

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
        if (w.innerWidth >= 480)
            level = 1;

        // ~ iPad portrait (mid screens)
        if (w.innerWidth >= 760)
            level = 2;

        // ~ Nexus 7 landscape (mid screens)
        if (w.innerWidth >= 960)
            level = 3;

        if (w.innerWidth >= 1020 && !Pathways.supports_touch)
            level = 4;

        return level;
    }

    Pathways.storePanelConfig = function() {
        var _panels = doc.querySelectorAll('.panel'),
            length = _panels.length;

        this._panels = [];

        this._panels['offset_height'] = [];
        this._panels['preserve_ratio'] = [];
        this._panels['video'] = [];

        for (var i = 0; i < length; i++) {
            var data = _panels[i].getAttribute('data-config');

            if (!data)
                continue;

            var ob2 = JSON.parse(data);

            this._panels.push({
                panel: _panels[i],
                config: ob2
            });

            if (ob2.offset_height)
                this._panels['offset_height'].push(_panels[i]);

            if (ob2.background && ob2.background.preserve_ratio)
                this._panels['preserve_ratio'].push(_panels[i]);
        };
    }

    Pathways.setPanelHeights = function() {
        // Set the heights of the panels to a minimum of the window height, or the height of the content.
        // Use any offsets set on the panel to increase height where necessary.

        for (var i = 0; i < this._panels.length; i++) {
            var _panel = this._panels[i].panel,
                config = this._panels[i].config,
                _bg = _panel.querySelector('.bg-container'),
                height = _panel.offsetHeight,
                offset = (Pathways.supports_touch || !config.offset_height) ? 0 : config.offset_height;

            if (height < Pathways.panel_height || offset) {
                _panel.style['height'] = Pathways.panel_height + parseInt(offset) + 'px';
            }

            _bg.style['height'] = Pathways.panel_height + 'px';
        }
    }

    Pathways.loadComponents = function() {
        var loaded = [],
            _panels = doc.querySelectorAll('[data-component]');

        for (var i = 0; i < _panels.length; i++) {
            var _panel = _panels[i],
                handler = _panel.getAttribute('data-component');

            if (handler) {
                var handlerClass = Pathways.Utils.toTitleCase(handler);

                // Check the handler exists and it hasn't already been loaded
                if (Pathways[handlerClass] != null && (loaded.indexOf(handlerClass) == -1 || Pathways[handlerClass].alwaysLoad == true)) {
                    Pathways[handlerClass](Pathways.panel_height, _panel);
                    loaded.push(handlerClass);
                }

                if (Pathways[handlerClass] == null)
                    console.warn('Could not load the necessary component: ' + handlerClass);
            }
        };
    }




// Video

    Pathways.initVideo = function($btn) {        
        var _panels = doc.querySelectorAll('.panel');        
        
        for (var i = 0; i < _panels.length; i++) {
            var _panel = _panels[i];
            var _video = _panel.querySelector('video');

            if (_video) {
                _video.addEventListener('volumechange', function(e){                    
                    if (_video.muted !== Pathways.muted) {
                        setPathwaysMuted(_video.muted);
                        updateButtonView();
                    }
                });

                _video.addEventListener('error', function(e){                    
                    console.log('error');
                });

                if (!Pathways.supports_touch) {            
                    _video.setAttribute('preload', 'true');
                } else {
                    _video.setAttribute('preload', 'false');
                }
            }
            
        }
        

        /*
            Feature videos

            These videos are embedded into the page already as they're classed as content. All we're doing here is removing
            the controls and allowing the files to preload since, in theory, the user in on a fast(er) desktop-like connection. Assumptions, ahoy!
        */
        
    }

    Pathways.hideAllTextTracks = function(videoSelector) {
        videoSelector = videoSelector || 'video';        
        $(videoSelector).each(function(index, video) {
            if (video) {                
                var tracks = video.textTracks;            
                if (tracks.length) {
                    for (var i = 0, j = tracks.length; i < j; i++) {
                        var track = tracks[i];
                        if (track) track.mode = 'hidden';
                    }                   
                }
            }
        })
    }

    Pathways.getPanelVideoElement = function (panelID) {       
        return _(panelID + ' video');
    }

    Pathways.autoPlayVideoOnEnter = function(video, initTime, stopGlobalAudio) {        
        initTime = initTime || 0;
        if ((typeof stopGlobalAudio == 'undefined')) stopGlobalAudio = true;
        
        if (video) {
            if (video.readyState !== 0) video.currentTime = initTime;               
            if (stopGlobalAudio) crossFade(Pathways.globalAudio, video);
        }
        
    }

    Pathways.autoStopVideoOnLeave = function(video, initTime, restartGlobalAudio) {       
        initTime = initTime || 0;
        if ((typeof restartGlobalAudio == 'undefined')) restartGlobalAudio = true;

        if (video) {    
            if (restartGlobalAudio) crossFade(video, Pathways.globalAudio, function() {  
                if (video.readyState !== 0) video.currentTime = initTime;
            });
        }
        
    }





// Audio


    function crossFade(fromAudio, toAudio, callback){
        
        var delay = 1000;

        var onlyFrom = (fromAudio && !toAudio);

        if (fromAudio === toAudio) {
            if (callback) w.setTimeout(callback, delay);
            return;
        }

        if (fromAudio && (typeof fromAudio !== 'undefined')) {
            $(fromAudio).stop(false, true);
            $(fromAudio).animate({volume: 0}, { duration: delay, complete: function() {                 
                this.pause(); 
                if (onlyFrom && callback) {                    
                    callback();
                    callback = null;
                }
            }});
        }

        // fade in
        if (toAudio && (typeof toAudio !== 'undefined')) {
            $(toAudio).stop(false, true);
            toAudio.volume = 0;
            toAudio.muted = Pathways.muted;            
            toAudio.play();
            $(toAudio).animate({volume: 1}, { duration: delay, complete: function() {                
                if (!onlyFrom && callback) {                    
                    callback();
                    callback = null;
                }
            }});
        }
    }

    function setPathwaysMuted(value){
        Pathways.muted = value;

        var $body = $('body');

        $body.find('video').each(function() {                
            this.muted = Pathways.muted;
        });
        $body.find('audio').each(function() {
            console.log(Pathways.muted, this);
            this.muted = Pathways.muted;
        });
    }

    function updateButtonView() {
        if(Pathways.muted) {
            Pathways.muteButton.addClass('active'); 
        } else {
            Pathways.muteButton.removeClass('active'); 
        }
    }


    Pathways.initMute = function(muteSelector) {
        var $btn = $(muteSelector);        

        $btn.on('click', function(e) { 

            // active == muted
            if( $(this).hasClass('active') ) {
                setPathwaysMuted(false);                
            } else {
                setPathwaysMuted(true);         
            }

            updateButtonView();

            e.preventDefault();
            return false;
        });

        return $btn;
    }

    // Cross fade between panel audio and global audio
    Pathways.LoadPanelAudio = function(panel_audio) {
        crossFade(Pathways.globalAudio, panel_audio);    
    }

    Pathways.UnloadPanelAudio = function(panel_audio) {
        crossFade(panel_audio, Pathways.globalAudio);    
    }

    Pathways.getPanelAudioElement = function(panelID) {
        return $(panelID + ' audio').first()[0];        
    }

    Pathways.initAudio = function(){
        var _audios = document.querySelector('audio');
        for (var i = 0; i < _audios.length; i++) {
            var _audio = _audios[i];
            
        }
    }

    Pathways.initGlobalAudio = function() {
        console.log('init global');
        var _audio = document.querySelector('[data-audio-global]');
            //src = _audio.getAttribute('data-audio'),
            //audio = Pathways.createAudioElement(src, true);

        crossFade(null, _audio);

        return _audio;
    }




    Pathways.resizeSomeThings = function() {
        if (w.innerWidth < 768) {
            return;
        }

        var new_height = w.innerWidth / Pathways.aspect_ratio,
            panel_height = Pathways.supports_touch ? 550 : Pathways.panel_height;

        for (var i = 0; i < this._panels['preserve_ratio'].length; i++) {
            var _container = this._panels['preserve_ratio'][i].querySelector('.bg-container'),
                prefixes = ['-moz-', '-webkit-', ''];

            if (panel_height > new_height) {
                for (var p = 0; p < prefixes.length; p++) {
                    _container.style[prefixes[p] + 'transform'] = 'translate(0, ' + ((panel_height - new_height) / 2) + 'px)';
                }
            }
        };
    }

    Pathways.resizeAllTheThings = function() {

        if (doc.querySelector('.start'))
            doc.querySelector('.start').style['height'] = Pathways.panel_height + 'px';

        Pathways.setPanelHeights();
    }

    


    Pathways.init();

})(this);

// Utility functions

Pathways.Utils = (function() {
    return {
        toTitleCase: function(str) {
            str = str.replace(/-/g, ' ').replace(/_/g, ' ');
            str = str.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1);
            });
            return str.replace(/\W/g, '');
        },

        // Takes a jQuery object as an argument.
        // This wasn't here originally which is why it uses jQuery at all.
        positionCenter: function($elm) {
            var width = $elm.width(),
                height = $elm.height(),

                top = (window.innerHeight / 2) - (height / 2),
                left = (window.innerWidth / 2) - (width / 2);

            $elm.css({
                position: 'absolute',
                top: top,
                left: left
            });
        }
    }
})();

Pathways.Scene = {};
Pathways.Scenes = [];
