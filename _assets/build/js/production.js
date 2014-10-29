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
    function resizeAll() {                       
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

    function loadAll(onScrollLoad, onScrollUnload) {
        console.log('start level: ', sys.level, ': ' ,scenesLoaded, componentsLoaded);
        // If it's a non-touch device, load the scenes.
        if (!scenesLoaded){
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

                $('audio').each(function() {  
                    console.log('muting: ', this);              
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
        console.log('end level: ', sys.level, ': ' ,scenesLoaded, componentsLoaded);
    }

    function init(onScrollLoad, onScrollUnload) {

        startPanel = $('.start').get(0);
        panels = initPanels('.panel');
        ratioedPanels = initRatioedPanels(panels);        

        mod.panelHeight = calcPanelHeight(mod.panelHeight); 
        resizeAll();

        w.addEventListener('resize', function(){
            mod.panelHeight = calcPanelHeight(mod.panelHeight);            
            resizeAll();
            loadAll(onScrollLoad, onScrollUnload);
        });

        // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
        w.addEventListener('load', function() {

            mod.panelHeight = calcPanelHeight(mod.panelHeight);
            resizeAll();
            loadAll(onScrollLoad, onScrollUnload);

            
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

'use strict';

// Global Nav
(function($) {
    var $nav            = $('.global-navigation'),
        $nav_handle     = $nav.find('.handle'),
        state           = 'open',
        navHeight       = $nav.outerHeight(),
        handleHeight    = $nav_handle.outerHeight();

    $nav.on('click', '.handle', function() {
        navHeight = $nav.outerHeight();

        if( state == 'open' ) {
            $nav.css('transform', 'translate(0, '+ -(navHeight - handleHeight) +'px)');
            state = 'closed';
        }
        else {
            $nav.css('transform', 'translate(0, 0)');
            state = 'open';

            // add an event listener on scroll to close the nav if open.
            $(window).one('scroll', function() {
                $nav_handle.trigger('click');
            });
        }
    });

    window.addEventListener('resize', function() {
        navHeight = $nav.outerHeight();
        $nav.css('transform', 'translate(0, '+ -(navHeight - handleHeight) +'px)');
    })

    setTimeout(function() {
        $nav_handle.trigger('click');
    }, 1000);


    /*
        Events
    */

    // put this here for now.
    $('.comic-quote').on('click', '.info-box', function() {
        var $this   = $(this),
            $parent = $this.parent();

        if( $parent.hasClass('active') ) {
            $parent.removeClass('active');
        }
        else {
            $parent.addClass('active');
        }
    });

    // Open links marked with rel="external" in a new window/tab
    $('.library-panel').on('click', '[rel="external"]', function(e) {
        var $this = $(this);

        window.open( $this.attr('href') );

        e.preventDefault();
    });

})($);


var canvas, stage;

// Canvas animations. Forget trying to pause/play on entering exiting the panel. Let it go, man. Just let it go...

function initCanvas() {
    canvas = document.getElementById("canvas");
    images = images||{};

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt) {
    if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {
    var exportRoot = new lib.tree2();

    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);
    stage.update();

    createjs.Ticker.setFPS(lib.properties.fps);

    if( Modernizr.touch ) {
        createjs.Ticker.addEventListener("tick", stage);
    }
}

if( window.innerWidth >= 768 ) {
    initCanvas();
}



var $parallaxContent = $('.start').find('.content').first();
var $parallaxLady = $('.start').find('.falling-lady').first();

function parallaxContentLoad() {
    var scrollY     = window.pageYOffset,       
        unit        = 0.5 / (Pathways.panelHeight / 2);

    if ($parallaxContent) {
        if( scrollY > Pathways.panelHeight ) {
            $parallaxContent.css('display', 'none');
            return;
        }

        $parallaxContent.css({
            'display': 'block',
            'opacity':  1 - (unit * scrollY),
            'transform': Modernizr.csstransforms3d ? 'translate3d(0,'+ (scrollY / 2) +'px,0)' : 'translate(0,'+ (scrollY / 2) +'px)'
        });
    }   
}

function parallaxContentUnload() {
    $parallaxContent.removeAttr('style');
}

function parallaxLadyLoad() {
    var scrollY     = window.pageYOffset,
        $parallaxLady       = $('.falling-lady').first();

    if ($parallaxLady) {
        if( scrollY > Pathways.panelHeight )
            return;

        $parallaxLady.css({
            'transform': Modernizr.csstransforms3d ? 'translate3d(0,'+ (scrollY * 0.7) +'px,0)' : 'translate(0,'+ (scrollY * 0.7) +'px)'
        });
    }   
}

function parallaxLadyUnload() {
    $parallaxLady.removeAttr('style');
}

function onScrollUnload(pathways) {

    if( $parallaxContent ) { 
        parallaxContentUnload();
        window.removeEventListener('scroll', parallaxContentLoad, false);
    }

    if( $parallaxLady ) {
        parallaxLadyUnload();
        window.addEventListener('scroll', parallaxLadyLoad, false);
    }
}


function onScrollLoad(pathways) {

    console.log(' >> onScrollLoad');

    var $sequence       = $('.sequence'),
        controller      = new ScrollMagic({refreshInterval: 500 }),
        $blackStrip     = $('.black-strip');

    
    function resizeBlackStrip(e) {
        $blackStrip.css({
            position:       'fixed',
            'height':       pathways.panelHeight,
            'transform':    'translate(0,'+pathways.panelHeight+'px)'
        });
    }

    resizeBlackStrip();
    window.addEventListener('resize', resizeBlackStrip);

    function getValueFromConfig(rawConfig, name) {
        if (rawConfig) var config = JSON.parse(rawConfig);
        return (config && config[name]) || null;
    }

    

    /**************
        Scenes
    **************/

    var scenes  = new Array(),
        idx     = 0;

    // Start panel

    if( $parallaxContent ) { 
        window.addEventListener('scroll', parallaxContentLoad, false);
    }


    // Svengali
    if( $parallaxLady ) {
        window.addEventListener('scroll', parallaxLadyLoad, false);
    }


    /**************
        Sequence
     **************/

    if( _('.sequence') ) {
        var $bgs            = $sequence.find('.bg-container'),
            $first_panel    = $sequence.find('.panel').first(),
            $last_panel     = $sequence.find('.panel').last();

        scenes[idx++] = new ScrollScene({
                triggerElement: $sequence,
                triggerHook:    'top',
                duration:       function() { return ($sequence.height() - Pathways.panelHeight); }
            })
            .on('enter', function(e) {                
                $bgs.css({ display: 'block' } );   // To fix layering when reloading             
                if( e.scrollDirection == 'FORWARD') {
                    $bgs.css({ position: 'fixed', display: 'none', opacity: 0 } );
                    $first_panel.find('.bg-container').css({ display: 'block', opacity: 1 });
                }
                if( e.scrollDirection == 'REVERSE') {
                    $bgs.css({ position: 'fixed' } );  
                }
            })
            .on('leave', function(e) {               
                $bgs.css({ position: 'absolute', display: 'block' } );
            })
     }

    // Panels & Components

    $('[data-component="gallery"]').hide();
    $('[data-component="quiz"]').hide();

    var panel_total = document.querySelectorAll('.sequence .panel').length,
        panel_count = 0;



    $('.sequence .panel').each(function() {
        var $this           = $(this),
            panelID         = $this.attr('id'),
            $bg             = $this.find('.bg-container'),
            $library_panel  = $('[data-panel="'+ panelID +'"]').first(),
            $gallery        = $this.find('[data-component="gallery"]'),
            $quiz           = $this.find('[data-component="quiz"]'),
            $panelAudio     = $this.find('[data-audio="panel"]'),
            $panelVideo     = $this.find('[data-video="panel"]'),

            tween           = TweenMax.to( $bg, 1, { opacity: 1 });

        panel_count+=1; // for tracking first and last panels (when logic needs to differ because of the lack of cross-fading)

        function getMediaDuration() {
            return $this.outerHeight();
        }

        function getTweenDuration() {
            return pathways.panelHeight / 4;
        }

        function getComponentDuration(offset) {
            return function () { return (($this.outerHeight() * 0.75) - offset); }
        }

        function getLibPanelDuration() {
            var h = $this.outerHeight();
            return (panel_count == panel_total) ? (h * 0.75) : (h - 300)
        }
        /*
            I can't entirely explain why we need to set the bg to block on both enter and leave. But it fixes
            a layering issue when loading the page during or after a sequence. SCIENCE!
        */
        // Panels       
        scenes[idx++] = new ScrollScene({
                triggerElement: $this,
                duration: getTweenDuration
            })
            .on('enter', function() {                
                $bg.css('display', 'block');
            })
            .on('leave', function() {                
                $bg.css('display', 'block');
            })
            .setTween(tween)

        // Galleries
        if( $gallery.length ) {
            var g_offset = getValueFromConfig($gallery.attr('data-config'), 'offset_height') || 0;
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    triggerHook:    'top',
                    duration:       getComponentDuration(g_offset),
                    offset:         g_offset
                })
                .on('enter', function() {
                    $gallery.css({ position: 'fixed', display: 'block' });
                    setTimeout(function() { $gallery.addClass('active'); }, 50);
                })
                .on('leave', function() {
                    $gallery.css({ position: 'absolute', display: 'none' });
                    setTimeout(function() { $gallery.removeClass('active'); }, 50);
                })
        }

        // Quiz
        if( $quiz.length ) {
            var q_offset = getValueFromConfig($quiz.attr('data-config'), 'offset_height') || 0;            
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    triggerHook:    'top',
                    duration:       getComponentDuration(q_offset),
                    offset:         q_offset
                })
                .on('enter', function() {
                    $quiz.css({ position: 'fixed', display: 'block' });
                    setTimeout(function() { $quiz.addClass('active'); }, 50);
                })
                .on('leave', function() {
                    $quiz.css({ position: 'absolute', display: 'none' });
                    setTimeout(function() { $quiz.removeClass('active'); }, 50);
                })
        }

        // Library panels
        if( $library_panel.length ) {
            $library_panel.css('transform', 'translate('+ ($library_panel.outerWidth()) +'px, '+ ($library_panel.outerHeight() - 60) +'px)');

            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    duration:       getLibPanelDuration,
                    offset:         100
                })
                .on('enter', function() {
                    $library_panel.css({ position: 'fixed', display: 'block' });
                })
                .on('leave', function() {
                    $library_panel.css({ position: 'absolute', display: 'none' });
                })
        }


        // Audio
        // 
        if( $panelAudio.length ) {       
            var $audio = $panelAudio.first();

            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    duration:       getMediaDuration
                })
                .on('enter', function() {
                    pathways.loadPanelAudio($audio[0]);
                })
                .on('leave', function() {
                    pathways.unloadPanelAudio($audio[0]);                    
                })
        }

        // Video
        // 
        if( $panelVideo.length ) {   
            var $video = $panelVideo.first(),         
                rawConfig = $video.attr('data-config'),
                initTime = getValueFromConfig(rawConfig, 'initTime') || 0,
                muteGlobal = getValueFromConfig(rawConfig, 'muteGlobal') || true;
            
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    duration:       getMediaDuration
                })
                .on('enter', function() {
                    pathways.autoPlayVideoOnEnter($video[0], initTime, muteGlobal);
                })
                .on('leave', function() {
                    pathways.autoStopVideoOnLeave($video[0], initTime, muteGlobal);
                })
        }

        // Panel specific scene code if it has any
        var handlerClass    = pathways.Utils.toTitleCase(panelID);

        // Check the handler exists, then load
        if ( pathways.Scene[handlerClass] != null ) {
            pathways.Scene[handlerClass]('#'+panelID);
        }
    });

    scenes.forEach(function(s) {
        s.addTo(controller);
    });

    pathways.Scenes.forEach(function(s) {
        s.addTo(controller);
    })

    return controller;
}

Pathways.init(onScrollLoad, onScrollUnload);


Pathways.AudioPlayer = function(elem) {
    var self            = this,
        $player         = $('.audio-player'),
        $progress_bar   = $player.find('.progressed'),
        $time_left      = $player.find('.time-left span'),
        playing         = false;

    var src     = $player.data('src'),
        track   = new Audio(src);

    $player.on('click', '.controls', function() {
        if( playing ) {
            track.pause();
            $(this).removeClass('active');
            playing = false;
        }
        else {
            track.play();
            $(this).addClass('active');
            playing = true;
        }
    });

    track.addEventListener('timeupdate', function () {
        var remaining = parseInt(track.duration - track.currentTime);
        
        $progress_bar.css('width', (track.currentTime * (100 / track.duration) + '%' ));
        $time_left.html( self.secondsToMinutes(remaining) );
    });

    this.secondsToMinutes = function(seconds) {
        var mins        = Math.floor( seconds / 60 ),
            remainder   = seconds % 60;

        if( remainder < 10 )
            remainder = '0' + remainder;

        return mins + '.' + remainder;
    }
}
/*
    Carousel pattern initiator followed by the component.
*/

Pathways.Gallery = function() {

    $('[data-component="gallery"]').on('click', function(e) {

        var $overlay    = $('<div class="overlay"></div>'),
            $close      = $('<div class="close"></div>'),
            $loading    = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');

        $overlay.css('height', window.innerHeight );

        $('body').append( $overlay );

        $overlay.show();
        $overlay.css('background-color', 'rgba(0,0,0,0.8)');

        $overlay.append($loading);

        $loading.css({ position: 'absolute', top: ((window.innerHeight / 2) - 12), left: ((window.innerWidth / 2) - 35) });

        // prevent scrolling
        $('body').addClass('modal-open');

        setTimeout(function() {
            // Load the carousel
            var $div = $('<div class="carousel"></div>');
            $overlay.append($div);

            var carousel = new Carousel(".carousel");
            carousel.init();

            $overlay.append( $close );
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            $('body').removeClass('modal-open');

            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

    });

}

function Carousel(element)
{
    var self            = this,
        _element        = document.querySelector(element),
        $element        = $(element),
        $prev           = null,
        $next           = null,

        $container      = null,
        $panes          = null,

        // TODO: Remove hardcoded images variable
        images          = imageDB.images,
        location        = imageDB.location,

        widths          = [],
        ratios          = [],

        pane_width      = 0,
        pane_count      = 0,
        current_pane    = 0,
        total_offset    = (window.innerWidth / 2);


    /**
     * initial
     */
    this.init = function() {

        // Steps to loading the carousel:
        // - Set up the carousel container
        // - Load the first image.
        // - On load, calculate dimensions of the image, update the container, set local width vars, move the container so the image is in the centre.
        // - Load the navigation
        // - Load rest of the images sequentially in the onload event of the previous one.
        // - Update the container and local variables on each load, keeping the carousel in the correct place.
        
        // Create the container
        $container = $('<ul/>');
        $container.height( window.innerHeight );

        $element.append($container);

        // Load the first image
        var imagesCopy = [].concat(images);
        var first = imagesCopy[0];

        loadImage(first, function() {
            loadNavigation();

            $panes       = $element.find('li');
            pane_count   = $panes.length;

            $container.css( 'transform', 'translate('+ (total_offset - (widths[0] / 2)) +'px,0)');
            setPaneDimensions();

            imagesCopy.shift();

            // load the rest of the images
            loadImages(imagesCopy);
        });

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
        })
    };

    /*
     * Load an image and take a function to call once the image has finished asynchronously loading
     */
    var loadImage = function(obj, callback) {
        var img = new Image(),
            $li = $('<li/>'),
            $img;

        img.src = '/_assets/img/' + location + obj.image + '.jpg';

        img.onload = function() {
            $img = $(img);
            $img.css('height', '100%');

            $li.append($img);

            // add potential text
            if( obj.text ) {
                var $child = $('<div>'+obj.text+'</div>').addClass('text');

                $li.append($child);
            }

            // what is the ratio of the image?
            var w           = img.naturalWidth,
                h           = img.naturalHeight,
                ratio       = (h / w),
                newWidth    = window.innerHeight / ratio;

            // store the width and ratio for resize recalculations
            widths.push(newWidth);
            ratios.push(ratio);

            // set the panel to the image's width
            $li.width(newWidth);

            // Add it to the container
            $container.append($li);

            // calculate and set the width of the whole container
            var total = widths.reduce(function(a, b) {
                return a + b;
            });

            $container.width(total);

            if( callback )
                callback.call();
        }
    }

    /*
     * Takes an array of image objects and recursively sets up a callback chain to load in images sequentially
     */
    var loadImages = function(images) {
        if( images.length ) {
            loadImage(images[0], function() {
                $panes       = $element.find('li');
                pane_count   = $panes.length;
                setPaneDimensions();

                images.shift()

                loadImages(images);
            });
        }
    }

    /*
     * load the navigation into the carousel
     */
    var loadNavigation = function() {
        $prev   = $('<div/>'),
        $next   = $('<div/>');

        $prev.addClass('prev disabled');
        $next.addClass('next');

        $prev.css({
            'left':     0,
            'height':   window.innerHeight + 'px',
        });

        $next.css({
            'right':    0,
            'height':   window.innerHeight + 'px',
        });

        $element.append($prev);
        $element.append($next);

        new Hammer($prev[0]).on("tap", function() {
           self.prev(); 
        });

        new Hammer($next[0]).on("tap", function() {
           self.next(); 
        });
    }

    /**
     * set the pane dimensions and scale the container
     */
    function setPaneDimensions() {
        var total_width = 0,
            wH          = window.innerHeight;

        widths  = [];
        
        for (var i = 0; i < $panes.length; i++) {
            var newWidth = wH / ratios[i];

            $panes[i].style['width'] = newWidth + 'px';

            widths.push(newWidth);

            total_width += newWidth;
        };
        
        $container.width(total_width);
        total_offset = (window.innerWidth / 2);

        pane_width = parseInt(total_width / $panes.length);

        // Set the container and navigation links to the height of the screen.
        $container.css('height', wH);

        $prev.height( wH );
        $next.height( wH );

        self.showPane(current_pane, false);
    };


    /**
     * show pane by index
     */
    this.showPane = function(index, animate) {
        var offset  = 0,
            count   = 0;

        // between the bounds
        index           = Math.max(0, Math.min(index, pane_count-1));
        current_pane    = index;

        for (var i = 0; i < index; i++) {
            offset -= widths[i];
        };

        offset += (total_offset - (widths[index] / 2));

        $panes.css('opacity', 0.4);
        $panes.get(current_pane).style['opacity'] = 1;

        setContainerOffset(offset, animate);

        if( index > 0 )
            $prev.removeClass('disabled');
        else {
            $prev.addClass('disabled');
        }

        if( index >= (pane_count - 1) )
            $next.addClass('disabled');
        else {
            $next.removeClass('disabled');
        }
    };

    /* 
     * Move the whole list of panels by x. Animation optional.
     */
    function setContainerOffset(x, animate) {
        $container.removeClass("animate");

        if(animate) {
            $container.addClass("animate");
        }

        if( Modernizr.csstransforms3d )
            $container.css("transform", "translate3d("+ x +"px,0,0)");
        else
            $container.css("transform", "translate("+ x +"px,0)");
    }

    this.next = function() { return this.showPane(current_pane+1, true); };
    this.prev = function() { return this.showPane(current_pane-1, true); };


    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch(ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                var pane_offset = 0,
                    count       = 0;

                for (var i = 0; i < current_pane; i++) {
                    pane_offset -= widths[i];
                };

                pane_offset += (total_offset - (widths[current_pane] / 2));

                var drag_offset = ((100/440)*ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                if((current_pane == 0 && ev.gesture.direction == "right") ||
                    (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
                    drag_offset *= .4;
                }

                setContainerOffset(ev.gesture.deltaX + pane_offset);
                break;

            case 'swipeleft':
                self.next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                self.prev();
                ev.gesture.stopDetect();
                break;

            case 'release':
                // more then 30% moved, navigate
                if(Math.abs(ev.gesture.deltaX) > ( (pane_width / 10) * 3 )) {
                    if(ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                }
                else {
                    self.showPane(current_pane, true);
                }
                break;
        }
    }

    new Hammer($element[0], { drag_lock_to_axis: true }).on("release dragleft dragright swipeleft swiperight", handleHammer);
}


Pathways.CropZoom = function() {

    var $elm    = $('.crop-zoom'),
        url     = '';
    
        
    $elm.css({
        position:   'absolute',
        opacity:    Modernizr.touch ? 1 : 0,
        width:      window.innerWidth,
        'z-index':  10
    });

    window.addEventListener('resize', function() {
        $elm.css( { 'width': window.innerWidth } );
    })

    // Tap targets
    $elm.find('.tap-target').each(function() {
        var $target     = $(this),
            key         = $target.data('crop');

        if( !db[key] ) {
            console.warn('No related info was found for this tap target');
            return;
        }

        var image       = url + db[key]['image'],
            title       = db[key]['title']      ? db[key]['title']      : '',
            text        = db[key]['text']       ? db[key]['text']       : '',
            position    = db[key]['position']   ? db[key]['position']   : '',
            img         = new Image(),
            content;

        img.src = image;

        // Create the text content
        content = title != '' ? '<h2>'+title+'</h2>' : '';
        content += '<p>'+ text + '</p>';

        // Set up the tap on the target.
        Hammer( $target.get(0) ).on('tap', function(e) {
            e.gesture.preventDefault();

            var $overlay    = $('<div class="overlay"></div>'),
                $popup      = $('<div class="popup"></div>'),
                $image_crop = $(img).addClass('image-crop'),
                $text       = $('<div class="text"></div>'),
                $close      = $('<div class="close"></div>');

            // Add in the elements
            $text.html(content);
            $popup.append( $image_crop );
            $popup.append( $text );

            $overlay.append($popup);
            $overlay.append( $close );
            $('body').append($overlay);

            $overlay.css('height', window.outerHeight );

            $overlay.css('background-color', 'rgba(0,0,0,0.9)');

            // Set an event so that after the image transitions in, show the text
            $image_crop.get(0).addEventListener('transitionend', function() {                
                $text.css( { top: (window.innerHeight - $text.outerHeight() - 15) } );

                if( position == 'right' )
                    $text.css('right', 40);
                else
                    $text.css('left', 40);

                $text.addClass('show');
            });

            $image_crop.css( { top: 0, left: 0, 'transform': 'translate(0, '+(Pathways.panelHeight / 4)+'px)', opacity: 0 } );

            // prevent scrolling
            $('body').addClass('modal-open');

            // Animate in the text
            setTimeout(function() {
                $image_crop.addClass('animate');

                if( window.innerHeight > window.innerWidth )
                    $image_crop.css({ 'transform': 'translate(0, '+ ((window.innerHeight - $image_crop.height()) / 2) +'px)', opacity: 1 });
                else
                    $image_crop.css({ 'transform': 'translate(0, 0)', opacity: 1 });
            }, 50);

            $image_crop.on('click', function() {
                $overlay.css('opacity', 0);
                $('body').removeClass('modal-open');
                setTimeout(function() {
                    $overlay.remove();
                }, 600);
            });

            $close.on('click', function() {
                $overlay.css('opacity', 0);
                $('body').removeClass('modal-open');
                setTimeout(function() {
                    $overlay.remove();
                }, 600);
            });

            window.addEventListener('resize', function() {
                $overlay.css('height', window.innerHeight );
                $text.css( { top: (window.innerHeight - $text.outerHeight() - 15) } );
            })
        });
    });

}


Pathways.InfiniteCanvas = function() {
    
    $('.infinite-canvas').each(function() {
        var infiniteCanvas = new InfiniteCanvas( this );
        infiniteCanvas.init();
    })
}

function InfiniteCanvas(element) {
    var self            = this,
        _element        = element,
        $element        = $(element),

        totalWidth      = 0,
        totalHeight     = 0,
        totalOffsetX    = 0,
        totalOffsetY    = 0,

        viewportWidth   = window.innerWidth,
        viewportHeight  = window.innerHeight;


    this.init = function() {
        var self = this;

        totalWidth  = $element.outerWidth();
        totalHeight = $element.outerHeight();

        // center the first text block.
        centerText( $('[data-chapter="1"]', $element) );

        // prev/next events
        $element.on('click', '.prev, .next', function(e) {
            var $this   = $(this),
                $target = $(e.target),
                chapter = $this.parents('.text-panel').data('chapter');

            if( $target.hasClass('prev') ) {
                var $text = $('[data-chapter="'+(chapter - 1)+'"]', $element);

                if( $text.length ) {
                    centerText($text);
                }
            }

            if( $target.hasClass('next') ) {
                var $text = $('[data-chapter="'+(chapter + 1)+'"]', $element);

                if( $text.length ) {
                    centerText($text);
                }
            }

            e.preventDefault();
        });

        window.addEventListener('resize', function() {
            viewportWidth   = window.innerWidth,
            viewportHeight  = window.innerHeight;
        });

        this.loadImages();
    }

    this.loadImages = function() {
        console.log('running');
        // for now load all the images in the DB
        var images = canvasDB,
            length = images.length;

        for (var i = 0; i < length; i++) {
            var $img = $('<img/>').addClass('image-panel');

            $img.attr( 'src', '/_assets/img/infinite-canvas/infiniteCanvas_'+images[i].id+'.jpg' );

            $img.css({
                left: images[i].pos[0],
                top: images[i].pos[1]
            });

            $element.append($img);
        };
    }

    // Try to position the text in the middle of the screen, but also keep the canvas within bounds.
    function centerText($elm) {
        var width   = $elm.outerWidth(),
            height  = $elm.outerHeight(),
            top     = $elm.position().top,
            left    = $elm.position().left,

            offsetX = (viewportWidth - width) / 2,
            offsetY = (viewportHeight - height) / 2,

            totalX = (-left + offsetX),
            totalY = (-top + offsetY);

        // Keep within the bounds of the canvas
        if( totalX > 0 )
            totalX = 0;

        if( Math.abs(totalX - viewportWidth) > totalWidth ) {
            totalX = -(totalWidth - viewportWidth);
        }

        if( totalY > 0 )
            totalY = 0;

        if( Math.abs(totalY - viewportHeight) > totalHeight ) {
            totalY = -(totalHeight - viewportHeight);
        }

        setContainerOffset(totalX, totalY, true);
        totalOffsetX = totalX;
        totalOffsetY = totalY;
    }

    function setContainerOffset(x, y, animate) {
        $element.removeClass("animate");

        if(animate) {
            $element.addClass("animate");
        }

        if( Modernizr.csstransforms3d )
            $element.css("transform", "translate3d("+ x +"px, "+ y +"px ,0)");
        else
            $element.css("transform", "translate("+ x +"px,"+ y +"px)");
    }

    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch(ev.type) {
            case 'drag':
                setContainerOffset( (ev.gesture.deltaX + totalOffsetX), (ev.gesture.deltaY + totalOffsetY) );
                break;

            case 'release':
                totalOffsetX += ev.gesture.deltaX;
                totalOffsetY += ev.gesture.deltaY;

                // Drag too far right
                if( totalOffsetX > 0 ) {
                    setContainerOffset(0, totalOffsetY, true);
                    totalOffsetX = 0;
                }

                // Drag too far left
                if( Math.abs(totalOffsetX - viewportWidth) > totalWidth ) {
                    setContainerOffset(-(totalWidth - viewportWidth), totalOffsetY, true);
                    totalOffsetX = -(totalWidth - viewportWidth);
                }

                // Drag too far down
                if( totalOffsetY > 0 ) {
                    setContainerOffset(totalOffsetX, 0, true);
                    totalOffsetY = 0;
                }

                // Drag too far up
                if( Math.abs(totalOffsetY - viewportHeight) > totalHeight ) {
                    setContainerOffset(totalOffsetX, -(totalHeight - viewportHeight), true);
                    totalOffsetY = -(totalHeight - viewportHeight);
                }

                break;
        }
    }

    new Hammer(_element, {}).on("release drag", handleHammer);
}

var canvasDB = [
    { id: '03', pos: [1220,35] },
    { id: '05', pos: [1648,35] },
    { id: '07', pos: [2075,35] },
    { id: '09', pos: [2397,35] },
    { id: '12', pos: [4083,37] },
    { id: '15', pos: [3235,38] },
    { id: '18', pos: [66,52] },
    { id: '21', pos: [6704,54] },
    { id: '24', pos: [5455,68] },
    { id: '27', pos: [773,113] },
    { id: '30', pos: [7418,163] },
    { id: '33', pos: [2765,165] },
    { id: '36', pos: [3704,231] },
    { id: '39', pos: [5913,275] },
    { id: '43', pos: [4836,294] },
    { id: '46', pos: [1220,366] },
    { id: '49', pos: [6704,446] },
    { id: '54', pos: [773,486] },
    { id: '56', pos: [3387,511] },
    { id: '58', pos: [2765,512] },
    { id: '63', pos: [4083,546] },
    { id: '66', pos: [2311,575] },
    { id: '69', pos: [2098,576] },
    { id: '72', pos: [66,670] },
    { id: '79', pos: [4811,758] },
    { id: '81', pos: [5359,758] },
    { id: '83', pos: [3387,790] },
    { id: '89', pos: [2094,870] },
    { id: '93', pos: [6704,930] },
    { id: '96', pos: [773,1078] },
    { id: '99', pos: [4083,1271] },
    { id: '101', pos: [228,1300] },
    { id: '104', pos: [2765,1372] },
    { id: '107', pos: [5902,1414] },
    { id: '109', pos: [6192,1414] },
    { id: '111', pos: [6927,1414] },
    { id: '113', pos: [7420,1414] },
    { id: '116', pos: [1266,1527] },
    { id: '118', pos: [1636,1527] },
    { id: '123', pos: [805,1608] },
    { id: '127', pos: [4809,1628] },
    { id: '130', pos: [5230,1659] },
    { id: '133', pos: [6927,1746] },
    { id: '141', pos: [1265,1816] },
    { id: '144', pos: [1995,1816] },
    { id: '147', pos: [4324,1816] },
    { id: '149', pos: [5902,1845] },
    { id: '151', pos: [6286,1845] },
    { id: '154', pos: [6668,1846] },
    { id: '156', pos: [1629,1852] },
    { id: '159', pos: [7420,1903] },
    { id: '161', pos: [805,1998] },
    { id: '168', pos: [5406,2101] },
    { id: '170', pos: [6286,2101] },
    { id: '171', pos: [6927,2114] },
    { id: '172', pos: [1265,2126] },
    { id: '175', pos: [315,2135] },
    { id: '178', pos: [4984,2178] },
    { id: '183', pos: [4226,2212] },
    { id: '192', pos: [5902,2371] },
    { id: '194', pos: [6414,2371] },
    { id: '196', pos: [805,2388] },
    { id: '199', pos: [1729,2389] },
    { id: '201', pos: [2164,2389] },
    { id: '203', pos: [2875,2389] },
    { id: '207', pos: [7420,2451] },
    { id: '210', pos: [4982,2455] },
    { id: '211', pos: [3387,2480] },
    { id: '213', pos: [3707,2480] },
    { id: '216', pos: [6414,2692] },
    { id: '219', pos: [4226,2726] },
    { id: '221', pos: [4674,2726] },
    { id: '223', pos: [5406,2741] },
    { id: '227', pos: [6927,2876] },
    { id: '233', pos: [2164,2914] },
    { id: '235', pos: [2571,2914] },
    { id: '237', pos: [147,2944] },
    { id: '240', pos: [1801,2944] },
    { id: '245', pos: [4991,2997] },
    { id: '251', pos: [5409,3114] },
    { id: '255', pos: [4674,3140] },
    { id: '257', pos: [2164,3172] },
    { id: '260', pos: [3632,3177] },
    { id: '268', pos: [2550,3345] },
    { id: '270', pos: [2949,3345] },
    { id: '272', pos: [1801,3377] },
    { id: '276', pos: [4226,3424] },
    { id: '279', pos: [7079,3429] },
    { id: '281', pos: [7396,3429] },
    { id: '283', pos: [270,3461] },
    { id: '285', pos: [533,3461] },
    { id: '289', pos: [4990,3537] },
    { id: '291', pos: [2550,3618] },
    { id: '293', pos: [941,3653] },
    { id: '296', pos: [6006,3705] },
    { id: '298', pos: [6333,3705] },
    { id: '303', pos: [119,3818] },
    { id: '306', pos: [7079,3876] },
]

Pathways.Infographic = function() {

    var $svg = $('[data-component="infographic"] svg');

    $svg.on('click', 'circle', function() {
        var $this   = $(this),
            top     = $this.position().top,
            left    = $this.position().left,
            radius  = $this.attr('r'),

            center_x = left + (radius / 2),
            center_y = top + (radius / 2);

        // console.log(top, left);
        $svg.css('transform-origin', center_x + 'px ' + center_y + 'px' );
        $svg.css('transform', 'scale(3, 3)');
    });
}

Pathways.LibraryPanel = function() {
    $('.library-panel').on('click', '.handle', function() {
        var $self   = $(this),
            $panel  = $self.parent();

        if( $panel.hasClass('active') ) {
            $panel.css('transform', 'translate('+ ($panel.outerWidth()) +'px, '+ ($panel.outerHeight() - 60) +'px)');
            $panel.removeClass('active');
        }
        else {
            $panel.css('transform', 'translate(38px, 38px)');
            $panel.addClass('active');

            $(window).one('scroll', function() {
                $self.trigger('click');
            });
        }
    })
}


Pathways.Modal = function() {

    $('.modal').on('click', function() {
        var modal = new Modal( $(this) );
        modal.init();
    });

}

function Modal(elm) {

    var self = this,
        $elm = elm,
        $overlay,
        $image_crop,
        $close;

    this.init = function() {
        var img         = new Image(),
            $overlay    = $('<div class="overlay"></div>'),
            $image_crop = $(img).css('opacity', 0),
            $close      = $('<div class="close"></div>');

        img.src = $elm.attr('data-image');

        img.onload = function() {

            var width   = this.width,
                height  = this.height,

                top     = (window.innerHeight / 2) - (height / 2),
                left    = (window.innerWidth / 2) - (width / 2);

            $image_crop.css({ position: 'absolute', top: top, left: left });

            $overlay.append( $image_crop );
            $image_crop.animate({'opacity': 1}, 500);
        }

        $overlay.append( $close );
        $('body').append( $overlay );

        //
        $overlay.css( {
            'height':           window.outerHeight,
            'background-color': 'rgba(0,0,0,0.9)'
        });

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            setTimeout(function() {
                $overlay.remove();
            }, 600);
        });
    }
}

Pathways.PlayerOverlay = function(elem) {

    var $element = $(elem),

        defaultPanelOffset = 180,
        fullScreenPanelOffset = 0,

        rootSel = 'body',
        playerSel = '.wellcomePlayer',
        
        activeClass = 'modal-open',
        overlayFullscreenClass = 'overlay-fullscreen',

        closeTmpl = '<div class="close"></div>',
        overlayTmpl = '<div class="overlay"></div>',
        iframeTmpl = '<iframe/>';        


    function getHeightWithOffset(offset) {
        offset = offset || 0;
        return Pathways.panelHeight - offset;
    }

    function getWidthWithOffset(offset) {
        offset = offset || 0;
        return window.innerWidth - offset;
    }


    $element.on('click', function(e) {

        var $this = $(this),      
            embedData = $this.data('embed'),
            isFullScreen = false;

        if (embedData) {

            var initHeight = getHeightWithOffset(defaultPanelOffset),
                initWidth = getWidthWithOffset(defaultPanelOffset),

                playerTmpl = '<div class="wellcomePlayer" data-no-load="true" data-config="/player-config.js" data-uri="' + embedData + '" data-assetsequenceindex="0" data-assetindex="0" data-zoom="-0.6441,0,2.2881,1.4411" data-config="/service/playerconfig" style="width:' + initWidth + 'px; height:' + initHeight + 'px; background-color: #000"></div>',
        
                $player,
                $overlay,
                $close;

            function getOffset() {
                if (isFullScreen) {
                    return fullScreenPanelOffset;
                } else {
                    return defaultPanelOffset;
                }
            }

            function resizePlayerToDimensions(width, height) {

                $overlay.css('height', getHeightWithOffset(0));

                $player.css('width', width);
                $player.css('height', height);

                Pathways.Utils.positionCenter($player);
            }

            function resizePlayer() {
                var offset = getOffset();
                resizePlayerToDimensions(getWidthWithOffset(offset), getHeightWithOffset(offset));
            }


            function createOverlay(tmpl, $rootEl, $closeEl) {
                var $el = $(tmpl);
                $el.append($closeEl);
                $rootEl.append($el);          
                return $el;
            }

            function createPlayer(tmpl, $rootEl) {
                $el = $(tmpl);
                $rootEl.append($el);
                return $el;
            }

            function initPlayer(sel){                
                window.initPlayers($(sel));  
            }

            function initOverlay($el, sel) {
               
                $el.on('click', function() {   
                    $(rootSel).removeClass(activeClass);
                    isFullScreen = false;
                    window.embedScriptIncluded = false;
                    
                    setTimeout(function(){
                        $el.remove();
                    }, 1000); // give css transition time 
                });

                setTimeout(function() {
                    // prevent scrolling
                    $(rootSel).addClass(activeClass);   
                    initPlayer(sel);              
                }, 50); // delay before adding class to ensure transition event will fire
                
            }


            function addDocListeners() {

                $(window).resize(resizePlayer);

                $(document).bind('onToggleFullScreen', function(event, goFullScreen) {                    

                    if (goFullScreen) {
                        isFullScreen = true;                       
                        $overlay.addClass(overlayFullscreenClass);
                    } else {
                        isFullScreen = false;
                        $overlay.removeClass(overlayFullscreenClass);
                    }
                    
                    resizePlayer();
                });

                // test currentViewUri event
                //$(document).bind("onCurrentViewUri", function(event, uri) {
                    //console.log('download uri: ' + uri);
                //});
            }

            function init() {
                var $root = $(rootSel);

                $close = $(closeTmpl);
                $overlay = createOverlay(overlayTmpl, $root, $close);
                $player = createPlayer(playerTmpl, $overlay);
                
                addDocListeners();

                initOverlay($overlay, playerSel);
            }

            init();
            resizePlayer();

            e.preventDefault();
            return false;
        }
    });

}

Pathways.PlayerOverlay.alwaysLoad = true;


Pathways.Quiz = function() {

    $('body').on('click', '[data-component="quiz"]', function(e) {
        // setup overlay
        var $overlay    = $('<div class="overlay"></div>'),
            $close      = $('<div class="close"></div>');

        $overlay.css('height', window.innerHeight );

        // append overlay
        $('body').append( $overlay );

        $overlay.show();
        $overlay.css({
            'background-color': 'rgba(0,0,0,0.9)',
            'background-image': 'url('+quiz_db['images'] + '/' + 'bg.jpg)'
        });

        // prevent scrolling
        $('body').addClass('modal-open');

        // append and initialize quiz
        setTimeout(function() {
            var $code           = $( _('#template-quiz').innerHTML ),
                $content        = $('<div class="content"></div>'),
                $quizContainer  = $('<div class="quiz"></div>');

            $content.append( $code );
            $quizContainer.append( $content );
            $overlay.append( $quizContainer );

            Pathways.Utils.positionCenter($quizContainer);

            var quiz = new Quiz($quizContainer);

            $overlay.append( $close );
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            $('body').removeClass('modal-open');

            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

        $(window).on('resize', function() {
            $overlay.css('height', window.innerHeight);
        });

    });
}

function Quiz(element) {
    var $quiz           = $(element),
        paused          = false,
        level           = 1,
        imagesLocation  = quiz_db['images'],
        questions       = quiz_db['questions'],
        answers         = quiz_db['questions'][level]['answers'],
        totalQuestions  = questions.length,
        score           = 0,

        timerWait       = 5, // in seconds
        timerLength     = 5, // in seconds

        $remaining  = $quiz.find('.remaining'),
        $score      = $quiz.find('.score span'),

        $timer      = $('<div/>').addClass('timer').css('display', 'none'),
        timerID,
        timeoutWaitID;


    this.init = function() {
        var self = this;

        // load the intro image
        var $quizHeader = $quiz.find('.quiz-header-image'),
            $image      = $('<img/>').attr('src', imagesLocation + '/intro.jpg');

        $quizHeader.html($image);

        // Add the timer
        $quiz.append($timer);

        $quiz.on('click', '.quiz-start .button', function() {
            self.start();
        });

        // set up the click events
        $quiz.on('click', 'li', function(e) {
            if( !paused )
                self.validate(e);
        });
    }

    this.start = function() {

        var self = this;

        $quiz.find('.quiz-start').hide();
        $quiz.find('.status-bar').show();
        $quiz.find('.quiz-playground').show();

        // Load the level
        this.loadLevel();
    }

    this.getCurrentQuestion = function() {
        return questions[(level-1)];
    }

    this.loadLevel = function(l) {
        // image
        var self        = this,
            question    = this.getCurrentQuestion(),
            $image      = $('<img/>').attr('src', imagesLocation + '/' + question['image']),
            str         = '<ul>';

        $quiz.find('.image').html($image);

        // question
        $quiz.find('.question').html(question['title']);

        // answers
        for (var i = 0; i < question['answers'].length; i++) {
            str += '<li>' + question['answers'][i] + '</li>';
        }

        str += '</ul>';

        $quiz.find('.answers').html(str);

        this.updateScore();
        this.updateQuestionsRemaining();

        // Wait for timerWait seconds then start a timerLength countdown
        timeoutWaitID = setTimeout(function() {
            self.startTimer();
        }, (timerWait * 1000));
    }

    this.validate = function(e) {
        var self        = this,
            question    = this.getCurrentQuestion(),
            correct     = false;

        this.stopTimer();

        if( $quiz.find('li').index($(e.currentTarget)) == (question['correct'] - 1) )
            correct = true;

        if( correct ) {
            paused = true;
            this.showCorrect($(e.currentTarget));
            score++;
            this.updateScore();
        }
        else
            this.showError($(e.currentTarget));

        setTimeout(function() {
            paused = false;
            self.stopTimer();
            self.nextQuestion($(e.currentTarget));
        }, 2000)
    }

    this.nextQuestion = function($elm) {
        level++;

        if( level <= questions.length )
            this.loadLevel();
        else
            this.finishGame();
    }

    this.showCorrect = function($elm) {
        $elm.addClass('correct');
    }

    this.showError = function($elm) {
        $elm.addClass('wrong');
    }

    this.revealAnswers = function() {
        var self        = this,
            question    = this.getCurrentQuestion(),
            count       = 1;

        $quiz.find('.answers li').each(function() {
            if(count == question['correct'])
                self.showCorrect($(this));
            else
                self.showError($(this));

            count++;
        })
    }

    this.updateScore = function() {
        $score.html(score);
    }

    this.updateQuestionsRemaining = function() {
        $remaining.html('<em>'+level+'</em> of <span>'+totalQuestions+'</span>');
    }

    this.startTimer = function() {
        var self    = this,
            counter = timerLength;

        this.stopTimer();

        var elm     = $quiz.find('.quiz-playground .image'),
            diff    = $quiz.find('.quiz-playground .image').offset().top - $quiz.find('.quiz-playground').offset().top;

        $timer.css({
            top:        (diff + elm.outerHeight() / 2) - ($timer.height() / 2),
            left:       (elm.outerWidth() / 2) - ($timer.width() / 2)
        })
        .html(counter);

        $timer.fadeIn(100);

        // Every second, count down.
        timerID = setInterval(function() {
            if(counter > 1) {
                $timer.html(--counter);
            }
            else {
                $timer.html('<span style="color:red">'+ (--counter) + '</span>');

                paused = true;
                self.stopTimer();
                self.revealAnswers();

                setTimeout(function() {
                    paused = false;
                    $timer.fadeOut(100);
                    self.nextQuestion();
                }, 2000);
            }
        }, 1000);
    }

    this.stopTimer = function() {
        clearInterval(timerID);
        clearTimeout(timeoutWaitID);
        
        $timer.fadeOut(100);
    }


    this.finishGame = function() {
        var self            = this,
            $quiz_finish    = $quiz.find('.quiz-finish');

        this.stopTimer();
        $timer.css('display', 'none');

        $quiz_finish.find('.quiz-finish--score').html('<span>'+score+'</span> out of ' + totalQuestions);
        
        $quiz.find('.quiz-playground').hide();
        $quiz_finish.show();

        $quiz_finish.on('click', '.play-again', function() {
            self.restart();
        });
    }

    this.restart = function() {
        this.stopTimer();

        score = 0;
        level = 1;

        $quiz.find('.quiz-finish').hide();

        this.start();
    }

    this.init();
}

Pathways.ToggleSection = function(elem) {
	
	var $element			= $(elem),
		$target             = $($element.attr('data-toggle-section-target')), // TODO
		$scrollAnchor       = $($element.attr('data-toggle-section-anchor')),
        height              = $target.height();

    $target.css({ 'height': 0, 'transition': 'height 0.4s ease' });

    $element.on('click', function toggleOpen() {
    	
    	$target.toggleClass('open');

    	if($target.hasClass('open')) {
    		$target.css('height', height);
    		
    		$('html, body').animate({
                scrollTop: $scrollAnchor.offset().top - 100
            }, 400);
    	} else {
    		$target.css('height', 0);
    	}

        return false;
    });

}

Pathways.ToggleSection.alwaysLoad = true;

Pathways.Scene.MesmersSalon = function(panelID) {

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       (Pathways.panelHeight - 100),
            offset:         100
        })
        .on('enter', function(e) {       
            _('.crop-zoom').style['position'] = 'fixed';
            TweenMax.to('.crop-zoom', 0.2, { opacity: 1 }); // Fade in
        })
        .on('leave', function(e) {
            TweenMax.to('.crop-zoom', 0.2, { opacity: 0 }); // Fade out
            
            setTimeout(function() {
                _('.crop-zoom').style['position'] = 'absolute';
            }, 200);
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.MagnetisedTrees = function(panelID) {
    
    

// Canvas animations. Forget trying to pause/play on entering exiting the panel. Let it go, man. Just let it go...

/*function initCanvas(images) {
    var canvas = document.getElementById("canvas");
    var images = images||{};
    var stage = new createjs.Stage(canvas);

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", bindFileLoad(images));
    loader.addEventListener("complete", bindComplete(canvas, stage));
    loader.loadManifest(lib.properties.manifest);
    return stage;
}

function bindFileLoad(images) {
    return function handleFileLoad(evt) {
        if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
    }
}

function bindComplete(canvas, stage) {
    return function handleComplete() {
        var exportRoot = new lib.tree2();

        stage.addChild(exportRoot);
        stage.update();

        createjs.Ticker.setFPS(lib.properties.fps);

        if( Modernizr.touch ) {
            createjs.Ticker.addEventListener("tick", stage);
        }
    }
}

var stage = initCanvas(images);

if( window.innerWidth >= 768 ) {
    initCanvas();
}*/

    var scene1 = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            
            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to(panelID + ' .black-strip', .4, { y: 0 }); // Scroll up
                createjs.Ticker.addEventListener("tick", stage);
            }
        })
        .on('leave', function(e) {
            
            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to(panelID + ' .black-strip', .2, { y: Pathways.panelHeight }); // scroll down
                createjs.Ticker.removeEventListener("tick", stage);
            }
        });

    Pathways.Scenes.push(scene1);
}

Pathways.Scene.OkeySisters = function(panelID) {

    $('#okey-sisters .main-content, #okey-sisters .secondary-content').css({ 'bottom': 'auto', 'top': Pathways.panelHeight });
    $('#thomas-wakley .main-content').css({ 'bottom': 'auto', 'top': (Pathways.panelHeight / 3) });

    var $panel      = $(panelID),
        height      = $panel.outerHeight();

    var scene = new ScrollScene({
            triggerElement: panelID,
            triggerHook:    'top',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to('.black-strip', .5, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to('.black-strip', .2, { y: Pathways.panelHeight }); // scroll down
        })


    Pathways.Scenes.push(scene);
}

Pathways.Scene.GonadMan = function(panelID) {

    var $panel  = $(panelID),
        $quiz   = $panel.find('[data-component="quiz"]'),
        height  = $panel.outerHeight();

    var scene1 = new ScrollScene({
            triggerElement: panelID,
            triggerHook:    'top',
            duration: function () { return $panel.outerHeight() + (Pathways.panelHeight * 0.5); }            
        })
        .on('enter', function() {
            $panel.addClass('active');
        }).on('leave', function(){
            $panel.removeClass('active');
        });

    Pathways.Scenes.push(scene1);
}

Pathways.Scene.India = function(panelID) {

    var $panel      = $(panelID),
        $boats      = $panel.find('.boats'),
        ratio       = 1050 / 1900,
        boat_ratio  = 322 / 1900,
        boat_height = (boat_ratio * window.innerWidth),
        offsetHeight = $(panelID).find('.main-content').outerHeight() + 100;

        var height  = $panel.outerHeight();

    $boats.css({ bottom: 0, height: boat_height });

    $(window).on('resize', function() {
        boat_height = (boat_ratio * window.innerWidth);
        $boats.css({ height: boat_height });
    });

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       function() { return $panel.outerHeight() + (Pathways.panelHeight / 4); }
        })
        .on('enter', function() {            
            console.log(' >> enter boats');
            $boats.css('transition', 'transform 120s linear');
            $boats.css('transform', 'translate('+window.innerWidth+'px,0)');
        })
        .on('leave', function() {      
        console.log(' >> exit boats');      
            $boats.css('transition', 'none');
            $boats.css('transform', 'translate(-600px,0)');
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.Trilby = function(panelID) {

    $('.comic-panel').css('opacity', 0);

    $('.comic-panel').each(function() {
        var $this   = $(this),
            tween   = TweenMax.to( $this, 1, { opacity: 1 } ),
            offset  = $this.data('offset') ? $this.data('offset') : 0;

        var scene = new ScrollScene({
                triggerElement:     $this,
                duration:           200,
                offset:             offset
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);
    });
    
}

Pathways.Scene.AnnaO = function(panelID) {

    var positions = [
        { x: -57,   y: -107 },
        { x: 79,    y: 32 },
        { x: 178,   y: 178 },
        { x: -144,  y: 106 },
    ];

    var counter = 0;
    var $panel = $(panelID);

    $(panelID + ' .fragmented').each(function() {
        var $this = $(this);

        var x = positions[counter].x,
            y = positions[counter].y;

        if( Modernizr.csstransforms3d )
            $this.css( { 'transform': 'translate3d('+ x +'px, '+ y +'px, 0)' } );
        else
            $this.css( { 'transform': 'translate('+ x +'px, '+ y +'px)' } );

        counter++;
    })

    $(panelID + ' .fragmented').each(function() {
        var tween = TweenMax.to( $(this), 1, { x: 0, y: -3 } );

        var scene = new ScrollScene({
                triggerElement: panelID,
                triggerHook:    'top',
                duration:       function() { return $panel.height() - 400; },
                offset:         50,
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);
    });

}

Pathways.Scene.Office = function(panelID) {

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to(panelID + ' .black-strip', .5, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to(panelID + ' .black-strip', .2, { y: Pathways.panelHeight }); // scroll down
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.Office2 = function(panelID) {

    var $panel = $(panelID), 
        $img = $panel.find('.large-screen').first();

    var scene = new ScrollScene({
            triggerElement: panelID, 
            duration:       function () { return $panel.outerHeight() + (Pathways.panelHeight * 0.5); }, 
            offset:         100
        })
        .on('enter', function() {     
            console.log('enter couch')       
            $img.css('transition', 'transform 14s ease');
            $img.css('transform', 'translate(-80%, -10%) scale(1.8, 1.8)');
        })
        .on('leave', function() {
            $img.css('transition', 'none');
            $img.css('transform', 'translate(0,0) scale(1.6, 1.6)');
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.JohnTradescant = function() {

    $('.sliding-panel').css({ 'opacity': 0 });

    var translate_array = [-100, 100, -100, 100, -100, 100, -100, 100, -100, 100, -100, 100],
        count           = 0;

    $('.sliding-panel').each(function() {
        var $this   = $(this);

        $this.css('transform', 'translate('+ translate_array[count] +'px,0)');

        var tween   = TweenMax.to( $this, 1, { x: 0, opacity: 1 } ),
            offset  = $this.data('offset') ? $this.data('offset') : 0;

        var scene = new ScrollScene({
                triggerElement:     $this,
                duration:           200,
                offset:             offset
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);

        count++;
    });
}

Pathways.Scene.DukeOfBuckingham = function() {

    var startY;

    var scene = new ScrollScene({
            triggerElement: '#duke-of-buckingham',
            triggerHook:    'top',
            duration:       Pathways.panelHeight,
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                startY = window.scrollY;
            else
                startY = window.scrollY - (Pathways.panelHeight - 100);
        })
        .on('progress', function(e) {
            $('.pence').css('transform', 'translate(0, '+ (window.scrollY - startY) +'px)');
        })

    Pathways.Scenes.push(scene);

    // Keep the clipping mask the correct height in relation to the 'cover' background.
    var ratio = 1900 / 1050,
        $clip = $('#duke-of-buckingham .clip');

    function resizeClip() {
        if( (window.innerWidth / window.innerHeight) > ratio ) {
            var newHeight   = window.innerWidth / ratio,
                percent     = (newHeight / 100) * 87,
                difference  = newHeight - window.innerHeight;

            // console.log(newHeight, window.innerHeight, difference);

            $clip.css( { 'height': percent, 'transform': 'translate(0, '+ -difference +'px)' } );
        }
        else
            $clip.css('height', '87%');
    }

    resizeClip();

    window.addEventListener('resize', function() {
        resizeClip();
    });
}

Pathways.Scene.UniqueArtifacts = function() {

    var $bg         = $('#unique-artifacts .bg-container'),
        bg_tween    = TweenMax.to( _('#unique-artifacts .bg-container'),    1, { 'background-position': '50% -216px' }),
        crop_tween  = TweenMax.to( _('#unique-artifacts .crop-zoom'),       1, { 'y': '-216' });

    var scene = new ScrollScene({
            triggerElement: '#unique-artifacts',
            duration:       (Pathways.panelHeight - 100),
            offset:         100
        })
        .on('enter', function(e) {
            _('.crop-zoom').style['position'] = 'fixed';
            TweenMax.to('.crop-zoom', 0.2, { opacity: 1 }); // Fade in
        })
        .on('leave', function(e) {
            TweenMax.to('.crop-zoom', 0.2, { opacity: 0 }); // Fade out
            
            setTimeout(function() {
                _('.crop-zoom').style['position'] = 'absolute';
            }, 200);
        });

    var scene2 = new ScrollScene({
            triggerElement: '#unique-artifacts',
            duration:       (Pathways.panelHeight - 100)
        })
        .setTween(bg_tween)

    var scene3 = new ScrollScene({
            triggerElement: '#unique-artifacts',
            duration:       (Pathways.panelHeight - 100)
        })
        .setTween(crop_tween)

    Pathways.Scenes.push(scene);
    Pathways.Scenes.push(scene2);
    Pathways.Scenes.push(scene3);
}

Pathways.Scene.KenVideo = function() {

    var $panel  = $('#ken-video'),
        video   = $panel.find('video').get(0);

    var scene = new ScrollScene({
            triggerElement: $panel,
            duration:       Pathways.panelHeight + 100
        })
        .on('enter', function(e) {
            video.play();
        })
        .on('leave', function(e) {
            video.pause();
            video.currentTime = 0;
        });

    Pathways.Scenes.push(scene);
}

Pathways.Scene.Example = function() {

    var scene = new ScrollScene({
            triggerElement: '#example',
            duration:       Pathways.panelHeight,
            offset:         0
        })
        .on('enter', function(e) {
            //
        })
        .on('leave', function(e) {
            //
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.BillsOfMortality = function() {

    var scene1 = new ScrollScene({
            triggerElement: '#bills-of-mortality',
            triggerHook:    'top',
            duration:       Pathways.panelHeight + 150
        })
        .on('enter', function(e) {
            if( _('#bills-of-mortality video') )
                _('#bills-of-mortality video').play();
        })
        .on('leave', function(e) {
            if( _('#bills-of-mortality video') ) {
                _('#bills-of-mortality video').pause();
                _('#bills-of-mortality video').currentTime = 0;
            }
        });

    Pathways.Scenes.push(scene1);
}

Pathways.Scene.GrauntRecords = function() {

    var scene = new ScrollScene({
            triggerElement: '#graunt-records',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            $('#graunt-records').addClass('active');
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.IsaacNewton = function() {

    var scene1 = new ScrollScene({
            triggerElement: '#isaac-newton',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to('#isaac-newton .black-strip', .4, { y: 0 }); // Scroll up
            }
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to('#isaac-newton .black-strip', .2, { y: Pathways.panelHeight }); // scroll down
            }
        });

    Pathways.Scenes.push(scene1);
}

Pathways.Scene.Example = function() {

    var scene = new ScrollScene({
            triggerElement: '#example',
            duration:       Pathways.panelHeight,
            offset:         0
        })
        .on('enter', function(e) {
            //
        })
        .on('leave', function(e) {
            //
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.SeizedAndDestroyed = function() {

    var $panel = $('#seized-and-destroyed'),
        vector = { x: -10, y: -5 };

    $panel.find('.rubbish div').each(function() {    
        // random number between 5 and 25 (create a random num between 0 and 20 then add 5);
        var rand    = 5 + (Math.random() * 20),
            pos     = { x: vector.x * rand, y: vector.y * rand },
            tween   = TweenMax.to( $(this), 1, { x: pos.x, y: pos.y } );

        var scene = new ScrollScene({
                triggerElement: $panel,
                duration:       $panel.outerHeight(),
                offset:         50,
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);
    });
}

Pathways.Scene.JosephKhan = function() {
    var scene = new ScrollScene({
            triggerElement: '#joseph-khan',
            duration:       Pathways.panelHeight + 100
        })
        .on('enter', function(e) {
            var ci_vid = _('#joseph-khan video');
            ci_vid.play();
        })
        .on('leave', function(e) {
            var ci_vid = _('#joseph-khan video');
            ci_vid.pause();
            ci_vid.currentTime = 0;
        });

    Pathways.Scenes.push(scene);
}

Pathways.Scene.BritishMuseum = function() {

    var scene = new ScrollScene({
            triggerElement: '#british-museum',
            triggerHook:    'top'
        })
        .on('enter', function(e) {
            $('#british-museum').addClass('active');
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.Letters = function() {

    var scene = new ScrollScene({
            triggerElement: '#letters',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( _('#letters audio') ) {
                _('#letters audio').play();
            }
        })
        .on('leave', function() {
            if( _('#letters audio') ) {
                _('#letters audio').pause();
            }
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.Example = function(panel_height, panelID) {

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight,
            offset:         0
        })
        .on('enter', function(e) {
            //
        })
        .on('leave', function(e) {
            //
        })

    Pathways.Scenes.push(scene);
}