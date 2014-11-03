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

        startPanel,
        panels,
        ratioedPanels,

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

    function initRatioedPanels(panels) {
        var rPanels = [];
        for (var i = 0; i < panels.length; i++) {
            var preserveRatio = panels[i].config.background.preserve_ratio;
            
            if (preserveRatio) {
                rPanels.push(panels[i]);                
            }
        }
        return rPanels;
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

    function unsizePanels(panels) {        
        if (startPanel) unSetElementHeight(startPanel); 

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem,
                _bg = panels[i].bg;

            $(_panel).removeAttr('style');
            $(_bg).removeAttr('style');

            //unSetElementHeight(_panel); 
            //unSetElementHeight(_bg);

            var preserveRatio = panels[i].config.background.preserve_ratio;
            
            if (preserveRatio) {   
                $(_panel).children().each(function(index, child){
                    $(child).removeAttr('style');
                    //unSetElementHeight(child);
                    //unTranslatePanelElem(child);
                });
            }            
        }
    }

    function resizePanel(panel, panelHeight) {
        console.log('resizePanel');
        var _panel = panel.elem;

        unSetElementHeight(_panel);        

        var config = panel.config,
            _bg = panel.bg,

            currentHeight = _panel.offsetHeight,
            offset = config ? ((sys.supportsTouch || !config.offset_height) ? 0 : config.offset_height) : 0,
            largerHeight = currentHeight < panelHeight ? panelHeight : currentHeight;

        if (largerHeight !== currentHeight || offset) {
            setElementHeight(_panel, (largerHeight + offset));
        }

        if (_bg) setElementHeight(_bg, panelHeight);
    }

    function resizePanelChild(index, child) {
        var newHeight = sys.innerWidth / sys.aspectRatio;
        setElementHeight(child, newHeight);
        translatePanelElem(child, mod.panelHeight);
    }

    function resizePanels(startPanel, panels) {
        
        if (startPanel) setElementHeight(startPanel, mod.panelHeight);            

        for (var i = 0; i < panels.length; i++) {
            resizePanel(panels[i], mod.panelHeight);
            
            var preserveRatio = panels[i].config.background.preserve_ratio;
            if (preserveRatio) {   
                $(panels[i].elem).children().each(resizePanelChild);
            }
        }
    }

    function removeScrollSceneStyling() {

        if (startPanel) $(startPanel).removeAttr('style');
        $('.comic-panel').removeAttr('style');

        for (var i = 0; i < panels.length; i++) {
            var panel           = panels[i],
                $bg             = $(panel.bg),
                $panel          = $(panel.elem),
                panelID         = $panel.attr('id'),               
                $library_panel  = $panel.find('[data-panel="'+ panelID +'"]').first(),
                $gallery        = $panel.find('[data-component="gallery"]'),
                $quiz           = $panel.find('[data-component="quiz"]');

            $bg.removeAttr('style');
            $library_panel.removeAttr('style');
            $gallery.removeAttr('style');
            $quiz.removeAttr('style');

        }
    }



    function initMuteButton(muteSelector) {
        var $btn = $(muteSelector); 
        $btn.css('display', 'block');
        $btn.unbind('click');
        $btn.on('click', function(e) { 
            console.log('click');
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

                if (!sys.level >= mod.MIN_SCROLL_LEVEL) {            
                    _video.setAttribute('preload', 'auto');
                } else {
                    _video.setAttribute('preload', 'metadata');
                    _video.controls = true;
                    
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
        console.log('init sound controls');
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

    var panelsUnsized = false;
    function resizeCheck() {                       
        if (sys.level < mod.MIN_COMPONENT_LEVEL) {
            unsizePanels(panels);
            panelsUnsized = true;
        } else if (sys.level >= mod.MIN_COMPONENT_LEVEL && sys.level < mod.MIN_SCROLL_LEVEL){
            resizePanels(null, ratioedPanels);
            panelsUnsized = false;
        } else if (sys.level >= mod.MIN_SCROLL_LEVEL) {
            resizePanels(startPanel, panels);
            panelsUnsized = false;
        }
    }

    function loadCheck(onScrollLoad, onScrollUnload) {        
        mod.panelHeight = calcPanelHeight(mod.panelHeight); 

        if (!scenesLoaded){
            // If it's a non-touch device, load the scenes.
            if (sys.level >= mod.MIN_SCROLL_LEVEL) {
                sceneController = onScrollLoad(mod);

                initSoundControls();    
                initAudio(panels);

                scenesLoaded = true;
            } 
        } else {
            if (sys.level < mod.MIN_SCROLL_LEVEL) {
                console.log('unloading scrolllevel');                
                sceneController.destroy(true);
                removeScrollSceneStyling();
                onScrollUnload(mod);

                $('audio, video').each(function() {                                
                    this.muted = true;
                });
                muteButton.hide();

                scenesLoaded = false;
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
    }

    function init(onScrollLoad, onScrollUnload) {

        startPanel = $('.start').get(0);
        panels = initPanels('.panel');
        ratioedPanels = initRatioedPanels(panels);        

        resizeCheck();

        w.addEventListener('resize', function(){                     
            resizeCheck();
            loadCheck(onScrollLoad, onScrollUnload);
        });

        // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
        w.addEventListener('load', function() {
            
            resizeCheck();
            loadCheck(onScrollLoad, onScrollUnload);
            
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