function _(str) {
    return document.querySelector(str);
}

var Pathways = {};
Pathways.MIN_COMPONENT_LEVEL = 2;
Pathways.MIN_SCROLL_LEVEL = 4;


/***
 *   System capabilities
 */
(function(w, exports, $, undefined) {

    var capabilities = {
        aspectRatio: 1900 / 1050,
        supportsTouch: false,
        innerHeight: 0,
        innerWidth: 0,
        orientation: 'landscape',
        level: 0,

        calcSupportsTouch: function() {
            return ('ontouchstart' in w) || (w.DocumentTouch && document instanceof DocumentTouch);
        },
        calcOrientation: function() {
            return (this.innerWidth / this.innerHeight) > 1.2 ? 'landscape' : 'portrait';
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
    };

    capabilities.getDisplaySettings();
    capabilities.init();

    exports.system = capabilities;

}(window, Pathways, jQuery));


/****
 *
 * Cookie manager
 */

(function(w, exports, cookies) {

    var expiry = Infinity,
        path = '/',
        cookieDefs = {
            mute: {
                id: '_wt_pathways_muted',
                set: 'muteOnLoad',
                unset: 'noMuteOnLoad'
            },
        };

    function getCookieDef(id) {
        if (!cookieDefs[id]) console.warn('Pathways Cookie Manager -- no cookie definition found for \''+id+'\'');
        return cookieDefs[id];
    }

    function getCookieOrDefaultValActual(id) {
        var cookieDef = getCookieDef(id),
            cookieName = cookieDef.id;

        return cookies.hasItem(cookieName) ? cookies.getItem(cookieName) : cookieDef.unset;
    }

    function getCookieOrDefaultValBool(id) {
        var cookieDef = getCookieDef(id),
            cookieRaw = getCookieOrDefaultValActual(id),
            val = (cookieRaw === cookieDef.set);

        return val;
    }

    function setCookieFromBool(id, isTrue) {
        var cookieDef = getCookieDef(id),
            cookieName = cookieDef.id;

        if (cookies.consent === 'agreed') {
            var cookieVal = (isTrue) ? cookieDef.set : cookieDef.unset;
            cookies.setItem(cookieName, cookieVal, expiry, path);
        }
    }

    exports.cookieManager = {
        getCookieOrDefaultValActual: getCookieOrDefaultValActual,
        getCookieOrDefaultValBool: getCookieOrDefaultValBool,
        setCookieFromBool: setCookieFromBool
    };

}(window, Pathways, docCookies));

/***
 *   Audio: mixer
 */
Pathways.audio = {};
(function(w, exports, $, cookies) {

    var model,
        isMuted;

    function init(_model) {
        model = _model;
        mute(cookies.getCookieOrDefaultValBool('mute'));
    }

    function mute(doMute) {

        if (doMute === isMuted) return;

        isMuted = doMute;

        $('video, audio').each(function() {
            this.muted = isMuted;
        });

        cookies.setCookieFromBool('mute', doMute);
    }

    function disable() {
        $('video, audio').each(function() {
            this.muted = true;
        });
    }

    function getIsMuted() {
        return isMuted;
    }

    function crossfade(fromAudio, toAudio, callback) {
        var delay = 1000;
        var onlyFrom = (fromAudio && !toAudio);

        if (fromAudio === toAudio) {
            if (callback) w.setTimeout(callback, delay);
            return;
        }

        if (fromAudio && (typeof fromAudio !== 'undefined')) {
            $(fromAudio).stop(false, true);
            $(fromAudio).animate({
                volume: 0
            }, {
                duration: delay,
                complete: function() {
                    this.pause();
                    if (onlyFrom && callback) {
                        callback();
                        callback = null;
                    }
                }
            });
        }

        // fade in
        if (toAudio && (typeof toAudio !== 'undefined')) {
            $(toAudio).stop(false, true);
            toAudio.volume = 0;
            toAudio.muted = isMuted;
            toAudio.play();
            $(toAudio).animate({
                volume: 1
            }, {
                duration: delay,
                complete: function() {
                    if (!onlyFrom && callback) {
                        callback();
                        callback = null;
                    }
                }
            });
        }
    }

    function loadPanelAudio(panelAudio) {
        crossfade(model.globalAudio(), panelAudio);
    }

    function unloadPanelAudio(panelAudio) {
        crossfade(panelAudio, model.globalAudio());
    }

    exports.mixer = {
        init: init,
        crossfade: crossfade,
        mute: mute,
        disable: disable,
        isMuted: getIsMuted,
        loadPanelAudio: loadPanelAudio,
        unloadPanelAudio: unloadPanelAudio
    };

}(window, Pathways.audio, jQuery, Pathways.cookieManager));


/***
 *   Audio: model
 */
(function(w, exports, mixer, $) {

    var globalAudio,
        panelTracks;

    function initPanelAudio(panels, selector) {

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
            //console.log()
            //audio.muted = mixer.isMuted();
            mixer.crossfade(null, audio);
        }

        return audio;
    }

    function init(panels) {
        globalAudio = initGlobalAudio('[data-audio="global"]');
        panelTracks = initPanelAudio(panels, '[data-audio="panel"]');
    }

    exports.model = {
        init: init,
        globalAudio: function() {
            return globalAudio;
        },
        panelTracks: function() {
            return panelTracks;
        }
    };

}(window, Pathways.audio, Pathways.audio.mixer, jQuery));

/***
 *   Audio: view
 */
(function(w, exports, mixer, $) {

    var $muteButton;

    function create(muteSelector) {
        var $btn = $(muteSelector);
        $btn.css('display', 'block');
        $btn.off('click');
        $btn.on('click', function(e) {
            // active == muted
            if ($(this).hasClass('active')) {
                mixer.mute(false);
            } else {
                mixer.mute(true);
            }

            update();

            e.preventDefault();
            return false;
        });

        return $btn;
    }

    function init() {
        $muteButton = create('.mute');
        update();
    }

    function update() {
        if (mixer.isMuted()) {
            $muteButton.addClass('active');
        } else {
            $muteButton.removeClass('active');
        }
    }

    function hide() {
        $muteButton.hide();
    }

    exports.view = {
        init: init,
        hide: hide,
        update: update
    };

}(window, Pathways.audio, Pathways.audio.mixer, jQuery));




/***
    Video
*/
(function(w, exports, sys, audio, $) {

    var panelVideos;

    function initPanelVideo(panels, videoSelector) {

        var videos = [];

        var volumeChangeHandler = function() {
            if (this.muted == audio.mixer.isMuted()) return;
            audio.mixer.mute(this.muted);
            audio.view.update();
        };
        var errorHandler = function() {
            console.warn('Video loading error for ', _video.src);
        };

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem;
            var _video = _panel.querySelector(videoSelector);

            if (_video) {

                _video.addEventListener('volumechange', volumeChangeHandler);

                _video.addEventListener('error', errorHandler);

                if (sys.level >= exports.MIN_SCROLL_LEVEL) {
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


    function getCrossFadeAudio(value, gAudio) {
        var audio = null;
        if (value || (typeof value == 'undefined')) {
            audio = gAudio;
        }
        return audio;
    }

    function autoPlayVideoOnEnter(video, initTime, stopGlobalAudio) {
        initTime = initTime || 0;
        var fadeAudio = getCrossFadeAudio(stopGlobalAudio, audio.model.globalAudio());

        if (video) {
            if (video.readyState !== 0) video.currentTime = initTime;
            audio.mixer.crossfade(fadeAudio, video);
        }

    }

    function autoStopVideoOnLeave(video, initTime, restartGlobalAudio) {
        initTime = initTime || 0;
        var fadeAudio = getCrossFadeAudio(restartGlobalAudio, audio.model.globalAudio());

        if (video) {

            audio.mixer.crossfade(video, fadeAudio, function() {
                if (video.readyState !== 0) video.currentTime = initTime;
            });
        }

    }

    function getPanelVideoElement(panelID) {
        return _(panelID + ' video');
    }




    function initVideo(panels) {
        panelVideos = initPanelVideo(panels, 'video');
        hideCaptions(panelVideos);
    }

    exports.video = {
        init: initVideo,
        autoPlayVideoOnEnter: autoPlayVideoOnEnter,
        autoStopVideoOnLeave: autoStopVideoOnLeave
    };

}(window, Pathways, Pathways.system, Pathways.audio, jQuery));

/***
    Pathways main
*/
(function(w, _, mod, sys, audio, video, $, undefined) {

    'use strict';

    var doc = w.document,

        minHeight = 550,
        startPanel,
        panels,
        ratioedPanels,

        scenesLoaded = false,
        componentsLoaded = false,

        sceneController,

        panelHeightDecreased = false;



    mod.panelHeight = calcPanelHeight(minHeight);
    mod.getPanelHeight = function() {
        return this.panelHeight;
    };



    function camelCase(str) {
        str = str || '';
        return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }

    function toTitleCase(str) {
        str = str || '';
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

    function getHeightWithOffset(offset) {
        offset = offset || 0;
        return mod.panelHeight - offset;
    }

    function getWidthWithOffset(offset) {
        offset = offset || 0;
        return w.innerWidth - offset;
    }




    function calcPanelHeight(oldHeight) {
        var newHeight = sys.innerHeight < minHeight ? minHeight : sys.innerHeight;

        if (oldHeight > newHeight) {
            panelHeightDecreased = true;
        } else {
            panelHeightDecreased = false;
        }


        return newHeight;
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

    function isRatioPreserved(panel) {
        return panel.config && panel.config.background && panel.config.background.preserve_ratio;
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

            if (isRatioPreserved(panels[i])) {
                rPanels.push(panels[i]);
            }
        }
        return rPanels;
    }


    function loadComponents(context, height) {
        var $components = $('[data-component]');

        $components.each(function(index, component) {

            var $component = $(component),
                handlerName = $component.attr('data-component'),
                id = camelCase($component.attr('id')),
                handlerClass = camelCase(handlerName),
                method = context[handlerClass],
                data;

            if (typeof method === 'undefined' || method === null) return console.warn('Could not load the necessary component: ' + handlerClass);

            if (id && method[id] && method[id].data) data = method[id].data;

            method(component, data);
        });
    }



    function setElementHeight(el, height) {
        $(el).css('height', parseInt(height, 10) + 'px');
    }

    function unSetElementHeight(el) {
        $(el).css('height', '');
    }

    function translatePanelElem(_el, currentHeight) {

        var newHeight = sys.innerWidth / sys.aspectRatio,
            prefixes = ['-moz-', '-webkit-', ''],
            y = parseInt(((currentHeight - newHeight) / 2), 10);

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

        var unsizePanel = function(index, child) {
            $(child).removeAttr('style');
        };

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem,
                _bg = panels[i].bg;

            $(_panel).removeAttr('style');
            $(_bg).removeAttr('style');

            //unSetElementHeight(_panel);
            //unSetElementHeight(_bg);


            if (isRatioPreserved(panels[i])) {
                $(_panel).children().each(unsizePanel);
            }
        }
    }

    function resizePanel(panel, panelHeight) {
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

            if (isRatioPreserved(panels[i])) {
                $(panels[i].elem).children().each(resizePanelChild);
            }
        }
    }

    function removeScrollSceneStyling() {

        if (startPanel) $(startPanel).removeAttr('style');
        $('.comic-panel').removeAttr('style');

        for (var i = 0; i < panels.length; i++) {
            var panel = panels[i],
                $bg = $(panel.bg),
                $panel = $(panel.elem),
                panelID = $panel.attr('id'),
                $libraryPanel = $panel.find('[data-panel="' + panelID + '"]').first(),
                $gallery = $panel.find('[data-component="gallery"]'),
                $quiz = $panel.find('[data-component="quiz"]'),
                $slidingPanels = $panel.find('.sliding-panel');

            if ($bg.length) $bg.removeAttr('style');
            if ($libraryPanel.length) $libraryPanel.removeAttr('style');
            if ($gallery.length) $gallery.removeAttr('style');
            if ($quiz.length) $quiz.removeAttr('style');
            if ($slidingPanels.length) $slidingPanels.removeAttr('style');

        }
    }


    var panelsUnsized = false;

    function resizeCheck() {
        if (sys.level < mod.MIN_COMPONENT_LEVEL) {
            unsizePanels(panels);
            panelsUnsized = true;
        } else if (sys.level >= mod.MIN_COMPONENT_LEVEL && sys.level < mod.MIN_SCROLL_LEVEL) {
            resizePanels(null, ratioedPanels);
            panelsUnsized = false;
        } else if (sys.level >= mod.MIN_SCROLL_LEVEL) {
            resizePanels(startPanel, panels);
            panelsUnsized = false;
        }
    }

    function loadCheck(onScrollLoad, onScrollUnload) {
        mod.panelHeight = calcPanelHeight(mod.panelHeight);

        // If it's iPad width or larger, load the components
        if (!componentsLoaded) {
            if (sys.level >= mod.MIN_COMPONENT_LEVEL) {
                loadComponents(mod.components);
                componentsLoaded = true;
            }
        } else {
            if (sys.level < mod.MIN_COMPONENT_LEVEL) {
                // unload components
            }
        }

        if (!scenesLoaded) {
            // If it's a non-touch device, load the scenes.
            if (sys.level >= mod.MIN_SCROLL_LEVEL) {
                sceneController = onScrollLoad();

                audio.model.init(panels);
                audio.mixer.init(audio.model);
                audio.view.init();


                scenesLoaded = true;
            }
        } else {
            if (sys.level < mod.MIN_SCROLL_LEVEL) {
                sceneController.destroy(true);
                removeScrollSceneStyling();
                onScrollUnload();

                audio.mixer.disable();
                audio.view.hide();

                scenesLoaded = false;
            }
        }

    }

    function init(onLoadComplete, onScrollLoad, onScrollUnload) {

        startPanel = $('.start').get(0);
        panels = initPanels('.panel');
        ratioedPanels = initRatioedPanels(panels);

        resizeCheck();

        w.addEventListener('resize', function() {
            resizeCheck();
            loadCheck(onScrollLoad, onScrollUnload);
        });

        // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
        $(function(){
            onLoadComplete();
            resizeCheck();
            loadCheck(onScrollLoad, onScrollUnload);

            video.init(panels);
        });
    }

    mod.init = init;

    mod.translatePanelElem = translatePanelElem;

    mod.scrollScenes = {};
    mod.components = {};

    mod.utils = {
        camelCase: camelCase,
        toTitleCase: toTitleCase,
        positionCenter: positionCenter,
        getHeightWithOffset: getHeightWithOffset,
        getWidthWithOffset: getWidthWithOffset
    };

}(this, _, Pathways, Pathways.system, Pathways.audio, Pathways.video, jQuery));
