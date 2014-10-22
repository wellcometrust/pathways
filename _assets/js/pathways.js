function _(str) { return document.querySelector(str); }


var Pathways = (function(w, _, $, undefined) {
    'use strict';

    var doc = w.document;
    var mod;

    function toTitleCase(str) {
        str = str.replace(/-/g, ' ').replace(/_/g, ' ');
        str = str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
        return str.replace(/\W/g, '');
    }
    
    function positionCenter($elm) {
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




    function getOrientation() {
        return (w.innerWidth / w.innerHeight) > 1.2 ? 'landscape' : 'portrait'
    }

    function getSupportsTouch() {
        return ('ontouchstart' in w) || (w.DocumentTouch && document instanceof DocumentTouch)
    }

    function getPanelHeight() {
        return w.innerHeight < 550 ? 550 : w.innerHeight;
    }


    /*
        Do a few checks on screen size and touch abilities to allocate a level to the current device. This will be used to determine
        what gets loaded when.

        Need to further refine the levels.
    */
    function getEnhancementLevel() {
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

        if (w.innerWidth >= 1020 && !getSupportsTouch())
            level = 4;

        return level;
    }

    function initPanels(panelSelector) {
        var _panels = doc.querySelectorAll(panelSelector),
            length = _panels.length,
            panels = [],
            data, _panel, configData;

        for (var i = 0; i < length; i++) {
            _panel = _panels[i];
            data = _panel.getAttribute('data-config');

            if (!data)
                continue;

            configData = JSON.parse(data);

            panels.push({
                panel: _panel,
                config: configData
            });
        };

        return panels;
    }

    
    function loadComponents(context, height) {
        var loaded = [],
            _components = doc.querySelectorAll('[data-component]');

        for (var i = 0; i < _components.length; i++) {
            var _component = _components[i],
                handler = _component.getAttribute('data-component');

            if (handler) {
                var handlerClass = toTitleCase(handler);

                // Check the handler exists and it hasn't already been loaded
                if (context[handlerClass] != null && (loaded.indexOf(handlerClass) == -1 || context[handlerClass].alwaysLoad == true)) {
                    context[handlerClass](context.panel_height, _component);
                    loaded.push(handlerClass);
                }

                if (context[handlerClass] == null)
                    console.warn('Could not load the necessary component: ' + handlerClass);
            }
        };
    }

    function setHeight(el, height, offset) {
        offset = offset || 0;
        el.style['height'] = height + offset + 'px';
    }

    function resizeAllTheThings(startPanel, panels, aspectRatio, supportsTouch, panelHeight) {

        if (startPanel) setHeight(startPanel, panelHeight);            

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].panel,
                config = panels[i].config,
                _bg = _panel.querySelector('.bg-container'),
                height = _panel.offsetHeight,
                offset = (supportsTouch || !config.offset_height) ? 0 : config.offset_height;

            if (height < panelHeight || offset) {
                setHeight(_panel, panelHeight, parseInt(offset));
            }

            setHeight(_bg, panelHeight);
        }
    }

    function resizeSomeThings(panels, aspectRatio, supportsTouch, panelHeight) {
        
        var new_height = w.innerWidth / aspectRatio,
            panel_height = supportsTouch ? 550 : panelHeight;
        
        if (w.innerWidth < 768) {
            return;
        }

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].panel,
            _preserve_ratio = panels[i].config.background.preserve_ratio;
            
            if (_preserve_ratio) {
                
                var _container = _panel.querySelector('.bg-container'),
                
                prefixes = ['-moz-', '-webkit-', ''],
                y = ((panel_height - new_height) / 2);

                if (panel_height > new_height) {                
                    for (var p = 0; p < prefixes.length; p++) {
                        _container.style[prefixes[p] + 'transform'] = 'translate(0, ' + y + 'px)';
                    }
                }       
            }
        }

    }

    function initMuteButton(muteSelector) {
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


    function setPathwaysMuted(value){        
        mod.muted = value;

        var $body = $('body');

        $body.find('video').each(function() {                
            this.muted = mod.muted;
        });
        $body.find('audio').each(function() {            
            this.muted = mod.muted;
        });
    }
    




    function initPanelVideo(panels, videoSelector) {  
        
        var videos = [];

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].panel;
            var _video = _panel.querySelector(videoSelector);

            if (_video) {
                
                _video.addEventListener('volumechange', function(e){                    
                    if (_video.muted !== mod.muted) {
                        setPathwaysMuted(_video.muted);
                        updateButtonView();
                    }
                });

                _video.addEventListener('error', function(e){                    
                    console.log('error');
                });

                if (!mod.supports_touch) {            
                    _video.setAttribute('preload', 'true');
                } else {
                    _video.setAttribute('preload', 'false');
                }

                videos.push(_video);
            }
            
        }
        
        return videos;
        
    }

    function hideCaptions(videos) {        
        
        var video;

        for (var i = 0; i < videos.length; i++) {
            video = videos[i];
            if (video) {                
                var tracks = video.textTracks;            
                if (tracks.length) {
                    for (var i = 0, j = tracks.length; i < j; i++) {
                        var track = tracks[i];
                        if (track) track.mode = 'hidden';
                    }                   
                }
            }
        }
    }

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
            toAudio.muted = mod.muted;            
            toAudio.play();
            $(toAudio).animate({volume: 1}, { duration: delay, complete: function() {                
                 if (!onlyFrom && callback) {                 
                    callback();
                    callback = null;
                }
            }});
        }
    }

    // Cross fade between panel audio and global audio
    function loadPanelAudio(panel_audio) {
        crossFade(this.globalAudio, panel_audio);    
    }

    function unloadPanelAudio(panel_audio) {
        crossFade(panel_audio, this.globalAudio);    
    }
    

    function updateButtonView() {
        if(mod.muted) {
            mod.muteButton.addClass('active'); 
        } else {
            mod.muteButton.removeClass('active'); 
        }
    }

    function initPanelAudio(panels, audioSelector){

        var tracks = [];

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].panel;            
            var _track = _panel.querySelector(audioSelector);           
            if (_track) { 
                tracks.push(tracks);
            }
        }

        return tracks;
    }

    function initGlobalAudio() {        
        var _audio = document.querySelector('[data-audio-global]');
        if (_audio) {            
            crossFade(null, _audio);
        }

        return _audio;
    }




    function getCrossFadeAudio(value, gAudio) {
        var audio = null;
        if (value || (typeof value == 'undefined')) {
            audio = gAudio;
        }
        return audio;
    }

    function autoPlayVideoOnEnter(video, initTime, stopGlobalAudio) {        
        initTime = initTime || 0;
        var fadeAudio = getCrossFadeAudio(stopGlobalAudio, this.globalAudio); 
        
        if (video) {
            if (video.readyState !== 0) video.currentTime = initTime; 
            crossFade(fadeAudio, video);
        }
        
    }

    function autoStopVideoOnLeave(video, initTime, restartGlobalAudio) {       
        initTime = initTime || 0;
        var fadeAudio = getCrossFadeAudio(restartGlobalAudio, this.globalAudio);  
        
        if (video) {          
            
            crossFade(video, fadeAudio, function() {  
                if (video.readyState !== 0) video.currentTime = initTime;
            });
        }
        
    }

    function getPanelVideoElement(panelID) {       
        return _(panelID + ' video');
    }

    function getPanelAudioElement(panelID) {
        return $(panelID + ' audio').first()[0];        
    }

    function init(onLoadComplete) {

        // Get the enhancement level
        
        this.panels = initPanels('.panel');        

        if (this.supports_touch && this.orientation == 'portrait')
            this.panel_height = 550;

        var startPanel = doc.querySelector('.start');

        this.level = getEnhancementLevel();

        // Progressive loading. Some things need to happen before window load
        if (this.level >= 3) {
            resizeAllTheThings(startPanel, this.panels, this.aspect_ratio, this.supports_touch, this.panel_height);
        }

        w.addEventListener('resize', (function() {

            this.panel_height = w.innerHeight < 550 ? 550 : w.innerHeight;
            this.level = getEnhancementLevel();

            resizeSomeThings(this.panels, this.aspect_ratio, this.supports_touch, this.panel_height);

            if (this.level > 3) {
                resizeAllTheThings(startPanel, this.panels, this.aspect_ratio, this.supports_touch, this.panel_height);
            }

        }).bind(this));

        // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
        w.addEventListener('load', (function() {

            // If it's a non-touch device, load the scenes.
            if (this.level > 3) {
                onLoadComplete(this);
            }

            // If it's iPad width or larger, load the components
            if (this.level > 2) {
                loadComponents(this);
            }

            // For things that need resizing all the time, even on touch devices.
            resizeSomeThings(this.panels, this.aspect_ratio, this.supports_touch, this.panel_height);

            this.muteButton = initMuteButton('.mute');

            this.panelVideos = initPanelVideo(this.panels, 'video');
            hideCaptions(this.panelVideos);

            this.globalAudio = initGlobalAudio();
            this.panelAudio = initPanelAudio(this.panels, 'audio');

        }).bind(this));

    }

    

    mod = {

        orientation: getOrientation(), // pretty crude but it'll do
        panel_height: getPanelHeight(), // 550px minimum panel height
        supports_touch: getSupportsTouch(), // is it a touch device?
        aspect_ratio: 1900 / 1050,
        level: 0,

        panels: [],

        muted: false,
        muteButton: null,

        globalAudio: null,
        panelAudio: null,

        panelVideos: null,

        init: init,

        getPanelAudioElement: getPanelAudioElement,
        getPanelVideoElement: getPanelVideoElement,

        autoPlayVideoOnEnter: autoPlayVideoOnEnter,
        autoStopVideoOnLeave: autoStopVideoOnLeave,

        loadPanelAudio: loadPanelAudio,
        unloadPanelAudio: unloadPanelAudio

    }

    mod.Scene = {};
    mod.Scenes = [];

    mod.Utils = {
        toTitleCase: toTitleCase,
        positionCenter: positionCenter
    }

    return mod;

})(this, _, jQuery);
