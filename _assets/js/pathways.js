function _(str) { return document.querySelector(str); }


var Capabilities = (function(w, $, undefined) {

    var mod = {
            aspectRatio: 1900 / 1050,
            supportsTouch: false,   
            innerHeight:  0, 
            innerWidth: 0, 
            orientation: 'landscape',   
            level: 0,
            
            calcSupportsTouch: function () {
                return ('ontouchstart' in w) || (w.DocumentTouch && document instanceof DocumentTouch)
            },
            calcOrientation: function() {
                return (this.innerWidth / this.innerHeight) > 1.2 ? 'landscape' : 'portrait'
            },
            calcAspectRatio: function() {
                return (this.orientation === 'landscape') ? (1900 / 1050) : (1050 / 1900);
            },
             /*
                Do a few checks on screen size and touch abilities to allocate a level to the current device. This will be used to determine
                what gets loaded when.

                Need to further refine the levels.
            */
            getEnhancementLevel: function() {
                // small screen
                var level = 0;

                // small to mid screens
                if (w.innerWidth >= 480)
                    level = 1;

                // ~ iPad portrait (mid screens) or Nexus 7 ()
                if (w.innerWidth >= 768 && this.supportsTouch)
                    level = 2;

                // ~ Nexus 7 landscape (mid screens)
                if (w.innerWidth >= 960 && this.supportsTouch)
                    level = 3;

                // Desktop
                if (w.innerWidth >= 768 && !this.supportsTouch)
                    level = 4;


                return level;
            },            
            getDisplaySettings: function() {
                this.innerWidth = w.innerWidth;
                this.innerHeight = w.innerHeight;  

                this.orientation = this.calcOrientation();
                this.supportsTouch = this.calcSupportsTouch();
                this.level = this.getEnhancementLevel();  
            },
            init: function() {                
                w.addEventListener('resize', (this.getDisplaySettings).bind(this), false);                
            }
        }
    
    mod.getDisplaySettings();
    mod.init();

    return mod;

}(this, jQuery));

var Pathways = (function(w, _, sys, $, undefined) {
    
    'use strict';

    var doc = w.document,   

        isMuted = false,
        minHeight = 550,
        muteButton,
        globalAudio,

        panelVideos,
        panelTracks,

        panels,

        scenesLoaded = false,
        componentsLoaded = false,

        sceneController,

        panelHeightDecreased = false,

        mod = {
            MIN_COMPONENT_LEVEL: 2,
            MIN_SCROLL_LEVEL: 4,
            panelHeight: calcPanelHeight(minHeight),
            getPanelHeight: function() {
                return this.panelHeight;
            }
        };

    function calcPanelHeight(oldHeight) {
        var newHeight = sys.innerHeight < minHeight ? minHeight : sys.innerHeight;
        
        if (oldHeight > newHeight) {
            panelHeightDecreased = true;
        } else {
            panelHeightDecreased = false;
        }
       
        
        return newHeight;
    }

    

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

            top = (sys.innerHeight / 2) - (height / 2),
            left = (sys.innerWidth / 2) - (width / 2);

        $elm.css({
            position: 'absolute',
            top: top,
            left: left
        });
    }

    

    function initPanel(panel) {
        
        var $panel = $(panel),
            data = $panel.attr('data-config'),
            bg = $panel.find('.bg-container').get(0),
            configData = {};

        if (data) configData = JSON.parse(data);

        return {
            elem: panel,
            config: configData,
            bg: bg
        };
    }

    function initPanels(panelSelector) {
        var $panels = $(panelSelector),
            panels = [];

        $panels.each(function(index, panel) {
            panels.push(initPanel(panel));
        });
        return panels;
    }


    function loadComponents(context, height) {
        var loaded = [],
            $components = $('[data-component]');

        $components.each(function(index, component) {

            var handler = $(component).attr('data-component');

            if (handler) {
                var handlerClass = toTitleCase(handler);

                // Check the handler exists and it hasn't already been loaded
                if (context[handlerClass] != null && (loaded.indexOf(handlerClass) == -1 || context[handlerClass].alwaysLoad == true)) {
                    context[handlerClass](component);
                    loaded.push(handlerClass);
                }

                if (context[handlerClass] == null)
                    console.warn('Could not load the necessary component: ' + handlerClass);
            }
        });
    }


    function setElementHeight(el, height) {        
        $(el).css('height', parseInt(height,10) + 'px');
    }

    function unSetElementHeight(el) {
         $(el).css('height', '');
    }

    function unsizeAllPanels(panels) {

        //if (startPanel) unSetElementHeight(startPanel);            

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem,
                _bg = panels[i].bg;

            unSetElementHeight(_panel); 
            unSetElementHeight(_bg);
            unTranslatePanelElem(_bg);
        }
    }

    function resizePanel(panel, panelHeight) {
        
        var _panel = panel.elem;

        unSetElementHeight(_panel);        

        var config = panel.config,
            _bg = panel.bg,

            currentHeight = _panel.offsetHeight,
            offset = config ? ((sys.supportsTouch || !config.offset_height) ? 0 : config.offset_height) : 0,
            setHeight = currentHeight < panelHeight ? panelHeight : currentHeight;

            console.log('>>', currentHeight, panelHeight, panelHeightDecreased)
        
        if (setHeight !== currentHeight || offset) {
            setElementHeight(_panel, (setHeight + offset));
        }

        if (_bg) setElementHeight(_bg, panelHeight);
    }

    function translatePanelElem(_el, currentHeight) {

        var newHeight = sys.innerWidth / sys.aspectRatio,                        
            prefixes = ['-moz-', '-webkit-', ''],
            y = parseInt(((currentHeight - newHeight) / 2),10);

        if (currentHeight > newHeight) {                
            for (var p = 0; p < prefixes.length; p++) {
                _el.style[prefixes[p] + 'transform'] = 'translate(0, ' + y + 'px)';
            }
        }   
    }

    function unTranslatePanelElem(_el) {
        var prefixes = ['-moz-', '-webkit-', ''];

        for (var p = 0; p < prefixes.length; p++) {
            _el.style[prefixes[p] + 'transform'] = '';
        }
    }

    function resizeAllPanels(startPanel, panels) {
        
        if (startPanel) setElementHeight(startPanel, mod.panelHeight);            

        for (var i = 0; i < panels.length; i++) {
            resizePanel(panels[i], mod.panelHeight);
        }
    }

    function resizeRatioedPanels(panels) {
        
        for (var i = 0; i < panels.length; i++) {
            var preserveRatio = panels[i].config.background.preserve_ratio;
            
            if (preserveRatio) {
                console.log('pre')
                resizePanel(panels[i], mod.panelHeight);                
                translatePanelElem(panels[i].bg, mod.panelHeight);
            }
        }
    }

    function initMuteButton(muteSelector) {
        var $btn = $(muteSelector); 
        $btn.css('display', 'block');

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
        isMuted = value;

        $('video, audio').each(function() {                
            this.muted = isMuted;
        });

    }    


    function initPanelVideo(panels, videoSelector) {  
        
        var videos = [];        

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem;
            var _video = _panel.querySelector(videoSelector);

            if (_video) {
                
                _video.addEventListener('volumechange', function(e){                                     
                    if (this.muted == isMuted) return;
                    setPathwaysMuted(this.muted);
                    updateButtonView();                    
                });

                _video.addEventListener('error', function(e){                    
                    console.log('error');
                });

                if (!sys.supportsTouch) {            
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
        for (var i = 0, l = videos.length; i < l; i++) {
            video = videos[i];            
            if (video) {                
                var tracks = video.textTracks;            
                if (tracks.length) {
                    for (var j = 0, m = tracks.length; j < m; j++) {
                        var track = tracks[j];                       
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
            toAudio.muted = isMuted;           
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
        crossFade(globalAudio, panel_audio);    
    }

    function unloadPanelAudio(panel_audio) {
        crossFade(panel_audio, globalAudio);    
    }
    

    function updateButtonView() {
        if(isMuted) {
            muteButton.addClass('active'); 
        } else {
            muteButton.removeClass('active'); 
        }
    }

    function initPanelAudioTracks(panels, selector){

        var tracks = [];

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem;            
            var _track = _panel.querySelector(selector);           
            if (_track) { 
                tracks.push(tracks);
            }
        }

        return tracks;
    }

    function initGlobalAudio(selector) {        
        var audio = $(selector).get(0);
        if (audio) {            
            crossFade(null, audio);
        }

        return audio;
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
        var fadeAudio = getCrossFadeAudio(stopGlobalAudio, globalAudio); 
        
        if (video) {            
            if (video.readyState !== 0) video.currentTime = initTime; 
            crossFade(fadeAudio, video);
        }
        
    }

    function autoStopVideoOnLeave(video, initTime, restartGlobalAudio) {       
        initTime = initTime || 0;
        var fadeAudio = getCrossFadeAudio(restartGlobalAudio, globalAudio);  
        
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


    function initSoundControls() {
        muteButton = initMuteButton('.mute');
    }

    function initVideo(panels) {
        panelVideos = initPanelVideo(panels, 'video');
        hideCaptions(panelVideos);
    }

    function initAudio(panels) {
        globalAudio = initGlobalAudio('[data-audio="global"]');
        panelTracks = initPanelAudioTracks(panels, '[data-audio="panel"]');
    }

    function resizeAll(startPanel, panels) {                 
        // For things that need resizing all the time, even on touch devices.
        
        if (sys.level < mod.MIN_COMPONENT_LEVEL) {
            unsizeAllPanels(panels);
        } else {
            resizeRatioedPanels(panels);
        }

        if (sys.level >= mod.MIN_SCROLL_LEVEL) {
            console.log('resizeAll', mod.panelHeight);
            //
            //resizeAllPanels(startPanel, panels);
        } else {
            //unsizeAllPanels(startPanel, panels);
        }
    }

    function loadAll(onLoadComplete) {
        console.log('start level: ', sys.level, ': ' ,scenesLoaded, componentsLoaded);
        // If it's a non-touch device, load the scenes.
        if (!scenesLoaded){
            if (sys.level >= mod.MIN_SCROLL_LEVEL) {
                //sceneController = onLoadComplete(mod);
                scenesLoaded = true;
            } 
        } else {
            if (sys.level < mod.MIN_SCROLL_LEVEL) {
                //sceneController.destroy(true);
                //scenesLoaded = false;
            }
        }

        // If it's iPad width or larger, load the components
        if (!componentsLoaded) {
            if( sys.level >= mod.MIN_COMPONENT_LEVEL) {
                loadComponents(mod);
                componentsLoaded = true;
            } 
        } else {
            if (sys.level < mod.MIN_COMPONENT_LEVEL) {
                // unload components
            }
        }
        console.log('end level: ', sys.level, ': ' ,scenesLoaded, componentsLoaded);
    }

    function init(onLoadComplete) {

        var startPanel = $('.start').get(0);
        panels = initPanels('.panel');       

        resizeAll(startPanel, panels);

        w.addEventListener('resize', function(){
            mod.panelHeight = calcPanelHeight(mod.panelHeight);            
            resizeAll(startPanel, panels);
            loadAll(onLoadComplete);
        });

        // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
        w.addEventListener('load', function() {

            mod.panelHeight = calcPanelHeight(mod.panelHeight);
            resizeAll(startPanel, panels);
            loadAll(onLoadComplete);

            initSoundControls();    
            initAudio(panels);
            initVideo(panels);
            
        });

    }

    mod.init = init;

    mod.getPanelAudioElement = getPanelAudioElement;
    mod.getPanelVideoElement = getPanelVideoElement;

    mod.autoPlayVideoOnEnter = autoPlayVideoOnEnter;
    mod.autoStopVideoOnLeave = autoStopVideoOnLeave;

    mod.loadPanelAudio = loadPanelAudio;
    mod.unloadPanelAudio = unloadPanelAudio;

    mod.translatePanelElem = translatePanelElem;

    mod.Scene = {};
    mod.Scenes = [];

    mod.Utils = {
        toTitleCase: toTitleCase,
        positionCenter: positionCenter
    }

    return mod;

}(this, _, Capabilities, jQuery));

console.log(Pathways);
