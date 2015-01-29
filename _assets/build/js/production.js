console.log('include /index');
Pathways = Pathways || {};


/***
 *   System capabilities
 */
console.log('include system/index');
(function(exports, w, $, undefined) {

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

}(Pathways, window, jQuery));

/***
 *   Pathways utils
 */
console.log('include utils/index');
(function(exports, sys, $, undefined) {

    function toCamelCase(str) {
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

    function extendClass(base, sub) {
        // Avoid instantiating the base class just to setup inheritance
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
        // for a polyfill
        // Also, do a recursive merge of two prototypes, so we don't overwrite
        // the existing prototype, but still maintain the inheritance chain
        // Thanks to @ccnokes
        var origProto = sub.prototype;
        sub.prototype = Object.create(base.prototype);
        for (var key in origProto) {
            sub.prototype[key] = origProto[key];
        }
        // Remember the constructor property was set wrong, let's fix it
        sub.prototype.constructor = sub;
        // In ECMAScript5+ (all modern browsers), you can make the constructor property
        // non-enumerable if you define it like this instead
        Object.defineProperty(sub.prototype, 'constructor', {
            enumerable: false,
            value: sub
        });
    }

    function removeItemFromArray(item, array) {
        var i = array.indexOf(item),
            val = [];
        if (i != -1) {
            val = array.splice(i, 1);
        }

        return val.length ? val[0] : void 0;
    }

    function unique(array1, array2) {
        var array3 = [];

        var arr = array1.concat(array2),
            len = arr.length;

        while (len--) {
            var itm = arr[len];
            if (array3.indexOf(itm) === -1) {
                array3.unshift(itm);
            }
        }
        return array3;
    }

    function curry() {
        var fn = this,
            args = Array.prototype.slice.call(arguments);
        return function() {
            return fn.apply(this, args.concat(
                Array.prototype.slice.call(arguments)));
        };
    }

    function getSrc(media) {
        if (!media) return 'no media';
        return media.src || media.currentSrc;
    }



    exports.utils = {
        toCamelCase: toCamelCase,
        toTitleCase: toTitleCase,
        positionCenter: positionCenter,
        extendClass: extendClass,
        removeItemFromArray: removeItemFromArray,
        unique: unique,
        extend: $.extend,
        curry: curry,
        getSrc: getSrc
    };

}(Pathways, Pathways.system, jQuery));

Pathways.core = {};

console.log('include media/vol/index');
(function(exports, utils, jQuery) {

    exports.events = exports.events || {};
    var _splice = Array.prototype.splice;

    function callEach(listeners, args) {

        var len = listeners.length,
            i, listener;

        for (i = 0; i < len; ++i) {
            listener = listeners[i];
            if (typeof listener === 'function') listener.apply(null, args);
        }
    }

    function getCtrlOb(listeners) {
        return {
            on: function addListener(eName, listener) {
                if (!listeners) return console.warn('EventListener must be instantiated first');
                listeners[eName] = listeners[eName] || [];
                var eListeners = listeners[eName];
                eListeners.push(listener);
                return listener;
            },
            off: function removeListener(eName, listener) {
                utils.removeItemFromArray(listener, listeners[eName]);
            },
            emit: function() {
                var args = _splice.call(arguments, 0);
                var eName = args[0],
                eListeners = listeners[eName];
                if (!eListeners) return;

                args = _splice.call(args, 1);

                callEach(eListeners, args);
            }
        };
    }

    exports.events.getEventListener = function(model) {
        return getCtrlOb([]);
    };

}(Pathways.core, Pathways.utils, jQuery));

console.log('include viewCtrl');
(function(exports, utils, jQuery) {

    exports.view = exports.view || {};
    var _splice = Array.prototype.splice;

    function callEach(views, method, args) {

        var len = views.length,
            i, view;

        for (i = 0; i < len; ++i) {
            view = views[i];
            if (view[method]) view[method].apply(view, args);
        }
    }

    function getCtrlOb(views) {
        return {
            update: function update() {
                callEach(views, 'update', _splice.call(arguments, 0));
            },
            disable : function disable() {
                callEach(views, 'disable', _splice.call(arguments, 0));
            },
            enable: function enable() {
                callEach(views, 'enable', _splice.call(arguments, 0));
            },
            addView: function addView(view) {
                if (view.update) {
                    views.push(view);
                } else {
                    console.warn('[Pathways CtrlWithViews] view must have update method');
                }
                return view;
            },
            removeView: function removeView(view) {
                utils.removeItemFromArray(view, views);
            }
        };
    }

    exports.view.getViewCtrl = function(model) {
        return getCtrlOb([]);
    };

}(Pathways.core, Pathways.utils, jQuery));

/****
 *
 * Cookie manager
 */
console.log('include cookies/index');
(function(exports, cookies) {

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
        if (!cookieDefs[id]) console.warn('Pathways Cookie Manager -- no cookie definition found for \'' + id + '\'');
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

}(Pathways, docCookies));

console.log('include media/index');

Pathways.media = {};

console.log('include media/model');
(function(exports, $) {

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

}(Pathways.media, jQuery));

console.log('include media/vol/index');
(function(exports, view, cookies, utils, $) {

    var model = {
            isMuted: false,
            currentVol: 1
        },
        viewCtrl = view.getViewCtrl(model);

    exports.vol = Object.create(viewCtrl, {

        setStateFromCookies: {
            value: function setStateFromCookies() {
                this.mute(cookies.getCookieOrDefaultValBool('mute'));
            }
        },
        mute: {
            value: function mute(doMute) {
                if (doMute === model.isMuted) return;
                model.isMuted = doMute;
                this.update(doMute);
            }
        },
        // disable: {
        //     value: function disable() {
        //         viewCtrl.disable();
        //     }
        // },
        update: {
            value: function update(doMute) {
                viewCtrl.update(doMute);
                cookies.setCookieFromBool('mute', doMute);
            }
        },
        enable: {
            value: function enable() {
                viewCtrl.enable();
                viewCtrl.update(model.isMuted);
            }
        },
        isMuted: {
            value: function isMuted() {
                return model.isMuted;
            }
        }
    });

}(Pathways.media, Pathways.core.view, Pathways.cookieManager, Pathways.utils, jQuery));

Pathways.media.vol.views = {};

console.log('include media/vol/views/global');
/***
 *   Audio: global vol view
 */
(function(exports, vol, $) {

    function GlobalMuteView(globalMediaSelector) {
        this.globalMediaSelector = globalMediaSelector;
        this.isEnabled = false;
    }

    GlobalMuteView.prototype = {
        enable: function() {
            this.isEnabled = true;
            $(this.globalMediaSelector).each(function(e) {
                this.pause();
            });
        },
        update: function(isMuted) {
            if (!this.isEnabled) return;
            $(this.globalMediaSelector).each(function(e) {
                this.muted = isMuted;
            });
        },
        disable: function() {
            this.isEnabled = false;
            $(this.globalMediaSelector).each(function(e) {
                this.pause();
            });
        }
    };

    exports.getGlobalView = function(globalMediaSelector) {
        return new GlobalMuteView(globalMediaSelector);
    };

}(Pathways.media.vol.views, Pathways.media.vol, jQuery));

console.log('include media/vol/views/mutebtn');
/***
 *   Audio: vol view
 */
(function(exports, vol, $) {

    function getDomElement(muteSelector) {
        var $btn = $(muteSelector);
        removeClickHandlers($btn);
        return $btn;
    }

    function addClickHandler($btn, vol) {
        $btn.on('click', function(e) {
            // active == muted
            if ($(this).hasClass('active')) {
                vol.mute(false);
            } else {
                vol.mute(true);
            }

            e.preventDefault();
            return false;
        });
    }

    function removeClickHandlers($btn) {
        $btn.off('click');
    }

    function MuteButtonView(muteSelector) {
        this.isEnabled = false;
        this.$btn = getDomElement(muteSelector);
    }

    MuteButtonView.prototype = {
        enable: function() {
            this.isEnabled = true;
            addClickHandler(this.$btn, vol);
            this.$btn.show();
        },
        disable: function() {
            this.isEnabled = false;
            removeClickHandlers(this.$btn);
            this.$btn.hide();
        },
        update: function(isMuted) {
            if (!this.isEnabled) return;
            if (isMuted) {
                this.$btn.addClass('active');
            } else {
                this.$btn.removeClass('active');
            }
        }
    };

    exports.MuteButtonView = MuteButtonView;
    exports.getMuteButtonView = function (muteSelector) {
        return new MuteButtonView(muteSelector);
    };

}(Pathways.media.vol.views, Pathways.media.vol, jQuery));

console.log('include media/vol/views/unlinkedmedia');
/***
 *   Audio: vol view
 */
(function(exports, vol, utils, $) {

    function LinkedMediaView(media) {
        this.media = media;
    }
    LinkedMediaView.prototype = {
        update: function(isMuted) {
            this.media.muted = isMuted;
        }
    };

    exports.LinkedMediaView = LinkedMediaView;
    exports.getLinkedMediaView = function (src) {
        return new LinkedMediaView(src);
    };

}(Pathways.media.vol.views, Pathways.media.vol, Pathways.utils, jQuery));

console.log('include media/mixer/index');
/***
 *   Media audio mixer
 */
(function(exports, w, vol, $) {

    function setMediaTime(media, time) {
        if (!media || typeof time === 'undefined' || isNaN(time)) return;
        if (media.readyState !== 0) {
            media.currentTime = time;
        }
    }

    function setMediaStateAtEnd(media, config) {
        if (!(media && config)) return;
        setMediaTime(media, config.seekToTimeAtEnd);
    }

    function setMediaStateAtStart(media, config) {
        if (!(media && config)) return;
        setMediaTime(media, config.seekToTimeAtStart);
    }

    function fadeOut(media, duration, config, callback) {
        duration = duration || 0;
        if (media && (typeof media !== 'undefined')) {
            $(media).stop(false, true);
            $(media).animate({
                volume: 0
            }, {
                duration: duration,
                complete: function() {
                    this.pause();
                    setMediaStateAtEnd(media, config);
                    if (callback) {
                        callback();
                        callback = null;
                    }
                }
            });
        }
    }

    function fadeIn(media, duration, config, callback) {
        duration = duration || 0;
        if (media && (typeof media !== 'undefined')) {
            setMediaStateAtStart(media, config);
            $(media).stop(false, true);
            media.volume = 0;
            media.muted = vol.isMuted();
            media.play();
            $(media).animate({
                volume: 1
            }, {
                duration: duration,
                complete: function() {
                    if (callback) {
                        callback();
                        callback = null;
                    }
                }
            });
        }
    }

    function crossfade(fadeOutMedia, fadeInMedia, duration, fadeOutCompleteCallback, fadeInCompleteCallback, fadeOutConfig, fadeInConfig) {
        duration = duration || 0;

        if (fadeOutMedia === fadeInMedia) {
            if (fadeOutCompleteCallback) w.setTimeout(fadeOutCompleteCallback, duration);
            if (fadeInCompleteCallback) w.setTimeout(fadeInCompleteCallback, duration);
            return;
        }

        if (fadeOutMedia !== null && typeof fadeOutMedia !== 'undefined') {
            fadeOut(fadeOutMedia, duration, fadeOutConfig, fadeOutCompleteCallback);
        } else {
            if (fadeOutCompleteCallback) w.setTimeout(fadeOutCompleteCallback, duration);
        }

        if (fadeInMedia !== null && typeof fadeInMedia !== 'undefined') {
            fadeIn(fadeInMedia, duration, fadeInConfig, fadeInCompleteCallback);
        } else {
            if (fadeInCompleteCallback) w.setTimeout(fadeInCompleteCallback, duration);
        }
    }

    exports.mixer = {
        crossfade: crossfade,
        fadeIn: fadeIn,
        fadeOut: fadeOut
    };


}(Pathways.media, window, Pathways.media.vol, jQuery));

(function(exports, utils) {

    function getExcludesFromDefs(defs) {
        return [].concat(defs).map(function(def) {
            return def.config.exclude || [];
        }).reduce(function(lastExclude, currExclude) {
            return utils.unique(lastExclude, currExclude);
        }, []);
    }

    function getSilenceesById(silencees, ids) {
        return ids.map(function mapId (id) {
            return [].concat(silencees).filter(function(silencee){
                return silencee.id === id;
            }).pop();
        });
    }

    function getSilenceesByDefs(silencees, defList) {
        return getSilenceesById(silencees, getExcludesFromDefs(defList));
    }

    function removeSilenceeSet(list, set, silencer) {
        set.forEach(function removeSilencee(item) {
            utils.removeItemFromArray(item, list);
            item.removeSilencer(silencer);
        });
    }

    function SilenceCtrl(channel) {

        this.silencers = [];
        this.silencees = [];
        this.channel = channel;
        this.id = this.channel.id;
    }

    SilenceCtrl.prototype = {

        addSilencer: function addSilencer(silencer) {
            this.silencers.push(silencer);
            if (!this.hasNoSilencers()) {
                this.channel.silence();
            }
        },

        removeSilencer: function removeSilencer(silencer) {
            utils.removeItemFromArray(silencer, this.silencers);
            if (this.hasNoSilencers()) {
                this.channel.resume();
            }
        },

        hasNoSilencers: function hasNoSilencers(channelID) {
            if (this.silencers.length === 0) return true;
            return false;
        },

        addSilencee: function addSilencee(silencee) {
            this.silencees.push(silencee);
            silencee.addSilencer(this);
        },

        removeSilencee: function removeSilencee(silencee) {
            var set = [].concat(silencee);
            removeSilenceeSet(this.silencees, set, this);
        },

        removeSilenceesByDefs: function removeSilenceesByDefs(defList) {
            defList = [].concat(defList);
            var set = getSilenceesByDefs(this.silencees, defList);
            if (set.length === 0) return;
            removeSilenceeSet(this.silencees, set, this);
        },

        toString: function toString () {
            return '[' + this.id + '] ' + this.silencers;
        }
    };


    exports.silencer = {
        SilenceCtrl: SilenceCtrl,
        getSilenceCtrl: getSilenceCtrl = function(id, config) {
            return new SilenceCtrl(id, config);
        }
    };


}(Pathways.media, Pathways.utils));

console.log('include media/channels/track');

(function(exports, mixer, utils) {

    var unique = utils.unique;

    function MediaDefinition(media, config) {
        this.media = media;
        this.config = config;
    }

    MediaDefinition.prototype = {
        play: function play(channel, config) {
            config = utils.extend({}, this.config, config);
            var media = this.media,
                fadeDuration = parseInt((config && config.fadeDuration), 10),
                maxConcurrentSounds = parseInt(config.maxConcurrentSounds, 10);

            mixer.fadeIn(media, fadeDuration, config);
            while (channel.length() > maxConcurrentSounds) {
                var head = channel.shift();
                mixer.fadeOut(head.media, fadeDuration, head.config);
            }
        },
        stop: function stop(config) {
            config = utils.extend({}, this.config, config);
            var media = this.media,
                fadeDuration = parseInt((config && config.fadeDuration), 10);

            mixer.fadeOut(media, fadeDuration, config);
        },
        getExcludes: function getExcludes() {
            return this.config.exclude || [];
        }
    };


    function MediaDefinitionList(channel) {
        this.list = [];
        this.channel = channel;
    }
    MediaDefinitionList.prototype = {
        push: function(media, config) {
            var definition = getMediaDefinition(media, config);
            this.list.push(definition);
            // setChannelStateOnComplete(definition, this);
            return definition;
        },

        remove: function(definition) {
            return utils.removeItemFromArray(definition, this.list);
        },
        removeAll: function() {
            var defs = [].concat(this.list);
            this.list = [];
            return defs;
        },
        removeSet: function(defs) {
            defs = [].concat(defs);
            var list = [].concat(this.list),
                removed = [];

            defs.forEach(function(def) {
                var l = utils.removeItemFromArray(def, list);
                if (l) removed.push(l);
            });
            this.list = list;
            return removed;
        },
        removeByMedia: function(media) {
            return this.removeSet(this.getByMedia(media));
        },

        getAll: function() {
            return [].concat(this.list);
        },
        shift: function() {
            return this.list.shift();
        },
        getByMedia: function(media) {
            var mediaList = [].concat(media),
                mediaDefs = this.list;

            return mediaList.map(function(medium) {
                return mediaDefs.filter(function(def) {
                    return def.media === medium;
                })[0];
            }) || [];
        },

        isEmpty: function() {
            return this.list.length === 0;
        },
        length: function() {
            return this.list.length;
        },

        getExcludes: function getExcludes() {
            var arr = this.list;
            var ret = arr.map(function(def) {
                return def.getExcludes();
            }).reduce(function(lastExclude, currExclude) {
                return unique(lastExclude, currExclude);
            }, []);
            console.log('ret', ret);
            return ret;
        }

    };

    function getMediaDefinition(media, config) {
        return new MediaDefinition(media, config);
    }

    exports.MediaDefinition = MediaDefinition;
    exports.getMediaDefinition = getMediaDefinition;

    exports.MediaDefinitionList = MediaDefinitionList;
    exports.getMediaDefinitionList = function() {
        return new MediaDefinitionList();
    };


}(Pathways.media, Pathways.media.mixer, Pathways.utils));

(function(exports, getMediaDefinitionList, getSilenceCtrl, mixer, utils, $) {

    function noop() {}
    function setChannelStateOnComplete(def, channel) {

        var media = def.media,
            config = def.config;

        function onComplete() {

            media.currentTime = config.seekToTimeAtEnd || 0;
            channel.removeMediaDefinitions(def);

            if (channel.isEmpty()) {
                switch (channel.state.id) {
                    case 'activePlaying':
                        channel.setState(channel.getState('activeStopped'));
                        break;
                    case 'inactivePlaying':
                        channel.setState(channel.getState('inactiveStopped'));
                        break;
                }
            }

            media.removeEventListener('ended', onComplete);
        }
        media.addEventListener('ended', onComplete);

        return def;
    }

    function ChannelDefaultState(channel) {
        this.channel = channel;
    }

    ChannelDefaultState.prototype = {
        play: function(media, config) {},
        stopAll: function(config) {},
        stop: function(media, config) {},
        silence: noop,
        resume: noop
    };


    function ChannelInactiveStoppedState(channel) {
        ChannelDefaultState.call(this, channel);
    }

    ChannelInactiveStoppedState.prototype = {
        play: function(media, config) {
            this.channel.setState(this.channel.getState('inactivePlaying'));
        },
        resume: function() {
            this.channel.setState(this.channel.getState('activeStopped'));
        }
    };
    utils.extendClass(ChannelDefaultState, ChannelInactiveStoppedState);


    function ChannelInactivePlayingState(channel) {
        ChannelDefaultState.call(this, channel);
    }

    ChannelInactivePlayingState.prototype = {
        stopAll: function() {
            var defs = this.channel.removeAllMediaDefinitions();
            this.channel.setState(this.channel.getState('inactiveStopped'));
            return defs;
        },
        stop: function(media) {
            var defs = this.channel.removeMediaDefinitionsByMedia(media);
            if (this.channel.isEmpty()) {
                this.channel.setState(this.channel.getState('inactiveStopped'));
            }
            return defs;
        },
        resume: function() {
            var defs = this.channel.getAllMediaDefinitions(),
                channel = this.channel;

            defs.forEach(function(def) {
                def.play(channel);
            });

            this.channel.setState(this.channel.getState('activePlaying'));
            return defs;
        }
    };
    utils.extendClass(ChannelDefaultState, ChannelInactivePlayingState);


    function ChannelActiveStoppedState(channel) {
        ChannelDefaultState.call(this, channel);
    }



    ChannelActiveStoppedState.prototype = {
        play: function(media, config) {
            var def = this.channel.addMediaDefinition(media, config);
            def.play(this.channel, config);

            this.channel.setState(this.channel.getState('activePlaying'));
            return def;
        },
        silence: function() {
            this.channel.setState(this.channel.getState('inactiveStopped'));
        }
    };

    utils.extendClass(ChannelDefaultState, ChannelActiveStoppedState);


    function ChannelActivePlayingState(channel) {
        ChannelDefaultState.call(this, channel);
    }

    ChannelActivePlayingState.prototype = {
        play: function(media, config) {
            var def = this.channel.addMediaDefinition(media, config);
            def.play(this.channel, config);

            return def;
        },
        stopAll: function(config) {

            var defs = this.channel.removeAllMediaDefinitions();
            defs.forEach(function(def) {
                def.stop(config);
            });

            this.channel.setState(this.channel.getState('activeStopped'));
            return defs;
        },
        stop: function(media, config) {
            var defs = this.channel.removeMediaDefinitionsByMedia(media);
            defs.forEach(function(def) {
                def.stop(config);
            });

            if (this.channel.isEmpty()) {
                this.channel.setState(this.channel.getState('activeStopped'));
            }
            return defs;

        },
        silence: function() {
            var defs = this.channel.getAllMediaDefinitions();
            defs.forEach(function(def) {
                def.stop();
            });
            this.channel.setState(this.channel.getState('inactivePlaying'));
            return defs;
        }
    };
    utils.extendClass(ChannelDefaultState, ChannelActivePlayingState);



    function Channel(id, config) {

        this.id = id;
        this.config = config || null;
        this.media = getMediaDefinitionList(this);
        this.silencer = getSilenceCtrl(this);

        this.addState('activeStopped', new ChannelActiveStoppedState(this));
        this.addState('inactiveStopped', new ChannelInactiveStoppedState(this));
        this.addState('activePlaying', new ChannelActivePlayingState(this));
        this.addState('inactivePlaying', new ChannelInactivePlayingState(this));

        this.setState(this.getState('activeStopped'));
    }

    Channel.prototype = {
        addState: function(stateID, state) {
            this.states = this.states || {};
            this.states[stateID] = state;
        },
        setState: function(state) {
            if (this.state === state) return;
            this.state = state;
        },
        getState: function(stateID) {
            return this.states[stateID];
        },
        silence: function() {
            return this.state.silence();
        },
        resume: function() {
            return this.state.resume();
        },
        play: function(media, config) {
            // console.debug('channel -', this.id, '- play', getSrc(media));
            var def = this.state.play(media, config);
            return def;
        },
        stopAll: function(config) {
            // console.debug('channel -', this.id, '- stop', getSrc(this.currentMedia));
            return this.state.stopAll(config);
        },
        stop: function(media, config) {
            // console.debug('channel -', this.id, '- stop', getSrc(this.currentMedia));
            return this.state.stop(media, config);
        },



        addMediaDefinition: function(media, config) {
            return setChannelStateOnComplete(this.media.push(media, config), this);
        },

        removeAllMediaDefinitions: function() {
            var defs = this.media.removeAll();
            this.silencer.removeSilenceesByDefs(defs);
            return defs;
        },
        removeMediaDefinitions: function(defs) {
            this.media.removeSet(defs);
            this.silencer.removeSilenceesByDefs(defs);
            return defs;
        },
        removeMediaDefinitionsByMedia: function(media) {
            var defs = this.media.removeByMedia(media);
            this.silencer.removeSilenceesByDefs(defs);
            return defs;
        },

        getAllMediaDefinitions: function() {
            return this.media.getAll();
        },
        shift: function() {
            return this.media.shift();
        },
        isEmpty: function() {
            return this.media.isEmpty();
        },
        length: function() {
            return this.media.length();
        }

    };


    exports.channels = {
        Channel: Channel,
        getChannel: getChannel = function(id, config) {
            return new Channel(id, config);
        }
    };


}(Pathways.media, Pathways.media.getMediaDefinitionList, Pathways.media.silencer.getSilenceCtrl, Pathways.media.mixer, Pathways.utils, jQuery));

console.log('include media/channels/model');
(function(exports, getChannel, utils) {

    var extend = utils.extend,
        unique = utils.unique;

    var CHANNEL_IDS = {
            global: 'global',
            video: 'video',
            panel: 'panel',
            component: 'component',
            fx: 'fx',
        },
        channelList = [CHANNEL_IDS.global, CHANNEL_IDS.panel, CHANNEL_IDS.video, CHANNEL_IDS.component, CHANNEL_IDS.fx],
        configs = {
            global: {
                exclude: null,
                fadeDuration: 1000,
                // seekToTimeAtStart: false,
                // seekToTimeAtEnd: false,
                maxConcurrentSounds: 1
            },
            video: {
                exclude: [CHANNEL_IDS.global, CHANNEL_IDS.panel],
                fadeDuration: 1000,
                // seekToTimeAtStart: false,
                // seekToTimeAtEnd: false,
                maxConcurrentSounds: 1
            },
            component: {
                exclude: [CHANNEL_IDS.global, CHANNEL_IDS.panel, CHANNEL_IDS.video],
                fadeDuration: 1000,
                // seekToTimeAtStart: false,
                // seekToTimeAtEnd: false,
                maxConcurrentSounds: 1
            },
            panel: {
                exclude: [CHANNEL_IDS.global],
                fadeDuration: 1000,
                // seekToTimeAtStart: false,
                // seekToTimeAtEnd: false,
                maxConcurrentSounds: 1
            },
            fx: {
                exclude: null,
                fadeDuration: 0,
                seekToTimeAtStart: 0,
                // seekToTimeAtEnd: false,
                maxConcurrentSounds: 4, // or 'Infinity'
            }
        },
        channels;



    function setMode() {
        addChannel(CHANNEL_IDS.global, configs.global);
        addChannel(CHANNEL_IDS.video, configs.video);
        addChannel(CHANNEL_IDS.component, configs.component);
        addChannel(CHANNEL_IDS.panel, configs.panel);
        addChannel(CHANNEL_IDS.fx, configs.fx);
        //TODO: update for change in functionality level
    }

    function init() {
        channels = {};
        setMode();
    }

    function addChannel(channelID, config) {
        channels = channels || {};
        if (channels.hasOwnProperty(channelID)) return console.warn('[Pathways Channel] [addChannel] channel with id \'' + channelID + '\' already exists');
        channels[channelID] = getChannel(channelID, config);
    }

    function getChannelById(channelID) {
        var channel = channels[channelID];
        if (!channel) return console.warn('[Pathways Channel] [getChannelById] no channel found with id \'' + channelID + '\'');
        return channel;
    }



    exports.model = {
        init: init,
        addChannel: addChannel,
        removeChannel: function() {},
        getChannelById: getChannelById,
        CHANNEL_IDS: CHANNEL_IDS
    };

}(Pathways.media.channels, Pathways.media.channels.getChannel, Pathways.utils));

console.log('include media/channels/ctrl');
(function(exports, model, utils) {

    var extend = utils.extend,
        unique = utils.unique;

    function init() {
        model.init();
    }

    function getSilenceMethod(silencer) {
        return function silenceChannel(channelID) {
            var channel = model.getChannelById(channelID);
            silencer.addSilencee(channel.silencer);
        };
    }

    function silenceChannels(channelsToExclude, silencer) {
        if (!channelsToExclude || channelsToExclude === 'none') return;
        if (channelsToExclude === 'all') channelsToExclude = channelList;
        if (channelsToExclude.length === 0) return;

        channelsToExclude.forEach(getSilenceMethod(silencer));
    }

    function playMediaOnChannel(media, channelID, config) {
        if (!media) return;
        var channel = model.getChannelById(channelID);
        config = extend({}, channel.config, config);
        silenceChannels(config.exclude, channel.silencer);
        channel.play(media, config);
    }

    function stopChannel(channelID, config) {
        var channel = model.getChannelById(channelID);
        if (channel.isEmpty()) return;
        config = extend({}, channel.config, config);

        channel.stopAll(config);
    }

    function stopMediaOnChannel(media, channelID, config) {
        if (!media) return;
        var channel = model.getChannelById(channelID);
        config = extend({}, channel.config, config);

        channel.stop(media, config);
    }

    function playMediaOnPanelChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.panel, config);
    }

    function stopMediaOnPanelChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.panel, config);
    }

    function stopPanelChannel(config) {
        stopChannel(model.CHANNEL_IDS.panel, config);
    }

    function playMediaOnGlobalChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.global, config);
    }

    function stopMediaOnGlobalChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.global, config);
    }

    function stopGlobalChannel(config) {
        stopChannel(model.CHANNEL_IDS.global, config);
    }

    function playMediaOnVideoChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.video, config);
    }

    function stopMediaOnVideoChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.video, config);
    }

    function stopVideoChannel(config) {
        stopChannel(model.CHANNEL_IDS.video, config);
    }

    function playMediaOnComponentChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.component, config);
    }

    function stopMediaOnComponentChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.component, config);
    }

    function stopComponentChannel(config) {
        stopChannel(model.CHANNEL_IDS.component, config);
    }

    function playMediaOnFxChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.fx, config);
    }

    function stopMediaOnFxChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.fx, config);
    }

    function stopFxChannel(config) {
        stopChannel(model.CHANNEL_IDS.fx, config);
    }

    exports.ctrl = {
        init: init,

        playMediaOnChannel: playMediaOnChannel,
        stopMediaOnChannel: stopMediaOnChannel,
        stopChannel: stopChannel,

        playMediaOnPanelChannel: playMediaOnPanelChannel,
        stopMediaOnPanelChannel: stopMediaOnPanelChannel,
        stopPanelChannel: stopPanelChannel,

        playMediaOnGlobalChannel: playMediaOnGlobalChannel,
        stopMediaOnGlobalChannel: stopMediaOnGlobalChannel,
        stopGlobalChannel: stopGlobalChannel,

        playMediaOnVideoChannel: playMediaOnVideoChannel,
        stopMediaOnVideoChannel: stopMediaOnVideoChannel,
        stopVideoChannel: stopVideoChannel,

        playMediaOnComponentChannel: playMediaOnComponentChannel,
        stopMediaOnComponentChannel: stopMediaOnComponentChannel,
        stopComponentChannel: stopComponentChannel,

        playMediaOnFxChannel: playMediaOnFxChannel,
        stopMediaOnFxChannel: stopMediaOnFxChannel,
        stopFxChannel: stopFxChannel
    };

}(Pathways.media.channels, Pathways.media.channels.model, Pathways.utils));

console.log('include media/ctrl');
(function(exports, model, vol, channelCtrl, $) {

    function init() {

        channelCtrl.init();

    }


    exports.ctrl = $.extend({}, channelCtrl, {
        init: init,
        disable: function() {
            console.log('disabling media');
            // TODO: disabling media
        }
    });


}(Pathways.media, Pathways.media.model, Pathways.media.vol, Pathways.media.channels.ctrl, jQuery));

console.log('include media/video/index');
/***
    Video
*/
(function(exports, p, sys, vol, $) {

    var panelVideos;

    function volumeChangeHandler (e) {
        if (this.muted == vol.isMuted()) return;
        vol.mute(this.muted);
    }

    function errorHandler (e) {
        console.warn('Video loading error for ', (this.src || this.currentSrc));
    }

    function initPanelVideo(panels, videoSelector) {

        var videos = [];

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem;
            var _video = _panel.querySelector(videoSelector);

            if (_video) {

                _video.addEventListener('volumechange', volumeChangeHandler);
                _video.addEventListener('error', errorHandler);

                if (sys.level >= p.MIN_SCROLL_LEVEL) {
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


    function initVideo(panels) {
        panelVideos = initPanelVideo(panels, 'video');
        hideCaptions(panelVideos);
    }

    exports.video = {
        init: initVideo
    };

}(Pathways, Pathways, Pathways.system, Pathways.media.vol, jQuery));


/***
    Pathways scrollscene scrollDurations
*/
(function(exports, w, p, $) {

    'use strict';

    var screenDurationCache = 0,
        componentDurationCache = 0,
        mediaDurationCache = 0,
        lastMediaDurationCache = 0,
        opacityTransitionDurationCache = 0;

    function getScreenDuration() {
        return screenDurationCache;
    }

    function getComponentDuration(offset) {
        return function() {
            var val = componentDurationCache - offset;
            return (val > 0 ? val : 0);
        };
    }

    function getMediaDuration() {
        return mediaDurationCache;
    }

    function getMediaDurationForPanel(panel) {
        return function() {

        };
    }

    function getOpacityTranstionDuration() {
        return opacityTransitionDurationCache;
    }

    function updateDuration(e) {
        // total time on screen is panel height
        screenDurationCache = p.panelHeight;
        opacityTransitionDurationCache = parseInt((p.panelHeight / 3), 10);
        // visible time on screen is approx 3/4 actual time with transitions
        componentDurationCache = parseInt((p.panelHeight * 0.75), 10);
        // fork makes last panel sometimes not hit triggerHook, so must be accounted for
        //mediaDurationCache = panel === $lastPanel[0] ? p.panelHeight : p.panelHeight - $('.fork').innerHeight();
        mediaDurationCache = p.panelHeight;
        lastMediaDurationCache = p.panelHeight - $('.fork').innerHeight();
    }

    function init() {
        $(w).on("resize", updateDuration);
        updateDuration();
    }

    function destroy() {
        $(w).off("resize", updateDuration);
    }

    exports.scrollSceneDurations = {
        init: init,
        destroy: destroy,
        getScreenDuration: getScreenDuration,
        getComponentDuration: getComponentDuration,
        getMediaDuration: getMediaDuration,
        getOpacityTranstionDuration: getOpacityTranstionDuration
    };

}(Pathways, window, Pathways, jQuery));


/***
    Pathways scrollscene control
*/
(function(exports, w, scrollDurations, $, Sm, Ss) {
    'use strict';

    var controller,
        globalFactories = [],
        globalPanelFactories = [],
        panelFactories = {},
        panels,
        defaultMethods = ['load', 'unload', 'getScenes'],
        noop = function() {};

    function getInstance(factory) {
        if (!factory) return;
        var instance;
        // console.log(typeof factory);
        switch (typeof factory) {
            case 'function':
                instance = factory();
                break;
            case 'object':
                instance = factory;
                break;
        }

        if (!instance) return;
        defaultMethods.forEach(function (name) {
            if(!instance[name]) instance[name] = noop;
        });
        return instance;
    }

    function addScrollContentFactory(sceneFactory) {
        var instance = getInstance(sceneFactory);
        if (!instance) return;
        globalFactories.push(instance);
    }

    function addSinglePanelScrollFactory(id, sceneFactory) {
        var instance = getInstance(sceneFactory);
        if (!instance) return;
        panelFactories[id] = (panelFactories[id] || []);
        panelFactories[id].push(instance);
        // console.log(panelFactories[id], instance);
    }

    function addSinglePanelScrollMethod(id, sceneMethod) {
        var instance = getInstance({});
        if (!instance) return;
        instance.getScenes = sceneMethod;
        panelFactories[id] = (panelFactories[id] || []);
        panelFactories[id].push(instance);
        // console.log(panelFactories[id], instance);
    }

    function removeSinglePanelScrollFactory(id, sceneFactory) {
        //TODO: splice factory from array
    }

    function removeSinglePanelScrollMethod(id, sceneMethod) {
        //TODO: splice method from array
    }

    function addGlobalPanelScrollFactory(sceneFactory) {
        var instance = getInstance(sceneFactory);
        if (!instance) return;
        globalPanelFactories.push(instance);
    }

    function addGlobalPanelScrollMethod(sceneMethod) {
        var instance = getInstance({});
        if (!instance) return;
        instance.getScenes = sceneMethod;
        globalPanelFactories.push(instance);
    }

    function removeGlobalPanelScrollFactory(sceneFactory) {
        //TODO: splice factory from array
    }

    function removeGlobalPanelScrollMethod(sceneMethod) {
        //TODO: splice factory from array
    }



    function init(_panels) {
        // console.log('initing ss control');
        controller = new Sm({
            //loglevel: 3
        });
        panels = _panels;

        exports.scrollSceneCtrl.init = noop;
    }

    function destroy() {
        // console.log('destroying ss control');
        controller.destroy(true);
        exports.scrollSceneCtrl.init = init;
    }

    function getEm() {
        var args = [].splice.call(arguments, 0);
        return function loadPanelSceneFactory(sceneFactory) {
            // console.log('>', args, arguments);
            sceneFactory.load.apply(sceneFactory, args);
            var sc = sceneFactory.getScenes.apply(sceneFactory, args);
            if (sc) controller.addScene(sc);
        };
    }

    function ungetEm() {
        var args = [].splice.call(arguments, 0);
        return function unloadFactory(sceneFactory) {
            // console.log('unloading factory scene');
            sceneFactory.unload.apply(sceneFactory, args);
        };
    }

    function loadPanelScenes(panel) {
        // console.log('loading ss control scenes');
        var pID = '#' + panel.id,
            pEl = panel.elem,
            pAttrs = panel,
            loadFactory = getEm(pID, pEl, pAttrs);

        globalPanelFactories.forEach(loadFactory);

        if (panelFactories[panel.id]) {
            var facs = panelFactories[panel.id];
            // console.log(facs, loadFactory);
            if (facs && facs.length) facs.forEach(loadFactory);
        }
        controller.update(true);
    }

    function unloadPanelScenes(panel) {
        // console.log('unloading ss control scenes');
        var pID = '#' + panel.id,
            pEl = panel.elem,
            pAttrs = panel,
            unloadFactory = ungetEm(pID, pEl, pAttrs);

        globalPanelFactories.forEach(unloadFactory);

        if (panelFactories[panel.id]) {
            var facs = panelFactories[panel.id];
            if (facs && facs.length) facs.forEach(unloadFactory);
        }
        controller.update(true);
    }

    function load() {
        // console.log('loading ss control');
        globalFactories.forEach(getEm());
        panels.forEach(loadPanelScenes);
        scrollDurations.init();
        // console.log('globalFactories.length:', globalFactories.length);
    }

    function unload() {
        globalFactories.forEach(ungetEm());
        panels.forEach(unloadPanelScenes);
        scrollDurations.destroy();
        // console.log(controller.info());
    }

    exports.scrollSceneCtrl = {
        addSinglePanelScrollFactory: addSinglePanelScrollFactory,
        addSinglePanelScrollMethod: addSinglePanelScrollMethod,
        addGlobalPanelScrollFactory: addGlobalPanelScrollFactory,
        addGlobalPanelScrollMethod: addGlobalPanelScrollMethod,
        addScrollContentFactory: addScrollContentFactory,
        init: init,
        destroy: destroy,
        load: load,
        unload: unload
    };


}(Pathways, window, Pathways.scrollSceneDurations, jQuery, ScrollMagic));


/**
 * Controls Library panel transitions
 */

// Init Animations
(Pathways.animation = function(w, doc, cjs, $, Mod) {
    "use strict";

    var anim = {};

    return {
        init: function(id, canvas) {

            if (!canvas) return;
            if (!anim[id]) return console.warn('No animation properties with id \'' + id + '\' found');

            function initCanvas() {
                var lib = anim[id].lib;

                var loader = new cjs.LoadQueue(false);
                loader.addEventListener("fileload", handleFileLoad);
                loader.addEventListener("complete", handleComplete);
                loader.loadManifest(lib.properties.manifest);
                anim[id].start = function() {};
                anim[id].stop = function() {};

            }

            function handleFileLoad(evt) {
                var images = anim[id].images;
                if (evt.item.type == "image") {
                    images[evt.item.id] = evt.result;
                }
            }

            function handleComplete() {
                var lib = anim[id].lib,
                    exportRoot = new lib.tree2(),
                    stage = new cjs.Stage(canvas);

                anim[id].stage = stage;

                stage.addChild(exportRoot);
                stage.update();

                cjs.Ticker.setFPS(lib.properties.fps);

                anim[id].start = function() {
                    cjs.Ticker.addEventListener("tick", stage);
                };
                anim[id].stop = function() {
                    cjs.Ticker.removeEventListener("tick", stage);
                };
            }

            if (w.innerWidth >= 768) {
                initCanvas();
            }

            return anim[id];
        },
        getAnimation: function(id) {
            if (anim && anim[id]) return anim[id];
            else return null;
        },
        addAnimation: function(id, def) {
            anim[id] = def;
        }
    };

}(window, document, (createjs || {}), jQuery, Modernizr));



(function(w, scrollCtrl, scrollDurations, mediaCtrl, animationCtrl, utils, $, Tm, Ss) {

    'use strict';

    scrollCtrl.addGlobalPanelScrollFactory(function() {

        return {
            load: function(panelId, panelEl, panelAttrs) {
                var canvas = $(panelEl).find('.panel-animation').get(0), //TODO: Allow for mulitple animations
                    animationId = utils.toCamelCase(panelAttrs.id);
                if (canvas)
                    animationCtrl.init(animationId, canvas);
            },
            getScenes: function(panelId, panelEl, panelAttrs) {
                var animationId = utils.toCamelCase(panelAttrs.id),
                    animation = animationCtrl.getAnimation(animationId);

                if (!animation) return null;

                var scene = new ScrollScene({
                        triggerElement: panelId,
                        duration: Pathways.panelHeight
                    })
                    .on('enter', function(e) {
                        // if (e.scrollDirection == 'FORWARD') {
                        console.log(panelId, animation);
                        animation.start();
                        // }
                    })
                    .on('leave', function(e) {
                        // if (e.scrollDirection == 'REVERSE') {
                        animation.stop();
                        // }
                    });

                return scene;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                var animationId = utils.toCamelCase(panelAttrs.id),
                    animation = animationCtrl.getAnimation(animationId);
                if (animation) animation.stop();
            }
        };
    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, Pathways.animation, Pathways.utils, jQuery, TweenMax, ScrollScene));

/**
 * Controls Gallery, Letter-gallery and Quiz transitions
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';


    var sidebarComponents = ['gallery', 'letter-gallery', 'quiz'];

    function getConfig(rawConfig) {
        var config = null;
        if (rawConfig) config = JSON.parse(rawConfig);
        return config;
    }

    function getValueFromConfig(rawConfig, name) {
        var config = getConfig(rawConfig);
        return (config && config[name]) || null;
    }

    function findComponent($panel, type) {
        return $panel.find('[data-component="' + type + '"]');
    }

    function getComponentScene($panel, type, getDuration) {
        var $elem = $panel.find('[data-component="' + type + '"]'),
            scene = [];

        if ($elem.length) {
            var offset = getValueFromConfig($elem.attr('data-config'), 'offset_height') || 0;

            scene = new Ss({
                triggerElement: $panel,
                triggerHook: 'top',
                duration: getDuration(offset),
                offset: offset
            }).on('enter', function(e) {
                $elem.css({
                    position: 'fixed',
                    display: 'block'
                });
                setTimeout(function() {
                    $elem.addClass('active');
                }, 50);
            }).on('leave', function(e) {
                $elem.css({
                    position: 'absolute',
                    display: 'none'
                });
                setTimeout(function() {
                    $elem.removeClass('active');
                }, 50);
            });
        }

        return scene;
    }

    function getComponentObjectFactory(componentId) {
        return {
            load: function(panelId, panelEl, panelAttrs) {
                var $component = findComponent($(panelEl), componentId);
                if ($component.length) $component.hide();
            },
            getScenes: function(panelId, panelEl, panelAttrs) {
                var m = function m(offset) {
                    return function ret() {
                        return Math.max((panelAttrs.componentHeight - offset), 0);
                    };
                };
                return getComponentScene($(panelEl), componentId, m);
            },
            unload: function(panelId, panelEl, panelAttrs) {
                var $component = findComponent($(panelEl), componentId);
                if ($component.length) $component.removeAttr('style');
            }
        };
    }

    sidebarComponents.forEach(function(componentId) {
        scrollCtrl.addGlobalPanelScrollFactory(function() {
            return getComponentObjectFactory(componentId);
        });
    });


}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));

/**
 * Black-strip positioning
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';


    scrollCtrl.addGlobalPanelScrollFactory(function() {
        var $blackStrips = $('.black-strip'),
        currY = Pathways.panelHeight;

        if ($blackStrips.length === 0) return; //Check for any strips on page; if none, don't create this object

        function resizeBlackStrips(e) {
            currY = (currY === 0) ? 0 : Pathways.panelHeight;
            $blackStrips.css({
                position: 'fixed',
                'transform': 'translate(0,' + currY + 'px)',
                height: Pathways.panelHeight
            });
        }

        return {
            load: function() {
                resizeBlackStrips();
                w.addEventListener('resize', resizeBlackStrips);
            },
            getScenes: function(panelId, panelEl, panel) {
                var scenes = [],
                    $strip = $(panelEl).find('.black-strip'),
                    inTw = function(e) {
                        Tm.to($strip, 0.5, {
                            y: 0,
                            onComplete: function(){
                                currY = 0;
                            }
                        });
                    },
                    outTw = function(e) {
                        Tm.to($strip, 0.2, {
                            y: Pathways.panelHeight,
                            onComplete: function(){
                                currY = Pathways.panelHeight;
                            }
                        });
                    };

                if ($strip.length === 0 || !panel.content) return; // Check for strips in panel; if none, don't return the scene

                scenes.push(new ScrollScene({
                        triggerElement: panel.content,
                        triggerHook: 'bottom',
                        duration: panel.content.offsetHeight + Pathways.panelHeight
                    })
                    .on('enter', inTw)
                    .on('leave', outTw));

                return scenes;
            },
            unload: function() {
                $blackStrips.removeAttr('style');
                w.removeEventListener('resize', resizeBlackStrips);
            }
        };
    });



}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));

Pathways.scrollSceneCtrl.addScrollContentFactory(function() {
    var scrollFadeSelector = '[data-scroll-fadeIn]';

    if ($(scrollFadeSelector).length === 0) return null;

    return {
        load: function() {
            $(scrollFadeSelector).css('opacity', 0);
        },
        getScenes: function() {
            var scenes = [];
            $(scrollFadeSelector).each(function() {
                var $this = $(this),
                    tween = TweenMax.to($this, 1, {
                        opacity: 1
                    }),
                    offset = $this.data('offset') ? $this.data('offset') : 0;

                var scene = new ScrollScene({
                        triggerElement: $this,
                        duration: 200,
                        offset: offset
                    })
                    .setTween(tween);

                scenes.push(scene);
            });

            return scenes;
        },
        unload: function() {
            $(scrollFadeSelector).removeAttr('style');
        }
    };
});

/**
 * Controls Info panel transitions
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    scrollCtrl.addGlobalPanelScrollFactory(function() {
        var heightOffset = 60,
            visibleOffset = 0;

        return {
            load: function(panelId, panelEl, panelAttrs) {
                var $component = $('[data-panel="' + panelAttrs.id + '"]').first(),
                    offsetHeight = $component.outerHeight() - heightOffset,
                    offsetWidth = $component.outerWidth(),
                    val = 'translate(' + offsetWidth + 'px, ' + offsetHeight + 'px)';

                if ($component.length) {
                    $component.css({
                        'transform': val
                    });
                }
            },
            getScenes: function(panelId, panelEl, panelAttrs) {
                var $component = $('[data-panel="' + panelAttrs.id + '"]').first(),
                    scene = [];

                var m = function m(offset) {
                    return function ret() {
                        return Math.max((panelAttrs.componentHeight - offset), 0);
                    };
                };

                if ($component.length) {
                    scene = new Ss({
                        triggerElement: panelEl,
                        triggerHook: 'middle',
                        duration: m(visibleOffset),
                        offset: visibleOffset
                    }).on('enter', function(e) {
                        $component.addClass('info-panel-ready');
                    }).on('leave', function(e) {
                        $component.removeClass('info-panel-ready');
                    });
                }

                return scene;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                var $component = $('[data-panel="' + panelAttrs.id + '"]').first();
                if ($component.length) $component.removeAttr('style');
            }
        };
    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));

/**
 * Controls panel media auto play and stop
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    function getConfig(rawConfig) {
        var config = null;
        if (rawConfig) config = JSON.parse(rawConfig);
        return config;
    }

    function getPlay(channelID) {
        return function playMedia(index, media) {
            var config = getConfig($(media).attr('data-config'));
            mediaCtrl.playMediaOnChannel(media, channelID, config);
        };
    }

    function getStop(channelID) {
        return function stopMedia(index, media) {
            var config = getConfig($(media).attr('data-config'));
            mediaCtrl.stopMediaOnChannel(media, channelID, config);
        };
    }

    scrollCtrl.addGlobalPanelScrollFactory(function() {

        return {
            load: function(panelId, panelEl, panelAttrs) {

            },
            getScenes: function(panelId, panelEl, panelAttrs) {
                var $panel = $(panelId),
                    $panelAudio = $panel.find('[data-audio="panel"]'),
                    $panelVideo = $panel.find('[data-video="panel"]'),
                    $fxAudio = $panel.find('[data-audio="fx"]'),
                    scene = [];

                if ($panelVideo.length || $panelAudio.length || $fxAudio.length) {

                    scene = new Ss({
                            triggerElement: panelEl,
                            duration: scrollDurations.getMediaDuration
                        })
                        .on('enter', function() {
                            $panelVideo.each(getPlay('video'));
                            $panelAudio.each(getPlay('panel'));
                            $fxAudio.each(getPlay('fx'));
                        })
                        .on('leave', function() {
                            $panelVideo.each(getStop('video'));
                            $panelAudio.each(getStop('panel'));
                            mediaCtrl.stopFxChannel({
                                noFade: true
                            });
                        });
                }
                return scene;
            },
            unload: function(panelId, panelEl, panelAttrs) {

            }
        };
    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));

/**
 * Controls panel transitions
 */
(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    scrollCtrl.addGlobalPanelScrollFactory(function() {
        return {
            load: function(panelId, panelEl, panelAttrs) {
                $('html').addClass('scroll-active');
                $(panelEl).removeClass('fixed-active');
            },
            getScenes: function(panelId, panelEl, panelAttrs) {
                var scenes = [],
                    $panel = $(panelEl),
                    $bg = $(panelAttrs.bg),
                    triggerHook = panelAttrs.isFirst ? 'top' : 'middle',
                    $survey = $('.survey'),
                    $bottom = $survey.length ? $survey : $('.fork'),
                    tween = Tm.to($bg, 1, {
                        opacity: 1
                    });

                scenes.push(new Ss({
                        triggerElement: $panel,
                        triggerHook: triggerHook,
                        duration: scrollDurations.getScreenDuration,
                    })
                    .on('start', function(e) {
                        if (e.scrollDirection == 'FORWARD') {
                            $panel.addClass('fixed-active');
                        } else {
                            setTimeout(function() {
                                $panel.removeClass('fixed-active');
                            }, 50);
                        }
                    }));

                if (!panelAttrs.isFirst) {
                    // Panels Opacity transition
                    scenes.push(new Ss({
                            triggerElement: $panel,
                            triggerHook: triggerHook,
                            duration: scrollDurations.getOpacityTranstionDuration
                        })
                        .setTween(tween));
                }
                return scenes;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                $('html').removeClass('scroll-active');
                $(panelEl).removeClass('fixed-active');
            }
        };
    });

    Pathways.scrollSceneCtrl.addScrollContentFactory(function() {
        var $panels = $('.panel'),
            $survey = $('.survey'),
            $bottom = $survey.length ? $survey : $('.fork');

        if ($bottom.length === 0) return null;

        return {
            load: function() {
                $panels.removeClass('fixed-active');
            },
            getScenes: function() {
                var scenes = [];

                scenes.push(new Ss({
                    triggerElement: $bottom,
                    triggerHook: 'bottom'
                }).on('start', function(e) {
                    if (e.scrollDirection == 'FORWARD') {
                        $panels.removeClass('fixed-active');
                    } else {
                        $panels.addClass('fixed-active');
                    }
                }));

                return scenes;
            },
            unload: function() {
                $panels.removeClass('fixed-active');
            }
        };
    });


}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));

// Init parallax ScrollScenes
(function(w, $, p, scrollCtrl, Sc, Tm, Mod) {

    "use strict";

    scrollCtrl.addScrollContentFactory(function() {

        var parallaxSelectors = '[data-scroll-parallax-effect]',
            $start = $('.start'),
            $parallaxContent,
            scenes = [];

        function processParallaxes(index, parallax) {
            var $parallax = $(parallax),
                rawconfig = $parallax.find(parallaxSelectors).get(0),
                fallRate = 0.3,
                endOpacity = 0,
                config;

            if (rawconfig) {
                config = JSON.parse(rawconfig);
                fallRate = isNaN(config.fallRate) ? fallRate : config.fallRate;
                endOpacity = isNaN(config.endOpacity) ? endOpacity : config.endOpacity;
            }

            var tween = Tm.to($parallax, 1, {
                opacity: endOpacity,
                y: p.panelHeight * fallRate
            });

            var scene = new Sc({
                    triggerElement: $start,
                    duration: p.panelHeight,
                    triggerHook: 'top'
                })
                .on('enter', function(e) {
                    $parallax.css({
                        'display': 'block'
                    });
                })
                .on('leave', function(e) {
                    if (e.scrollDirection === 'FORWARD')
                        $parallax.css({
                            'display': 'none'
                        });
                })
                .setTween(tween);

            scenes.push(scene);
        }

        return {

            getScenes: function() {
                scenes = [];
                $parallaxContent = $start.find(parallaxSelectors);
                $parallaxContent.each(processParallaxes);
                return scenes;
            }
        };
    });

}(window, jQuery, Pathways, Pathways.scrollSceneCtrl, ScrollScene, TweenMax, Modernizr));

/**
 * Sliding panels controls
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';


    scrollCtrl.addGlobalPanelScrollFactory(function() {
        var heightOffset = 60;
        var translations = [-100, 100],
            defaultFxAudioSrc = 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-paper-slide.mp3',
            $root,
            $components,
            offset = 0;

        return {
            load: function(panelId, panelEl, panelAttrs) {
                $root = $(panelEl).find('.sliding-panels');
                $components = $root.find('.sliding-panel');
                offset = $root.data('sliding-offset') || 0;

                $components.each(function(index) {
                    var val = 'translate(' + translations[((index + offset) % 2)] + 'px,0)';

                    $(this).css({
                        'opacity': 0,
                        'transform': val,
                    });
                });

            },
            getScenes: function(panelId, panelEl, panelAttrs) {
                var idx = 0,
                    scenes = [],
                    // offset = slideStart,
                    tween;

                $components = $components || $(panelEl).find('.sliding-panel');
                $components.each(function(index) {
                    var $this = $(this),
                        fxAudioSrc = $this.data('fx') || defaultFxAudioSrc,
                        fxAudio = new Audio(fxAudioSrc),
                        translateVal = translations[((index + offset) % 2)],
                        val = 'translate(' + translations[((index + offset) % 2)] + 'px,0)';

                    // $this.css('transform', val);
                    // $this.css('-webkit-transform', val);

                    tween = Tm.to($this, 1, {
                        x: 0,
                        opacity: 1
                    });

                    scenes[idx++] = new Ss({
                            triggerElement: $this,
                            duration: 200,
                            offset: offset
                        })
                        .on('enter', function(e) {
                            if (e.scrollDirection === 'FORWARD') {
                                // console.log('playing:', fxAudioSrc);
                                if (fxAudio) mediaCtrl.playMediaOnFxChannel(fxAudio);
                            } else if (e.scrollDirection == 'REVERSE') {
                                if (fxAudio) mediaCtrl.playMediaOnFxChannel(fxAudio);
                            }
                        })
                        .on('leave', function(e) {
                            //if (fxAudio) mediaCtrl.stopMediaOnFxChannel(fxAudio);
                        })
                        .setTween(tween);
                });


                return scenes;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                var $components = $components || $(panelEl).find('.sliding-panel');
                if ($components.length) $components.removeAttr('style');
            }
        };
    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));

console.log('include main');

function _(str) {
    return document.querySelector(str);
}

Pathways.MIN_COMPONENT_LEVEL = 2;
Pathways.MIN_SCROLL_LEVEL = 4;


/***
    Pathways main
*/
(function(exports, w, _, p, sys, utils, media, vol, video, scrollSceneCtrl, $, undefined) {

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


    exports.panelHeight = calcPanelHeight();
    exports.getPanelHeight = function() {
        return exports.panelHeight;
    };




    function getHeightWithOffset(offset) {
        offset = offset || 0;
        return exports.panelHeight - offset;
    }

    function getWidthWithOffset(offset) {
        offset = offset || 0;
        return w.innerWidth - offset;
    }


    function calcPanelHeight() {
        return parseInt((sys.innerHeight < minHeight ? minHeight : sys.innerHeight), 10);
    }





    function initPanel(panel, isFirst, isLast) {

        var $panel = $(panel),
            id = $panel.attr('id'),
            data = $panel.attr('data-config'),
            bg = $panel.find('.bg-container').get(0),
            content = $panel.find('.main-content').get(0),
            contentHeight = $(content).outerHeight(),
            configData = {};


        if (!id) throw new Error('All panels require an id [' + panel + ']');
        if (data) configData = JSON.parse(data);

        var panelOb = {
            id: id,
            elem: panel,
            config: configData,
            bg: bg,
            content: content,
            contentHeight: contentHeight,
            isFirst: isFirst,
            isLast: isLast
        };

        panelOb.getContentHeight = function() {
            return panelOb.contentHeight;
        };

        return panelOb;
    }

    function isRatioPreserved(panel) {
        return panel.config && panel.config.background && panel.config.background.preserve_ratio;
    }

    function initPanels(panelSelector) {
        var $panels = $(panelSelector),
            first = $panels.first().get(0),
            last = $panels.last().get(0),
            isFirst, isLast,
            panels = [];

        $panels.each(function(index, panel) {
            // console.log(panel);
            isFirst = panel === first;
            isLast = panel === last;
            panels.push(initPanel(panel, isFirst, isLast));
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
                id = utils.toCamelCase($component.attr('id')),
                handlerClass = utils.toCamelCase(handlerName),
                method = context[handlerClass],
                data;

            if (typeof method === 'undefined' || method === null) return console.warn('Could not load the necessary component: ' + handlerClass);

            if (id && method[id] && method[id].data) data = method[id].data;
            if (typeof method === 'function') {
                method(component, data);
            } else if (typeof method === 'object') {
                method.onLoad(component, data);
            }
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

    function unsizePanels(startPanel, panels) {
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

    function getTotalHeight(el) {
        var style = getComputedStyle(el, null),
            margin = parseFloat(style.marginTop) + parseFloat(style.marginBottom);

            // console.log('margin', margin);
        return el.offsetHeight + margin;
    }

    function resizePanel(panel, viewPortHeight, index) {
        var _panel = panel.elem;

        var config = panel.config,
            _bg = panel.bg,
            _content = panel.content,
            // id = $(panel.elem).attr('id'),
            panelHeight = _panel.offsetHeight,
            newPanelHeight;

        if (_content) {
            var $content = $(_content),
                contentHeight = getTotalHeight(_content),
                largerContentHeight;

            // console.log('c, p', id, contentHeight, panelHeight);
            largerContentHeight = parseInt(Math.max(contentHeight, viewPortHeight), 10);
            newPanelHeight = largerContentHeight;

        } else {
            newPanelHeight = viewPortHeight;
        }

        panel.contentHeight = newPanelHeight;
        panel.componentHeight = parseInt((newPanelHeight * 0.75), 10);

        // console.log('p np:', index, panelHeight, newPanelHeight, (newPanelHeight === viewPortHeight));

        // if (panelHeight !== newPanelHeight) {
        //     setElementHeight(_panel, newPanelHeight);
        // }

        if (newPanelHeight === viewPortHeight) {
            // console.log(index, ' setting new height ', newPanelHeight);
            setElementHeight(_panel, newPanelHeight);
        } else {
            unSetElementHeight(_panel);
        }

        if (_bg) setElementHeight(_bg, viewPortHeight);

    }

    function resizePanelChild(index, child) {
        var newHeight = sys.innerWidth / sys.aspectRatio;
        setElementHeight(child, newHeight);
        translatePanelElem(child, exports.panelHeight);
    }

    function resizePanels(startPanel, panels) {

        if (startPanel) setElementHeight(startPanel, exports.panelHeight);

        for (var i = 0; i < panels.length; i++) {
            resizePanel(panels[i], exports.panelHeight, i);

            if (isRatioPreserved(panels[i])) {
                $(panels[i].elem).children().each(resizePanelChild);
            }
        }
    }

    var panelsUnsized = false;

    function resizeCheck() {

        exports.panelHeight = calcPanelHeight();

        if (sys.level < p.MIN_COMPONENT_LEVEL) {
            unsizePanels(startPanel, panels);
            panelsUnsized = true;
        } else if (sys.level >= p.MIN_COMPONENT_LEVEL && sys.level < p.MIN_SCROLL_LEVEL) {
            unsizePanels(startPanel);
            resizePanels(null, ratioedPanels);
            panelsUnsized = false;
        } else if (sys.level >= p.MIN_SCROLL_LEVEL) {
            resizePanels(startPanel, panels);
            panelsUnsized = false;
        }
    }

    function loadCheck() {
        exports.panelHeight = calcPanelHeight();

        // If it's iPad width or larger, load the components
        if (!componentsLoaded) {
            if (sys.level >= p.MIN_COMPONENT_LEVEL) {
                loadComponents(exports.components);
                componentsLoaded = true;
            }
        } else {
            if (sys.level < p.MIN_COMPONENT_LEVEL) {
                // unload components
            }
        }

        if (!scenesLoaded) {
            // If it's a non-touch device, load the scenes.
            if (sys.level >= p.MIN_SCROLL_LEVEL) {

                media.model.init(panels);
                media.ctrl.init();

                vol.enable();
                media.ctrl.playMediaOnGlobalChannel(media.model.globalAudio());

                if (scrollSceneCtrl) {
                    scrollSceneCtrl.init(panels);
                    scrollSceneCtrl.load();

                }

                scenesLoaded = true;
            }
        } else {
            if (sys.level < p.MIN_SCROLL_LEVEL) {

                media.ctrl.disable();
                vol.disable();

                if (scrollSceneCtrl) {
                    scrollSceneCtrl.unload(panels);
                    scrollSceneCtrl.destroy();
                }

                scenesLoaded = false;
            }
        }
    }



    function init(onLoadComplete) {

        startPanel = $('.start').get(0);
        panels = initPanels('.panel');
        ratioedPanels = initRatioedPanels(panels);
        resizeCheck();

        w.addEventListener('resize', function() {
            resizeCheck();
            loadCheck();
        });

        w.addEventListener('load', function() {
            resizeCheck();
            loadCheck();
        });

        // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
        $(function() {
            console.log('doc ready');

            vol.setStateFromCookies();

            vol.addView(vol.views.getMuteButtonView('.mute'));
            vol.addView(vol.views.getGlobalView('video, audio'));

            onLoadComplete();
            resizeCheck();
            loadCheck();

            video.init(panels);


        });
    }

    exports.init = init;

    exports.scrollScenes = {};
    exports.components = {};

    utils.getHeightWithOffset = getHeightWithOffset;
    utils.getWidthWithOffset = getWidthWithOffset;

}(Pathways, this, _, Pathways, Pathways.system, Pathways.utils, Pathways.media, Pathways.media.vol, Pathways.video, Pathways.scrollSceneCtrl, jQuery));

var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};
console.log('include image-loader');

(function(exports, w, $) {

    var defaultBase = '';

    exports.imageLoader = {
        getImageLoader: function(location, base) {

            base = base || defaultBase;
            location = location || '';
            var imageData,
                imageSrc;

            function loadImages(images, callback) {
                if (images.length) {
                    imageData = images[0];
                    imageSrc = imageData.image;
                    loadImage(imageSrc, function(img, data) {

                        if (callback) callback.call(null, img, data);

                        images.shift();

                        loadImages(images, callback);
                    }, imageData);
                }
            }

            function loadImage(src, callback, data) {
                var img = new Image();

                img.src = base + location + src + '.jpg';

                img.onload = function(e) {

                    if (callback) callback.call(self, this, data);
                };
            }

            return {
                loadImages: function(datalist, callback) {
                    datalistCopy = [].concat(datalist);
                    loadImages(datalistCopy, callback);
                },
                loadImage: loadImage
            };

        }
    };



}(Pathways.components.core, window, jQuery));

console.log('include core audio-player');

(function(exports, viewControl, mediaCtrl, vol, volViews, utils, $) {

    var fallbackDuration = 600;


    function getPlay(audio, linkedView, timeUpdate) {
        return function play() {
            if (!audio.paused) return;
            vol.addView(linkedView);
            audio.addEventListener('timeupdate', timeUpdate);
            // console.log(audio.currentTime);
            if (audio.currentTime !== 0) {
                mediaCtrl.playMediaOnComponentChannel(audio, { fadeDuration: 0 });
            } else {
                mediaCtrl.playMediaOnComponentChannel(audio);
            }

            timeUpdate();
        };
    }

    function getPause(audio, linkedView, timeUpdate) {
        function onPause (e) {
            audio.removeEventListener('timeupdate', timeUpdate);
            audio.removeEventListener('pause', onPause);
            timeUpdate();
        }
        return function pause() {
            if (audio.paused) return;
            vol.removeView(linkedView);
            mediaCtrl.stopMediaOnComponentChannel(audio, { fadeDuration: 0 });
            audio.addEventListener('pause', onPause);
        };
    }

    function getStop(audio, linkedView, timeUpdate) {
        return function stop() {
            vol.removeView(linkedView);
            mediaCtrl.stopMediaOnComponentChannel(audio, { seekToTimeAtEnd: 0 });
            audio.removeEventListener('timeupdate', timeUpdate);
            timeUpdate();
        };
    }

    function getTimeUpdate(audio, viewCtrl) {

        return function(e) {
            // console.log('timeupdate', audio.src);
            //if (audio.currentTime === audio.duration) audio.currentTime = 0;
            viewCtrl.update(audio.paused, audio.duration, audio.currentTime);
        };
    }

    function getPlayerCtrl(audio) {
        var viewCtrl = viewControl.getViewCtrl({}),
            linkedView = volViews.getLinkedMediaView(audio),
            timeUpdate = getTimeUpdate(audio, viewCtrl),
            stop = getStop(audio, linkedView, timeUpdate),
            isEnabled = false;

        audio.addEventListener('durationchange', timeUpdate);

        var playerCtrl = Object.create(viewCtrl, {
            play: {
                value: getPlay(audio, linkedView, timeUpdate)
            },
            pause: {
                value: getPause(audio, linkedView, timeUpdate)
            },
            stop: {
                value: stop
            },
            enable: {
                value: function() {
                    if (isEnabled) return;
                    viewCtrl.enable();
                    stop();
                    isEnabled = true;
                }
            },
            disable: {
                value: function() {
                    if (!isEnabled) return;
                    stop();
                    viewCtrl.disable();
                    isEnabled = false;
                }
            }
        });
        return playerCtrl;
    }







    var playerViewProto = {
        update: function(isPaused, duration, currentTime) {
            // console.log('updating', isPaused, duration, currentTime);
            if (!this.isEnabled) return;

            duration = getDuration(duration, currentTime);

            var remaining = parseInt((duration - currentTime), 10) || 0,
                currentPercent = (currentTime * (100 / duration)) || 0;

            if (isPaused) {
                this.$controls.removeClass('active');
            } else {
                this.$controls.addClass('active');
            }

            if (currentPercent !== void 0 && remaining !== void 0) {
                this.$progress.css('width', currentPercent + '%');
                this.$timeLeft.html(secondsToMinutes(remaining));
            }

        },
        enable: function() {
            this.isEnabled = true;
            this.$controls.show();
            this.$view.off('click', '.controls');
            this.$view.on('click', '.controls', this.toggleViewState);
        },
        disable: function() {
            this.isEnabled = false;
            this.$controls.hide();
            this.$view.off('click', '.controls', this.toggleViewState);
        }
    };


    function getDuration(duration, currentTime) {
        return (duration === Infinity || isNaN(duration)) ?
            ((currentTime === Infinity || isNaN(currentTime)) ?
                fallbackDuration : currentTime) :
            duration || 0;
    }

    function secondsToMinutes(seconds, sep) {
        sep = sep || ':';
        var mins = Math.floor(seconds / 60),
            remainder = seconds % 60;

        if (remainder < 10)
            remainder = '0' + remainder;

        return mins + sep + remainder;
    }

    function getToggleViewState(playerView, ctrl) {
        return function toggleViewState(e) {

            if (!playerView.isEnabled) return;

            e.preventDefault();
            e.stopPropagation();

            if (e.target === this) {
                if (!$(this).hasClass('active')) {
                    ctrl.play();
                } else {
                    ctrl.pause();
                }
            }

            return false;
        };
    }

    function getPlayerView(element, ctrl) {
        var $view = $(element),
            $progress = $view.find('.progressed'),
            $timeLeft = $view.find('.time-left span'),
            $controls = $view.find('.controls'),
            playerView;

        playerView = Object.create(playerViewProto);
        playerView.isEnabled = false;
        playerView.$view = $view;
        playerView.$progress = $progress;
        playerView.$timeLeft = $timeLeft;
        playerView.$controls = $controls;
        playerView.toggleViewState = getToggleViewState(playerView, ctrl);
        // console.log(playerView);
        return playerView;

    }

    exports.audioPlayer = {
        getAudioPlayer: function(src, $view) {
            var audio = new Audio(src);

            var playerCtrl = getPlayerCtrl(audio),
                playerView = getPlayerView($view, playerCtrl);

            playerCtrl.addView(playerView);

            return playerCtrl;
        },
        getPlayerCtrl: getPlayerCtrl,
        getPlayerView: getPlayerView
    };

}(Pathways.components.core, Pathways.core.view, Pathways.media.ctrl, Pathways.media.vol, Pathways.media.vol.views, Pathways.utils, jQuery));

var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};
console.log('include carousel');


(function(exports, w, getEventListener, imgLoader, Hamr, Mod, $) {
    'use strict';

    var doc = w.document;

    function getCarouselCtrl($element, data, _paneCtrlFactory) {

        if (typeof data === 'undefined') return console.warn('No Carousel data provided');


        var navCtrl = null,
            containerCtrl = null,
            paneCtrl = null,

            paneCtrlFactory = _paneCtrlFactory,

            currentIndex = 0;

        var ob = Object.create(getEventListener());

        function setPaneCtrlIndices(index, doAnimate) {
            // console.debug('index', index);
            containerCtrl.setPaneIndex(index, doAnimate);
            paneCtrl.setPaneIndex(index);
            navCtrl.setPaneIndex(index);
        }

        ob.init = function init() {
            containerCtrl = getContainerCtrl($element, this);
            containerCtrl.create();

            navCtrl = getNavigationCtrl($element, this);

            paneCtrl = getPanesCtrl(containerCtrl.getElement(), this, data, paneCtrlFactory, function() {
                // console.log('first loaded');
                navCtrl.create();
                ob.setPaneIndex(ob.getCurrentIndex(), false);
            });
            paneCtrl.create();

            $(w).on("resize orientationchange", function() {
                ob.resize();
                ob.updateOffset(false);
            });
        };
        ob.setPaneIndex = function setPaneIndex(index, doAnimate) {
            // between the bounds
            index = Math.max(0, Math.min(index, paneCtrl.getPaneCount() - 1));
            setPaneCtrlIndices(index, doAnimate);

            currentIndex = index;
            this.emit('setPaneIndex', index, doAnimate);
        };
        ob.updateCtrls = function updateCtrls(doAnimate) {
            setPaneCtrlIndices(currentIndex, doAnimate);
        };
        ob.resize = function resize() {
            paneCtrl.resize();
            containerCtrl.resize(paneCtrl.getTotalWidth(), w.innerHeight);
            navCtrl.resize(w.innerHeight);
        };
        ob.next = function next() {
            return this.setPaneIndex(currentIndex + 1, true);
        };
        ob.prev = function prev() {
            return this.setPaneIndex(currentIndex - 1, true);
        };
        ob.getCurrentIndex = function getCurrentIndex() {
            return currentIndex;
        };
        ob.setFactory = function setFactory(factory) {
            paneCtrlFactory = factory;
        };
        ob.updateOffset = function updateOffset(doAnim){
            doAnim = (typeof doAnim === 'boolean') ? doAnim : true;
            containerCtrl.updateOffset(paneCtrl.getPanesOffsetAtIndex(currentIndex), doAnim);
        };
        ob.setOffset = function setOffset(x, animate) {
            containerCtrl.updateOffset(x, animate);
        };
        ob.getOffset = function getOffset() {
            return paneCtrl.getPanesOffsetAtIndex(currentIndex);
        };
        ob.getOffsetAtIndex = function getOffsetAtIndex(index) {
            return paneCtrl.getPanesOffsetAtIndex(index);
        };
        ob.getPaneCount = function getPaneCount() {
            return paneCtrl.getPaneCount();
        };
        ob.getAveragePaneWidth = function getAveragePaneWidth() {
            return paneCtrl.getAveragePaneWidth();
        };


        return ob;

    }

    function getPanesCtrl($container, ctrl, data, paneCtrlFactory, onFirst) {
        var $panes = null,
            paneDataList = data.panes || data.images,
            location = data.location,

            panes = [],
            paneCount = 0,
            totalOffset = (w.innerWidth / 2),
            totalWidth = 0;

        function addPane($pane) {
            $container.append($pane);
        }

        return {
            create: function() {

                panes = paneDataList.map(function(paneData, index) {
                    var pane = paneCtrlFactory(paneData, index, function onReady(pane) {

                        if (typeof onFirst === 'function') onFirst.call();
                        onFirst = null;
                        ctrl.resize();
                        ctrl.updateOffset(false);
                    }).create();

                    addPane(pane.getPane());
                    return pane;
                });


                paneCount = panes.length;
            },
            setPaneIndex: function(index) {
                panes.forEach(function(pane) {
                    pane.setIndex(index);
                });
            },
            resize: function(height) {

                panes.forEach(function(pane) {
                    pane.resize();
                });

                totalWidth = panes.map(function(pane) {
                    return pane.getWidth();
                }).reduce(function(last, curr){
                    return last + curr;
                });

                var windowWidth = w.innerWidth;

                totalOffset = (windowWidth / 2);
            },


            getPaneCount: function() {
                return paneCount;
            },

            getAveragePaneWidth: function() {
                return parseInt((totalWidth / paneCount), 10);
            },
            getTotalWidth: function() {
                return totalWidth;
            },
            getPanesOffsetAtIndex: function(index) {
                var offset = 0;
                for (var i = 0; i < index; i++) {
                    offset -= panes[i].getWidth();
                }
                offset += (totalOffset - (panes[index].getWidth() / 2));
                // console.log(offset, totalOffset, panes[index].getWidth());
                return offset;
            }
        };
    }

    function getContainerCtrl($element, ctrl) {
        var $container;

        return {
            create: function() {
                $container = $('<ul/>');
                $container.height(w.innerHeight);

                $element.append($container);
            },
            setPaneIndex: function(index, animate) {
                this.updateOffset(ctrl.getOffsetAtIndex(index), animate);
            },
            updateOffset: function(x, animate) {
                // console.debug('updateOffset', x);
                $container.removeClass("animate");

                if (animate) {
                    $container.addClass("animate");
                }

                if (Mod.csstransforms3d)
                    $container.css("transform", "translate3d(" + x + "px,0,0)");
                else
                    $container.css("transform", "translate(" + x + "px,0)");
            },
            resize: function(width, height) {
                $container.width(width);
                $container.height(height);
            },
            getElement: function() {
                return $container;
            }
        };
    }


    function getNavigationCtrl($element, ctrl) {
        var $prev, $next;

        return {
            create: function create() {
                $prev = $('<div/>');
                $next = $('<div/>');

                $prev.addClass('prev disabled');
                $next.addClass('next');

                $prev.css({
                    'left': 0,
                    'height': w.innerHeight + 'px',
                });

                $next.css({
                    'right': 0,
                    'height': w.innerHeight + 'px',
                });

                $element.append($prev);
                $element.append($next);

                new Hamr($prev[0]).on("tap", function() {
                    // console.log('hammr prev');
                    ctrl.prev();
                });

                new Hamr($next[0]).on("tap", function() {
                    // console.log('hammr next');
                    ctrl.next();
                });
            },
            setPaneIndex: function setPaneIndex(index) {
                if (index > 0)
                    $prev.removeClass('disabled');
                else {
                    $prev.addClass('disabled');
                }

                if (index >= (ctrl.getPaneCount() - 1))
                    $next.addClass('disabled');
                else {
                    $next.removeClass('disabled');
                }
            },
            resize: function resize(height) {
                if (!($prev && $next)) return;
                $prev.height(height);
                $next.height(height);
            }
        };
    }




    function initHammer(ctrl, $element) {


        function handleHammer(ev) {
            // disable browser scrolling
            // console.log('hamr', ev.type);
            ev.gesture.preventDefault();

            var currentIndex = ctrl.getCurrentIndex(),
                paneCount = ctrl.getPaneCount(),
                averagePaneWidth = ctrl.getAveragePaneWidth();

            switch (ev.type) {
                case 'dragright':
                case 'dragleft':
                    // stick to the finger
                    var x = ctrl.getOffsetAtIndex(currentIndex);

                    var drag_offset = ((100 / 440) * ev.gesture.deltaX) / paneCount;

                    // slow down at the first and last pane
                    if ((currentIndex === 0 && ev.gesture.direction == "right") ||
                        (currentIndex == paneCount - 1 && ev.gesture.direction == "left")) {
                        drag_offset *= 0.4;
                    }

                    ctrl.setOffset(ev.gesture.deltaX + x);
                    break;

                case 'swipeleft':
                    ctrl.next();
                    ev.gesture.stopDetect();
                    break;

                case 'swiperight':
                    ctrl.prev();
                    ev.gesture.stopDetect();
                    break;

                case 'release':
                    // more then 30% moved, navigate
                    if (Math.abs(ev.gesture.deltaX) > ((averagePaneWidth / 10) * 3)) {
                        if (ev.gesture.direction == 'right') {
                            ctrl.prev();
                        } else {
                            ctrl.next();
                        }
                    } else {
                        ctrl.updateOffset();
                    }
                    break;
            }
        }

        new Hamr($element[0], {
            drag_lock_to_axis: true
        }).on("release dragleft dragright swipeleft swiperight", handleHammer);
    }

    exports.carousel = {
        //Carousel: Carousel,
        getCarousel: function(element, data, paneCtrlFactory) {

            var ctrl = getCarouselCtrl(element, data, paneCtrlFactory);

            initHammer(ctrl, element);

            return ctrl;

            // return new Carousel(element, data, getPaneCtrl);
        }
    };

}(Pathways.components.core, window, Pathways.core.events.getEventListener, Pathways.components.core.imageLoader, Hammer, Modernizr, jQuery));

var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};

(function(w, exports, $) {

    var baseSelector = '';
    var attrSelector = '';

    function setState($el, re1, re2) {
        var gaData = $el.data(baseSelector);

        if (!gaData) return;
        var newStr = gaData.replace(re1, re2);
        $el.data(baseSelector, newStr);
    }

    function send(label) {
        console.log(baseSelector + ' click:', label, typeof ga);
        if (label) window.ga('send', 'event', 'link', 'click', label);
    }

    // Assumes selector will be in form '[data-<val>]'
    function init(selector) {
        console.log('initing ga');
        attrSelector = selector;
        baseSelector = selector.replace(/\[data-(\w*)\]/, '$1');
        update();
    }

    function update() {
        $(attrSelector).click(function() {
            send($(this).data(baseSelector));
        });
    }

    exports.ga = {
        setState: setState,
        send: send,
        init: init,
        update: update
    };

}(window, Pathways.components.core, jQuery));

var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};

(function(exports, w, getEventListener, utils, $) {

    function getOverlayCtrl() {

        var rootSel = 'body',
            activeClass = 'modal-open',
            closeTmpl = '<div class="close"></div>',
            overlayTmpl = '<div class="overlay"></div>',

            $root = $(rootSel);


        function create(tmpl, $root, $close) {
            var $el = $(tmpl);
            $el.append($close);
            $root.append($el);
            return $el;
        }

        function getCloseHandler($el, ctrl) {
            return function() {
                $root.removeClass(activeClass);
                ctrl.emit('close');
                w.setTimeout(function() {
                    $el.remove();
                }, 1000); // give css transition time
            };
        }

        function getClickHandler($el, $close, onCloseHandler) {
            return function(e) {
                if (e.target == $el[0] || e.target == $close[0]) { // only if we've clicked on overlay or close btn
                    onCloseHandler();
                }
            };
        }

        function init($el, ctrl, onClickHandler) {
            $el.on('click', onClickHandler);

            w.setTimeout(function() {
                // prevent scrolling
                $root.addClass(activeClass);

                ctrl.emit('init');
            }, 50); // delay before adding class to ensure transition event will fire
        }



        var ctrl = Object.create(getEventListener());
        ctrl.$close = $(closeTmpl);
        ctrl.$overlay = create(overlayTmpl, $root, ctrl.$close);
        ctrl.closeHandler = getCloseHandler(ctrl.$overlay, ctrl);

        var clickHandler = getClickHandler(ctrl.$overlay, ctrl.$close, ctrl.closeHandler);

        init(ctrl.$overlay, ctrl, clickHandler);

        return ctrl;
    }

    exports.overlay = {
        // OverlayCtrl: OverlayCtrl,
        getOverlay: function(onInitHandler, onClickHandler) {
            var overlay = getOverlayCtrl();
            overlay.on('close', onClickHandler);
            overlay.on('init', onInitHandler);
            return overlay.$overlay;
        },
        getCtrl: function(onInitHandler, onClickHandler) {
            var overlay = getOverlayCtrl();
            overlay.on('close', onClickHandler);
            overlay.on('init', onInitHandler);
            return overlay;
        }
    };

}(Pathways.components.core, window, Pathways.core.events.getEventListener, Pathways.utils, jQuery));

console.log('include panel audio-player');
(function(exports, audioPlayer, $) {

    exports.audioPlayer = function(element, data, src) {

        src = src || $(element).data('src');
        var audio = new Audio(src);

        var playerCtrl = audioPlayer.getPlayerCtrl(audio);
        var playerView = audioPlayer.getPlayerView(element, playerCtrl);
        playerCtrl.addView(playerView);

        playerCtrl.enable();
    };

}(Pathways.components, Pathways.components.core.audioPlayer, jQuery));

(function(w, exports, ga, $) {

    var repOpen = 'l3 open library',
        repClose = 'l3 close library';

    exports.clickActive = function(element, data) {

        var $element = $(element),
            targetSel = $element.data('click-active-target') || '.info-box',
            $target = $(targetSel);

        $element.on('click', targetSel, function toggleActive(e) {
            $element.toggleClass('active');
            return false;
        });

    };

}(window, Pathways.components, Pathways.components.core.ga, jQuery));

(function(w, doc, exports, overlay, $, utils) {

    exports.cropZoom = function(element, data) {
        var $elem = $(element),
            db = data;

        if (typeof db === 'undefined' || db === null) return console.warn('No data supplied to cropZoom component for ' + $elem.attr('id'));

        $elem.find('.tap-target').each(function() {
            var $target = $(this),
                key = $target.data('crop'),
                query = db[key];

            if (typeof query === 'undefined' || query === null) return console.warn('No related info was found for this tap target');

            var image = query.image,
                title = query.title ? query.title : '',
                text = query.text ? query.text : '',
                position = query.position ? query.position : '',
                img = new Image(),
                content;

            img.src = image;

            // Create the text content
            content = title !== '' ? '<h2>' + title + '</h2>' : '';
            content += '<p>' + text + '</p>';

            // Set up the tap on the target.
            Hammer($target.get(0)).on('tap', function(e) {
                e.gesture.preventDefault();

                var ctrl = overlay.getCtrl();

                var $overlay = ctrl.$overlay,
                    $popup = $('<div class="popup"></div>'),
                    $imageCrop = $(img).addClass('image-crop'),
                    $text = $('<div class="text"></div>');

                // Add in the elements
                $text.html(content);
                $popup.append($imageCrop);
                $popup.append($text);

                $overlay.append($popup);

                setTimeout(function() {
                    $text.css({
                        top: (window.innerHeight - $text.outerHeight() - 15)
                    });

                    if (position == 'right')
                        $text.css('right', 40);
                    else
                        $text.css('left', 40);

                    $text.addClass('show');
                }, 500);
                //Can't use transtionend with ie9 :( the delay is css timing value

                // Set an event so that after the image transitions in, show the text
                // $imageCrop.get(0).addEventListener('transitionend', function() {
                //     $text.css({
                //         top: (window.innerHeight - $text.outerHeight() - 15)
                //     });

                //     if (position == 'right')
                //         $text.css('right', 40);
                //     else
                //         $text.css('left', 40);

                //     $text.addClass('show');
                // });

                $imageCrop.css({
                    top: 0,
                    left: 0,
                    'transform': 'translate(0, ' + (Pathways.panelHeight) + 'px)',
                    opacity: 0
                });

                // Animate in the text
                setTimeout(function() {
                    $imageCrop.addClass('animate');

                    $imageCrop.css({
                        'transform': 'translate(0, ' + ((window.innerHeight - $imageCrop.height()) / 2) + 'px)',
                        opacity: 1
                    });

                }, 50);

                $imageCrop.on('click', ctrl.closeHandler);

                window.addEventListener('resize', function() {
                    $text.css({
                        top: (window.innerHeight - $text.outerHeight() - 15)
                    });
                });
            });
        });
    };

}(window, document, Pathways.components, Pathways.components.core.overlay, jQuery, Pathways.utils));

/*
    Carousel pattern initiator followed by the component.
*/
console.log('include gallery');

(function(exports, w, overlay, getCarousel, getImageLoader, utils, $, _Hammer, Mod) {

    var doc = w.document;

    function getPaneCtrlFactory(imageLoader) {
        function _paneCtrlFactory(data, index, onReady) {

            var $pane,
                ratio = 1,
                width = w.innerWidth;

            function onImageLoad(img) {
                ratio = img.naturalHeight / img.naturalWidth;

                updateWidth();
                $pane.append($(img));

                // add potential text
                if (data.text) {
                    var $child = $('<div>' + data.text + '</div>').addClass('text');
                    $pane.append($child);
                }

                if (typeof onReady === 'function') onReady.call(null, this);
            }

            function updateWidth() {
                width = parseInt((w.innerHeight / ratio), 10);
                if (width >= w.innerWidth) width = w.innerWidth;
                $pane.width(width);
            }

            return {
                create: function() {
                    // console.log('create', index);
                    $pane = $('<li/>');
                    imageLoader.loadImage(data.image, onImageLoad);
                    return this;
                },
                setIndex: function(newIndex) {
                    // console.log('setIndex', index, newIndex);
                    if (newIndex === index) {
                        $pane.css('opacity', 1);
                    } else {
                        $pane.css('opacity', 0.4);
                    }
                    return this;
                },
                resize: function() {
                    // console.log('resize', index);

                    updateWidth();

                    if (width >= w.innerWidth) {
                        $pane.removeClass('full-height');
                        $pane.addClass('full-width');
                    } else {
                        $pane.removeClass('full-width');
                        $pane.addClass('full-height');
                    }

                    return this;
                },
                getPane: function() {
                    return $pane;
                },
                getWidth: function() {
                    return width;
                }
            };

        }

        return _paneCtrlFactory;
    }

    exports.gallery = function(element, data) {
        var $elem = $(element),
            $panel = $elem.closest('.panel'),
            panelId = $panel.attr('id'),
            location = data.location;

        $(element).on('click', function(e) {

            var $overlay,
                $div = $('<div class="carousel carousel-gallery"></div>'),
                $loading = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'),
                imageLoader = getImageLoader(location),
                paneCtrlFac = getPaneCtrlFactory(imageLoader),
                carousel = getCarousel($div, data, paneCtrlFac);

            $loading.css({
                position: 'absolute',
                top: ((w.innerHeight / 2) - 12),
                left: ((w.innerWidth / 2) - 35)
            });

            $overlay = overlay.getOverlay(function() {
                carousel.init();
            });

            $overlay.append($loading);
            $overlay.append($div);

        });

    };


}(Pathways.components, window, Pathways.components.core.overlay, Pathways.components.core.carousel.getCarousel, Pathways.components.core.imageLoader.getImageLoader, Pathways.utils, jQuery, Hammer, Modernizr));

(function(w, exports, ga, Hammer, $) {

    function InfiniteCanvas(element, data) {
        var self = this,
            _element = element,
            $element = $(element),

            totalWidth = 0,
            totalHeight = 0,
            totalOffsetX = 0,
            totalOffsetY = 0,

            viewportWidth = w.innerWidth,
            viewportHeight = w.innerHeight,
            gaRoot = data.gaRoot,
            location = data.location || '';


        this.init = function() {
            var self = this;

            totalWidth = $element.outerWidth();
            totalHeight = $element.outerHeight();

            // center the first text block.
            centerText($('[data-chapter="1"]', $element));

            // prev/next events
            $element.on('click', '.prev, .next', function(e) {
                var $this = $(this),
                    $target = $(e.target),
                    chapter = $this.parents('.text-panel').data('chapter'),
                    $text;

                if ($target.hasClass('prev')) {
                    $text = $('[data-chapter="' + (chapter - 1) + '"]', $element);

                    if ($text.length) {
                        centerText($text);
                    }
                }

                if ($target.hasClass('next')) {
                    $text = $('[data-chapter="' + (chapter + 1) + '"]', $element);

                    if ($text.length) {
                        centerText($text);
                    }
                }

                e.preventDefault();
            });

            w.addEventListener('resize', function() {
                viewportWidth = w.innerWidth;
                viewportHeight = w.innerHeight;
            });

            this.loadImages(data.images);
        };

        this.loadImages = function(images) {

            var repOpen = 'l2 infinite-canvas open ',
                repClose = 'l2 infinite-canvas close ';

            var length = images.length,
                items = [],
                $item, $img, $box, $txt,
                getClickHandler = function($root, id) {
                    return function(e) {
                        var $this = $(this);
                        ga.send($this.data('ga'));
                        if ($root.hasClass('active')) {
                            ga.setState($this, repClose, repOpen);
                        } else {
                            ga.setState($this, repOpen, repClose);
                        }
                        $root.toggleClass('active');
                    };
                };

            for (var i = 0; i < length; i++) {

                $item = $('<div/>').addClass('image-panel');

                $img = $('<img/>');
                $img.attr('src', location + images[i].id + '.jpg');

                $svg = $('<svg class="info-box" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 70px; height: 70px;">' +
                        '<circle class="outer" cx="50%" cy="50%" r="30" fill="rgb(92,184,178)"></circle>' +
                        '<circle class="inner" cx="50%" cy="50%" r="20" fill="#fff"></circle>' +
                        '</svg>')
                        .attr('data-ga', gaRoot + ' - ' + images[i].id)
                        .click(getClickHandler($item, images[i].id));

                $box = $('<div/>').addClass('text');
                $txt = $('<p/>').text(images[i].text);

                $box.append($txt);

                $item.append($img)
                    .append($box)
                    .append($svg)
                    .css({
                        left: images[i].pos[0],
                        top: images[i].pos[1]
                    });
                items.push($item);
            }

            $element.append(items);
        };

        // Try to position the text in the middle of the screen, but also keep the canvas within bounds.
        function centerText($elm) {
            var width = $elm.outerWidth(),
                height = $elm.outerHeight(),
                top = $elm.position().top,
                left = $elm.position().left,

                offsetX = (viewportWidth - width) / 2,
                offsetY = (viewportHeight - height) / 2,

                totalX = (-left + offsetX),
                totalY = (-top + offsetY);

            // Keep within the bounds of the canvas
            if (totalX > 0)
                totalX = 0;

            if (Math.abs(totalX - viewportWidth) > totalWidth) {
                totalX = -(totalWidth - viewportWidth);
            }

            if (totalY > 0)
                totalY = 0;

            if (Math.abs(totalY - viewportHeight) > totalHeight) {
                totalY = -(totalHeight - viewportHeight);
            }

            setContainerOffset(totalX, totalY, true);
            totalOffsetX = totalX;
            totalOffsetY = totalY;
        }

        function setContainerOffset(x, y, animate) {
            $element.removeClass("animate");

            if (animate) {
                $element.addClass("animate");
            }

            if (Modernizr.csstransforms3d)
                $element.css("transform", "translate3d(" + x + "px, " + y + "px ,0)");
            else
                $element.css("transform", "translate(" + x + "px," + y + "px)");
        }

        function handleHammer(ev) {
            // disable browser scrolling
            ev.gesture.preventDefault();

            switch (ev.type) {
                case 'drag':
                    setContainerOffset((ev.gesture.deltaX + totalOffsetX), (ev.gesture.deltaY + totalOffsetY));
                    break;

                case 'release':
                    totalOffsetX += ev.gesture.deltaX;
                    totalOffsetY += ev.gesture.deltaY;

                    // Drag too far right
                    if (totalOffsetX > 0) {
                        setContainerOffset(0, totalOffsetY, true);
                        totalOffsetX = 0;
                    }

                    // Drag too far left
                    if (Math.abs(totalOffsetX - viewportWidth) > totalWidth) {
                        setContainerOffset(-(totalWidth - viewportWidth), totalOffsetY, true);
                        totalOffsetX = -(totalWidth - viewportWidth);
                    }

                    // Drag too far down
                    if (totalOffsetY > 0) {
                        setContainerOffset(totalOffsetX, 0, true);
                        totalOffsetY = 0;
                    }

                    // Drag too far up
                    if (Math.abs(totalOffsetY - viewportHeight) > totalHeight) {
                        setContainerOffset(totalOffsetX, -(totalHeight - viewportHeight), true);
                        totalOffsetY = -(totalHeight - viewportHeight);
                    }

                    break;
            }
        }

        new Hammer(_element, {}).on("release drag", handleHammer);
    }

    exports.infiniteCanvas = function(element, data) {

        $(element).find('.infinite-canvas').each(function() {
            var infiniteCanvas = new InfiniteCanvas(this, data);
            infiniteCanvas.init();
        });

    };

}(window, Pathways.components, Pathways.components.core.ga, Hammer, jQuery));

(function(exports, w, ga, $) {

    var repOpen = 'l2 open share',
        repClose = 'l2 close share',
        offsetHeight = 60,
        visibleClass = 'info-panel-open';

    exports.infoPanel = function(element, data) {

        function closePanel($panel) {
            $panel.removeClass(visibleClass);
        }

        function openPanel($panel) {
            $panel.addClass(visibleClass);
        }

        $(element).on('click', '.handle', function() {
            var $this = $(this);
            var $panel = $this.parent();

            //console.log(gaData);

            if ($panel.hasClass(visibleClass)) {
                closePanel($panel);
                ga.setState($this, repClose, repOpen);

            } else {
                openPanel($panel);
                $(window).one('scroll', function() {
                    closePanel($panel);
                    ga.setState($this, repClose, repOpen);
                });
                ga.setState($this, repOpen, repClose);
            }
        });
    };

}(Pathways.components, window, Pathways.components.core.ga, jQuery));

Pathways.components.infographic = function(element, data) {

    var $svg = $(element).find('svg');
    $svg.on('click', 'circle', function() {
        var $this = $(this),
            top = $this.position().top,
            left = $this.position().left,
            radius = $this.attr('r'),

            center_x = left + (radius / 2),
            center_y = top + (radius / 2);

        $svg.css('transform-origin', center_x + 'px ' + center_y + 'px');
        $svg.css('transform', 'scale(3, 3)');
    });

};

console.log('include letter-gallery');

(function(exports, w, getOverlayCtrl, getCarousel, getImageLoader, audioPlayer, utils, $, _Hammer, Mod) {

    function getAudioPlayerTemplate() {
        var $tmpl = $('<div class="audio-player audio-player-gallery">' +
            '<div class="time-left">Time: <span>0:00</span></div>' +
            '<div class="progress-bar">' +
            '<div class="progressed"></div>' +
            '</div>' +
            '<div class="controls"></div>' +
            '</div>');

        return $tmpl;
    }

    function getTemplate() {
        var $tmpl = $('<li><div class="letter-pane clearfix">' +
            '<div class="letter-images">' +
            '<div class="main-image"></div>' +
            '<div class="highlight-image"></div>' +
            '</div>' +
            '<div class="letter-info">' +
            '<div class="audio-player-wrapper clearfix">' +
            '<div class="audio-player"></div>' +
            '<div class="highlight-button"></div>' +
            '</div>' +
            '<div class="letter-text"></div>' +
            '</div>' +
            '</div></li>');

        return $tmpl;
    }

    function getPaneCtrlFac(carousel, overlay, imageLoader) {
        var hiddenClass = 'highlight-hidden',
            activeClass = 'highlight-active';

        function _paneCtrlFactory(data, index, onReady) {

            var $pane,
                ratio = 1,
                width = w.innerWidth;


            function loadPlayer(src, $el) {
                if (!src) return;

                var $player = getAudioPlayerTemplate(),
                    playerCtrl = audioPlayer.getAudioPlayer(src, $player);

                carousel.on('setPaneIndex', function(newIndex) {
                    // console.log('setPaneIndex playerCtrl', index, newIndex);
                    if (index === newIndex) playerCtrl.enable();
                    else {
                        playerCtrl.disable();
                    }
                });

                overlay.on('close', function() {
                    // console.log('close playerCtrl');
                    playerCtrl.disable();
                });

                $el.replaceWith($player);

            }

            function initHighlightImgDiv(img, $el) {
                $el.append($(img));
                $el.addClass('highlight-hidden');
            }

            function initHighlightButton($btn, $text, $img) {
                $btn.addClass('set-highlight');

                $btn.click(function(e) {
                    // console.log('highlight: ', $img);
                    $btn.toggleClass('unset-highlight');

                    if ($img.hasClass(activeClass)) {
                        $img.removeClass(activeClass);
                        $img.addClass('highlight-hidden');
                        // $text.removeClass('letter-text-highlight-active');
                    } else {
                        $img.removeClass('highlight-hidden');
                        $img.addClass(activeClass);
                        // $text.addClass('letter-text-highlight-active');
                    }
                });

            }

            function linkHighlightAndPlayer($controls, $highlightbtn) {
                $controls.click(function(e) {
                    console.log('highlight: ', $controls.attr('class'));

                });
            }

            function getLetterLengthStyle(text) {
                var type = 'long-letter',
                    length = text.length;
               // console.log(length);
                switch (true) {
                    case (length < 600):
                        type = 'short-letter';
                        break;
                    case (length < 900):
                        type = 'medium-letter';
                        break;
                    default:
                        type = 'long-letter';
                }
                return type;
            }

            function updatePaneStyle($panediv, $txtdiv, type) {
                $panediv.addClass(type + '-pane');
                $panediv.find('.letter-images').addClass(type + '-images');
                $panediv.find('.letter-info').addClass(type + '-info');
                $txtdiv.addClass(type + '-text');
            }

            function loadComplete() {
                // console.log('pane', index, 'load complete; ', typeof onReady);
                if (typeof onReady === 'function') onReady.call(null, this);
                onReady = null;
                $pane.find('.letter-pane').show();
            }

            return {
                create: function() {

                    // console.log('create', index, data.audio);
                    $tmpl = getTemplate();

                    $pane = $tmpl;
                    $pane.find('.letter-pane');

                    var $panediv = $pane.find('.letter-pane'),
                        $close = $('.overlay .close'),
                        $txtdiv = $tmpl.find('.letter-text'),
                        $mainimgdiv = $tmpl.find('.main-image'),
                        $highlightimgdiv = $tmpl.find('.highlight-image'),
                        $highlightbtndiv = $tmpl.find('.highlight-button'),
                        $playerdiv = $tmpl.find('.audio-player'),
                        highlightImgSrc,

                        onMainImgLoaded = function(img) {
                            $mainimgdiv.append($(img));
                            if (data.audio) {
                                highlightImgSrc = data.image + '-active';
                                imageLoader.loadImage(highlightImgSrc, onHighlightImgLoaded);
                            } else {
                                loadComplete();
                            }
                        },
                        onHighlightImgLoaded = function(img) {
                            initHighlightImgDiv(img, $highlightimgdiv);
                            initHighlightButton($highlightbtndiv, $txtdiv, $highlightimgdiv);
                            loadComplete();
                        };

                    $panediv.hide();

                    $txtdiv.load(data.textSrc, function(loadedHTML) {
                        updatePaneStyle($panediv, $txtdiv, getLetterLengthStyle($(loadedHTML).text()));
                    });
                    imageLoader.loadImage(data.image, onMainImgLoaded);

                    loadPlayer(data.audio, $playerdiv);
                    linkHighlightAndPlayer($playerdiv.find('.controls'), $highlightbtndiv);

                    $close.addClass('close-carousel-letter-gallery');

                    return this;
                },
                setIndex: function(newIndex) {
                    // console.log('setIndex', index, newIndex);
                    // if (newIndex === index) {
                    //     $pane.css('display', 'block');
                    // } else {
                    //     $pane.css('opacity', 0.4);
                    // }
                    return this;
                },
                resize: function() {
                    // console.log('resize', index);
                    width = w.innerWidth;
                    $pane.width(width);
                    return this;
                },
                getPane: function() {
                    return $pane;
                },
                getWidth: function() {
                    return width;
                }
            };

        }

        return _paneCtrlFactory;
    }

    exports.letterGallery = function(element, data) {
        var $elem = $(element),
            $panel = $elem.closest('.panel'),
            panelId = $panel.attr('id'),
            location = data.location;

        $(element).on('click', function(e) {

            var overlay = getOverlayCtrl(),
                $overlay = overlay.$overlay,
                $div = $('<div class="carousel carousel-letter-gallery"></div>'),
                $loading = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'),
                carousel = getCarousel($div, data),
                imageLoader = getImageLoader(location),
                paneCtrlFactory = getPaneCtrlFac(carousel, overlay, imageLoader);

            carousel.setFactory(paneCtrlFactory);

            $loading.css({
                position: 'absolute',
                top: ((w.innerHeight / 2) - 12),
                left: ((w.innerWidth / 2) - 35)
            });


            $overlay.append($div);
            $overlay.append($loading);

            overlay.on('init', function() {
                carousel.init();
            });

        });

    };


}(Pathways.components, window, Pathways.components.core.overlay.getCtrl, Pathways.components.core.carousel.getCarousel, Pathways.components.core.imageLoader.getImageLoader, Pathways.components.core.audioPlayer, Pathways.utils, jQuery, Hammer, Modernizr));

(function(exports, w, doc, overlay, $, utils) {

    exports.playerOverlay = function(elem) {

        var $element = $(elem),

            defaultPanelOffset = 180,
            fullScreenPanelOffset = 0,

            playerSel = '.wellcomePlayer',
            overlayFullscreenClass = 'overlay-fullscreen',
            iframeTmpl = '<iframe/>',

            getHeightWithOffset = utils.getHeightWithOffset,
            getWidthWithOffset = utils.getWidthWithOffset;


        $element.on('click', function(e) {

            var $this = $(this),
                embedData = $this.data('embed'),
                isFullScreen = false;

            if (!embedData) return console.warn('No data provided to video overlay');

            var initHeight = getHeightWithOffset(defaultPanelOffset),
                initWidth = getWidthWithOffset(defaultPanelOffset),

                // Excluding the following attribute for now to enable player until CORS enabled
                // data-config="/player-config.js"
                playerTmpl = '<div class="wellcomePlayer" data-no-load="true" data-uri="' + embedData + '" data-assetsequenceindex="0" data-assetindex="0" data-zoom="-0.6441,0,2.2881,1.4411" data-config="/service/playerconfig" style="width:' + initWidth + 'px; height:' + initHeight + 'px; background-color: #000"></div>',

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

                $player.css('width', width);
                $player.css('height', height);

                utils.positionCenter($player);
            }

            function resizePlayer() {
                var offset = getOffset();
                resizePlayerToDimensions(getWidthWithOffset(offset), getHeightWithOffset(offset));
            }

            function createPlayer(tmpl, $rootEl) {
                $el = $(tmpl);
                $rootEl.append($el);
                return $el;
            }

            function initPlayer(sel) {
                w.initPlayers($(sel));
            }

            function addDocListeners() {

                $(w).resize(resizePlayer);

                $(w).on('onToggleFullScreen', function(event, goFullScreen) {
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

                $overlay = overlay.getOverlay(function() {
                    initPlayer(playerSel);
                }, function() {
                    isFullScreen = false;
                    w.embedScriptIncluded = false;
                });

                $player = createPlayer(playerTmpl, $overlay);

                addDocListeners();
            }

            init();
            resizePlayer();

            e.preventDefault();
            return false;

        });
    };

}(Pathways.components, window, document, Pathways.components.core.overlay, jQuery, Pathways.utils));


Pathways.components.quiz = function(element, data) {

    if(typeof data === 'undefined') return console.warn('Quiz component not provided data');

    $(element).on('click', function(e) {
        // setup overlay
        var $overlay    = $('<div class="overlay"></div>'),
            $close      = $('<div class="close"></div>');

        $overlay.css('height', window.innerHeight );

        // append overlay
        $('body').append( $overlay );

        $overlay.show();
        $overlay.css({
            'background-color': 'rgba(0,0,0,0.9)',
            'background-image': 'url('+data.images + '/' + 'bg.jpg)'
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

            Pathways.utils.positionCenter($quizContainer);

            var quiz = new Quiz($quizContainer, data);

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
};

function Quiz(element, data) {
    var $quiz           = $(element),
        paused          = false,
        level           = 1,
        imagesLocation  = data.images,
        questions       = data.questions,
        answers         = data.questions[level].answers,
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
    };

    this.start = function() {

        var self = this;

        $quiz.find('.quiz-start').hide();
        $quiz.find('.status-bar').show();
        $quiz.find('.quiz-playground').show();

        // Load the level
        this.loadLevel();
    };

    this.getCurrentQuestion = function() {
        return questions[(level-1)];
    };

    this.loadLevel = function(l) {
        // image
        var self        = this,
            question    = this.getCurrentQuestion(),
            $image      = $('<img/>').attr('src', imagesLocation + '/' + question.image),
            str         = '<ul>';

        $quiz.find('.image').html($image);

        // question
        $quiz.find('.question').html(question.title);

        // answers
        for (var i = 0; i < question.answers.length; i++) {
            str += '<li>' + question.answers[i] + '</li>';
        }

        str += '</ul>';

        $quiz.find('.answers').html(str);

        this.updateScore();
        this.updateQuestionsRemaining();

        // Wait for timerWait seconds then start a timerLength countdown
        timeoutWaitID = setTimeout(function() {
            self.startTimer();
        }, (timerWait * 1000));
    };

    this.validate = function(e) {
        var self        = this,
            question    = this.getCurrentQuestion(),
            correct     = false;

        this.stopTimer();

        if( $quiz.find('li').index($(e.currentTarget)) == (question.correct - 1) )
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
        }, 2000);
    };

    this.nextQuestion = function($elm) {
        level++;

        if( level <= questions.length )
            this.loadLevel();
        else
            this.finishGame();
    };

    this.showCorrect = function($elm) {
        $elm.addClass('correct');
    };

    this.showError = function($elm) {
        $elm.addClass('wrong');
    };

    this.revealAnswers = function() {
        var self        = this,
            question    = this.getCurrentQuestion(),
            count       = 1;

        $quiz.find('.answers li').each(function() {
            if(count == question.correct)
                self.showCorrect($(this));
            else
                self.showError($(this));

            count++;
        });
    };

    this.updateScore = function() {
        $score.html(score);
    };

    this.updateQuestionsRemaining = function() {
        $remaining.html('<em>'+level+'</em> of <span>'+totalQuestions+'</span>');
    };

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
    };

    this.stopTimer = function() {
        clearInterval(timerID);
        clearTimeout(timeoutWaitID);

        $timer.fadeOut(100);
    };


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
    };

    this.restart = function() {
        this.stopTimer();

        score = 0;
        level = 1;

        $quiz.find('.quiz-finish').hide();

        this.start();
    };

    this.init();
}

(function(exports, overlay, ga, $) {

    function Modal(elm, data) {

        var self = this,
            $elm = elm,
            baseClass = 'modal-box',
            hiddenClass = 'modal-box-hidden',
            shownClass = 'modal-box-shown',
            $overlay,
            $img;

        this.init = function() {

            var img = new Image(),
                ctrl = overlay.getCtrl(),
                $overlay = ctrl.$overlay,
                $img = $(img),
                $container = $('<div/>').addClass(baseClass + ' ' + hiddenClass),
                src = $elm.attr('data-image'),
                caption = $elm.data('caption'),
                download = $elm.data('download'),
                gaLabel = ($elm.data('ga') || src) + ' - download',
                $caption = caption ? $('<p>' + caption + '</p>').addClass('text') : '';
                $download = download ? $('<a>Download</a>')
                            .attr('href', download).addClass('download')
                            .click(function(){
                                ga.send(gaLabel);
                            }) : '';

            //console.log('ga', gaTracking);
            img.src = $elm.attr('data-image');
            $caption.append($download);

            $container.on('click', ctrl.closeHandler);

            img.onload = function() {
                $overlay.append($container);
                $container.append($img);
                $container.append($caption);
                $container.removeClass(hiddenClass).addClass(shownClass);
            };
        };
    }

    exports.slidingModal = function(element, data) {

        $(element).find('.modal').on('click', function() {
            // var id = $(this).data('id');
            // if (!id) return console.warn('No id defined for modal element:' + this);
            // var mData = data[id];
            // if (!mData) console.warn('No data defined for modal id \'' + id + '\'');
            //
            var modal = new Modal($(this), data);
            modal.init();
        });

    };



}(Pathways.components, Pathways.components.core.overlay, Pathways.components.core.ga, jQuery));

(function(w, exports, ga, $) {

    var repOpen = 'l3 open library',
        repClose = 'l3 close library';

    exports.toggleSection = function(element, data) {

        var $element = $(element),
            targetSel = $element.attr('data-toggle-section-target'),
            $target = $(targetSel),
            $scrollAnchor = $($element.attr('data-toggle-section-anchor')),
            $related = $('[data-toggle-section-target="'+targetSel+'"]'),
            height = $target.height();

        $target.css({
            'height': 0,
            'transition': 'height 0.4s ease'
        });

        $element.on('click', function toggleOpen() {

            if (!$target.hasClass('open')) {
                $target.css('height', height);

                $('html, body').animate({
                    scrollTop: $scrollAnchor.offset().top - 100
                }, 400);
                ga.setState($related, repOpen, repClose);

            } else {
                $target.css('height', 0);
                ga.setState($related, repClose, repOpen);
            }

            $target.toggleClass('open');

            return false;
        });

    };

}(window, Pathways.components, Pathways.components.core.ga, jQuery));

Pathways.components.cropZoom.mesmersSalon = {
    data: {
        'rod': {
            'image': '/pathways/1-mindcraft/1-mesmer/_assets/rod-crop.jpg',
            'title': '',
            'text': 'Mesmer ‘magnetised’ rods or wands that could be used to direct the fluid to the afflicted part of the body. He would often play music on a glass harmonica that sent shivers through the patients’ nerves.',
            'position': 'right'
        },
        'woman': {
            'image': '/pathways/1-mindcraft/1-mesmer/_assets/woman-crop.jpg',
            'text': 'Patients would form circles, holding hands or grasping cords, to transfer the healing energies between them. Sometimes these healing circles would climax in mass convulsions.',
            'position': 'left'
        },
        'mesmer': {
            'image': '/pathways/1-mindcraft/1-mesmer/_assets/mesmer-crop.jpg',
            'text': 'Mesmer, depicted here with his wand, taught his healing skills to initiates. They were obliged to take a strict vow of secrecy and pay the large sum of 100 livres. Many French aristocrats signed up.',
            'position': 'left'
        }
    }
};

// Pathways.scrollSceneCtrl.addSinglePanelScrollFactory('mesmers-salon', function() {
//     return {
//         getScenes: function(panelId, panelEl, panelAttrs) {
//             scene = new ScrollScene({
//                     triggerElement: panelId,
//                     duration: Pathways.panelHeight
//                 })
//                 .on('enter', function(e) {
//                     console.log('>>enter factory');
//                 })
//                 .on('leave', function(e) {
//                     console.log('>>leave factory');
//                 });

//             return scene;
//         }
//     };
// });

// Pathways.scrollSceneCtrl.addSinglePanelScrollFactory('mesmers-salon', {
//     getScenes: function(panelId, panelEl, panelAttrs) {
//         scene = new ScrollScene({
//                 triggerElement: panelId,
//                 duration: Pathways.panelHeight
//             })
//             .on('enter', function(e) {
//                 console.log('>>enter object');
//             })
//             .on('leave', function(e) {
//                 console.log('>>leave object');
//             });

//         return scene;
//     }

// });

// Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('mesmers-salon',
//     function(panelId, panelEl, panelAttrs) {
//         scene = new ScrollScene({
//                 triggerElement: panelId,
//                 duration: Pathways.panelHeight
//             })
//             .on('enter', function(e) {
//                 console.log('>>enter method');
//             })
//             .on('leave', function(e) {
//                 console.log('>>leave method');
//             });

//         return scene;
//     }

// );


Pathways.components.gallery.toolsOfMesmerism = {
    data: {
        location: '_assets/galleries/tools-of-mesmerism/',
        images: [{
            image: 'V0016530',
            text: '1/7: The tub, or baquet, was central to Mesmer’s treatments.'
        }, {
            image: 'L0023349',
            text: '2/7: Mesmer magnetised objects such as these to treat his patients.'
        }, {
            image: 'L0023350',
            text: '3/7: The different shaped items conducted the superfine fluid he saw as present in all living things.'
        }, {
            image: 'L0023351',
            text: '4/7: By controlling the fluid to bring a patient to a crisis point, Mesmer would ‘cure’ them.'
        }, {
            image: 'L0023352',
            text: '5/7: Magnetised objects showing their magnetic fields.'
        }, {
            image: 'M0006352',
            text: '6/7: Mesmer’s assistants blew a whistle to indicate which social class of baquet they should go to.'
        }, {
            image: 'V0011096',
            text: '7/7: Another baquet and a description of how Animal Magnetism works.'
        }, ]
    }
};

var createjs = createjs || {},

    magnetisedTrees = {
        lib: {},
        images: {}
    };

(function(lib, img, cjs) {

    var p; // shortcut to reference prototypes

    // library properties:
    lib.properties = {
        width: 1901,
        height: 1050,
        fps: 24,
        color: "#FFFFFF",
        manifest: [{
            src: "/pathways/1-mindcraft/1-mesmer/_assets/animations/magnetised-trees/images/Bitmap1.jpg",
            id: "Bitmap1"
        }, {
            src: "/pathways/1-mindcraft/1-mesmer/_assets/animations/magnetised-trees/images/Bitmap2.jpg",
            id: "Bitmap2"
        }, {
            src: "/pathways/1-mindcraft/1-mesmer/_assets/animations/magnetised-trees/images/Bitmap4.png",
            id: "Bitmap4"
        }, {
            src: "/pathways/1-mindcraft/1-mesmer/_assets/animations/magnetised-trees/images/treemask.png",
            id: "treemask"
        }]
    };

    // stage content:
    (lib.tree2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // ROD-1
        this.instance = new lib.ROD1();
        this.instance.setTransform(861.4, 580.5, 1, 1, 0, 0, 0, 43.2, 188.6);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(685));

        // ROD-2
        this.instance_1 = new lib.ROD2();
        this.instance_1.setTransform(916.8, 569.5, 1, 1, 0, 0, 0, 27.6, 177.7);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(685));

        // ROD-3
        this.instance_2 = new lib.ROD3();
        this.instance_2.setTransform(1041.1, 557.6, 1, 1, 0, 0, 0, 53.3, 147.8);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(685));

        // ROD-4
        this.instance_3 = new lib.ROD4();
        this.instance_3.setTransform(1067.8, 565.2, 1, 1, 0, 0, 0, 41.2, 137.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(685));

        // ROD-5
        this.instance_4 = new lib.ROD5();
        this.instance_4.setTransform(1286.2, 544.2, 1, 1, 0, 0, 0, 145.2, 227.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(685));

        // BKG
        this.instance_5 = new lib.Bitmap1();
        this.instance_5.setTransform(0, 0, 1, 1.011);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(685));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(950.5, 525, 1901, 1056);


    // symbols:
    (lib.Bitmap1 = function() {
        this.initialize(img.Bitmap1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 1901, 1044);


    (lib.Bitmap2 = function() {
        this.initialize(img.Bitmap2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 609, 459);


    (lib.Bitmap4 = function() {
        this.initialize(img.Bitmap4);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 500, 742);


    (lib.treemask = function() {
        this.initialize(img.treemask);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 623, 475);


    (lib.Symbol1 = function() {
        this.initialize();

        // Layer 1
        this.shape = new cjs.Shape();
        this.shape.graphics.bf(img.Bitmap4, null, new cjs.Matrix2D(-1.027, 0, 0, 0.814, 107.6, -302)).s().p("ArCd4MAAAg7vIWEAAMAAAA7vg");
        this.shape.setTransform(178.2, 238.3, 2.52, 1.246);

        this.addChild(this.shape);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 356.4, 476.5);


    (lib.ROD5 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // rod (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        var mask_graphics_1 = new cjs.Graphics().p("EgWqAjbQgEgGALgPQAAgPAKgDQAEgBARABQAQgZAjgRIA7gbIAlgNQAYgbAegKQAGgLAMgCQAFgBAOABIAAgCQACgQATgNIAggRQAEgLAMgCIAYgSQAKgPAXgMIAlgVIAXgSQAMgLAGgNIA5g1IALgHQAKgLARgWQARgTARgIIAcgXIBGg6QAUgRAmgkQAjgfAcgQQAMgkAbgQQAGgPAOgFIAJgIIAhgnQAFgPAOgGQAFgEAggnQAWgbAVgKIAVgdQAEgQAOgFQAIgTAUgMQAZgmAdgUQAGgQAMgFQALgaASgGIAMgRIAdggQAAgUATgKIAggmQALgGAKgSQALgUAIgGQAKgFAJgVQAIgUANgEIAbgqQARgWAXgHQAAgWAPgVQAHgMAUgXIAmghQgBgEADgEQgBgOABgDQACgHAOADIAqgpQgagmAugCQADgeAcACQgCgxAfgWIAEgJQANgeAOgLQABgSAYgbQAWgaAAgTIBciqIAOgYQAIgPAQgBQgCgNAIgKQAFgHAMgKIAnhRIANggQAHgSAKgLQgBgOAIgFIAJgWQAGgNAIgHQAAgNAKgEQAAgOAIgFIADgLQADgFAFgDIACgLQACgHAGgCIAMgVQAFgZAOgOQABgPAKgEQAKgkAUgYIAKgUQgBgNALgHQACgRASgXIAKgUQAEgXAQgSIABABIAdhGQgCgOAMgHIASgoQAIgiANgPQAHghAOgRQAHgjAPgPQgEgOAOgPQAAgXASgTQAIgcAHgPQAKgWAPgPIALgTIgBgaQABgPALgJQACgZAQgPQAKgjAHgQQAMgbAfgFQgBADADADIABgDIgDgDQgTgfAOgoQAVgsAEgXIABgMQACgHAGgDQgDgWARgPIAPglIABgFQgBgFAEgDIAlhcQgBgTAMgKQAKg6AUgfQgBgOAMgaQABgZAPgaQAAgUAJgZIAQgsQAGgeALgNIADgRQACgRADgKQAEgOAJgJQAFgHADggQACgYAUgHQgCgEABgDQgDgUAIgZIAQgpQgCgUALgKQAEgiAQgXQgBgdAMgNQgCgEAEgEIALgpQAHgXAJgRIANg7IAHgaQAEgQAIgIIATgzQAPgbAUAOQASANgKAXIggBGQgIA+gWA5QACAFgDAEQgCAVgJAaIgSAtIgEAbQgFAOgLAIQADAPgIARIgRAbQAGAfgZAeIACAQQACAUgLAYQgGAOgPAaIABAfQgCARgKAMIgFAWQgEANgLAFQAFAggOASQgEAjgQAbQgBARgKAKQgBAmgTAhQADAPgNAOQgGAIgCAUQgCATgJAIQgBAQgJAPQgGALgPAPQADAXgKAYQgGAOgRAbQgFALgGAlQgGAegMAPQgFAYgLAbIgXAwQgCAUgVAcIgGAjQgGASgRAJQABAMgJARQgLAUgBAJQACARgKASIgVAdQADAVgMAYIgWApQgCADgGAaQgEARgQAFIgCATQACAZgXAXIgJAWQAAATgJAVQgFALgNAYIgDAFIAAAAQgEAhgRAPIgJAMIgFAaQgFAPgLAHQgGALgdBDQgWAwgWAaQgDAHgDAPQgEANgLAEQgUAOAAAbQgKAKgLAgQgKAbgQAKQgBAUgTAeQgVAhgDAQQgBASgOAZQgTAggDAIQgEARgTATQgWAXgFAJIABABQgGAcgaAeQgFASgGAHQgJAKgQgCQAKAYgPAYQgUAagHAOIgfArQgLAogIAQQgPAegaAPQACAJgJgDQAJAWgOASQgUATgHALQgFALgDAGQgGAIgJADQgIAEgJASQgIAQgLAEQABAOgJANIgSAVQgHANgEAFQgHAJgKACQgDADgFAAQgCATgFAJQgGANgRACQACALgHAHQgDAEgNAGQgCAegbALQADAIgGAHIgKAMQgFARgUAQIgUAcQgJAYgWAQIgKAJQgTAmgcAXQgDAIgCADQgFAEgHgCQgHAjgeALIgTAVQABAFgDAEQgCALgKALIgRARIhuB5QAAAMgMAKQgRAOgCAEQgCAMgRAFQgHAHgxA/QghArgfATIgxAzQADAIgKAEIg0A1IgKAGQgPAZgiAPQgNAVgYATIgtAeIgSAVQgFANgRAHQgQAZgsAXQgGAQgIAHQgLAJgPgBQgBARgNALQgFAEgWAOIgmAYIgMASQgIALgMgBQgOAEgYAZQgWAWgTACQADAFgFADQgHANgNAFQgKAEgRAAIgKAJQgSAcgiALIgRAOQgLAHgMgCQgfAggdAIIgdAFQACALgGAHQgFAEgLAEIgVAIIgdANQgQAIgMADQgHACgFAAQgGAAgDgEgAS33PIgBgFIgCAEIADABg");

        this.timeline.addTween(cjs.Tween.get(mask).to({
            graphics: null,
            x: 0,
            y: 0
        }).wait(1).to({
            graphics: mask_graphics_1,
            x: 145.2,
            y: 227.1
        }).wait(45));

        // grdt
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);
        this.instance._off = true;

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({
            _off: false
        }, 0).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -117.8
        }, 0).wait(1).to({
            y: -82.7
        }, 0).wait(1).to({
            y: -47.6
        }, 0).wait(1).to({
            y: -12.5
        }, 0).wait(1).to({
            y: 22.6
        }, 0).wait(1).to({
            y: 57.6
        }, 0).wait(1).to({
            y: 92.7
        }, 0).wait(1).to({
            y: 127.8
        }, 0).wait(1).to({
            y: 162.9
        }, 0).wait(1).to({
            y: 198
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 272.1
        }, 0).wait(1).to({
            y: 311.2
        }, 0).wait(1).to({
            y: 350.3
        }, 0).wait(1).to({
            y: 389.4
        }, 0).wait(1).to({
            y: 428.5
        }, 0).wait(1).to({
            y: 467.6
        }, 0).wait(1).to({
            y: 506.6
        }, 0).wait(1).to({
            y: 545.7
        }, 0).wait(1).to({
            y: 584.8
        }, 0).wait(1).to({
            y: 623.9
        }, 0).wait(1).to({
            y: 663
        }, 0).wait(1).to({
            y: 702.1
        }, 0).wait(22));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = null;


    (lib.ROD4 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // rod (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AmWVSQgMgQAQgKQAXgPACgEQAKgGARgaQAPgXASgEQADgDAEgBIAOgcQgFgQAMgJIAXgOQAHghAKgTQAOgaAYgOQgGgVANgbQAUglABgGQAFgTALgZIAUgrIAQg1QAFgUADgKQAGgQAKgLIAVgyIAPgqQAKgYAOgOIAKgoIAHgLQgBgcAQgvQAPg0ACgXQASgbAPguIAYhNIAhiLQAEgyAOgeIABgKIAGglQAEgVAKgMIAbhnQAPg+AFgtQACgsADgbQAFgnALgeIACgSQgCgRALgPQAHhQAXg8QACgzAShDIAqksQgCgmATgsIABABQACgvAOgtQABgFACgFQgCgFAEgCIABgXQABgNAGgJQgDgDAEgCQABhlADglQgBgTABgKQACgQAOgIQAPgRAPAUQAXAygWA6IABABIgJAbIgBAAQASAUgFAbQgDAPgLAgQgKAHABAXQACAWgNAHQADAWgOAkQACAhgHAsIgOBMQgCAZgDAyQgDAsgMAdIgnDfQgKBUgfBpIAAAjQgBAUgIAOIgCAkQgCAUgGAOIgCATQAEA0ggA3QAAAigQAuQgXBCgDAOIAAALQgJAVgBAmIgFAlQgEAWgJAOQgIAPgHAnQgHAkgLARQgBAJACASQAAARgIAJQgHAbgbBCQgYA6gFAlQgBAIABAQQgCAOgRACQgBADgFAAQgBADABAVQAAAPgKAIIABAAIgfBTIgLATQACALgLAHQgCAHgCAQQgDAOgNAEQADAKgFALIgKASIgRAsIABACIgCACQAAAPgJAVQgLAagCAJQABAMgNAOQgPAPgBAJQABAOgHAOQgEAJgLAOIgIALQgCALgLALQgMALgFAGIgKAlQgJAUgUAFQABAVgNAIQgQAcgiAfQgUAUgFADQgWAQgFACQgGADgFAAQgKAAgHgJg");
        mask.setTransform(41.2, 137.1);

        // grdt
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -117.8
        }, 0).wait(1).to({
            y: -82.7
        }, 0).wait(1).to({
            y: -47.6
        }, 0).wait(1).to({
            y: -12.5
        }, 0).wait(1).to({
            y: 22.6
        }, 0).wait(1).to({
            y: 57.6
        }, 0).wait(1).to({
            y: 92.7
        }, 0).wait(1).to({
            y: 127.8
        }, 0).wait(1).to({
            y: 162.9
        }, 0).wait(1).to({
            y: 198
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 265.5
        }, 0).wait(1).to({
            y: 297.9
        }, 0).wait(1).to({
            y: 330.3
        }, 0).wait(1).to({
            y: 362.7
        }, 0).wait(1).to({
            y: 395.1
        }, 0).wait(1).to({
            y: 427.6
        }, 0).wait(1).to({
            y: 460
        }, 0).wait(1).to({
            y: 492.4
        }, 0).wait(1).to({
            y: 524.8
        }, 0).wait(1).to({
            y: 557.2
        }, 0).wait(1).to({
            y: 589.6
        }, 0).wait(1).to({
            y: 622.1
        }, 0).wait(22));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 82.5, 274.3);


    (lib.ROD3 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // rod (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("An8XDQgDgCgQgPQgJgIAHgKQAFgIANgHQAJgTAVgCQAJgUAFgGQAKgMAPgDIALgSQAIgKAMABIAAAAIABAAQAMg/AvgcIgBgLQACgGAGgCQAKgPAOgiQAOgcAagIIARgcIABgDQgJgTAPgSQAUgXACgGQAGgaAZggQAHgMAMgoQAJghAQgPQgEgeAXgUQgFgNAKgKIAQgSQgBgXADgJQAGgQAUgEQgIgUAIgVIATgmIAIgZQAGgOAIgJQABgaARgaIAKgTIAxiBQADgSADgJQAFgOAQgDQgIgJACgKQACgGAIgLIAKgeQAEgiAPgRIALgTQABgkASgaIAnhwQAHgHACgKIADgTQgFgPAIgLIASgWQgEgQAGgSQADgKALgUIABgPQACgHAHgFIADgJQgCgUAKgLQgCgUALgQIACgEIACgTQgCgIAJgDQAHg2AWgvQABgcAKgOIAUhYQgCgFAEgDQgBgPABgHQACgNAGgIIAHg3QAFgfAJgXIAAgZQACgOAIgKIAAgVQABgNAHgIIADAGIABgBQgCgBgBgEQAAgdAJgkQAEgSAPguIANgoQACgfANgoIAYhEQADg6ACgRQAEgqAKgfQgHgsAKhDQANhbAAgSQACgiAGgeQAEgTAGgHQAKgKATAJQARAFgDAWIgIBYQgGAzgJAkQACAFgDADQAAAlgCASQgCAfgHAYQgCAhgCBBQgFA4gSAmQgIA0gNAaQAAAVgKALIgDASIgSA+IgGApQgFAYgIAPQACAegKAVIABADIgDADQgDA4gPAqIgCAFQgJAJgCAOIAAAZQgBAMABAZQAAAWgJAOQgLAFABAUQABATgMAFQAAAFABALQAAAKgKADIgVBZQAFAbgOAQQgLAOgEAjQgDAigOAOIgKAKIgIAUIAIAHIgHADQACAxgaAwQgIArgSAkIgCAEQgEAMgFAZQgGAVgPALQAAAFgBAFQAFAagYAOQAAAFgCAEQAFAagNAcIgcAvQgDAmgUAfQgCACgEAPQgEAMgJADIgBAcQgBAQgDAGQgFAMgLAFIgVA9QACAYgTAQQgBAdgZAqQgcAwgFAVQgBAggSAWQACALgLANQgMAOAAAIQADAVgOAIIgHAdQgGAQgMAIQgEAJgBATQgDARgQAEIABAAQAEAIgGAIIgKANQAFAOgIAOIgPAXIgTAeQgGAcgSAJQAAAUgTAMQgHAagTAPIgYAnQgDAQgPAPQgJAdgXATQgFAXgQAGQgEARgYAQQgEAJgIAIIgQANIgzAyQgJAKgKAAQgFAAgFgCgAh4NuIADAAIAAgCg");
        mask.setTransform(53.3, 147.8);

        // grdt\
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -110
        }, 0).wait(1).to({
            y: -67.1
        }, 0).wait(1).to({
            y: -24.2
        }, 0).wait(1).to({
            y: 18.7
        }, 0).wait(1).to({
            y: 61.6
        }, 0).wait(1).to({
            y: 104.4
        }, 0).wait(1).to({
            y: 147.3
        }, 0).wait(1).to({
            y: 190.2
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 272
        }, 0).wait(1).to({
            y: 310.9
        }, 0).wait(1).to({
            y: 349.8
        }, 0).wait(1).to({
            y: 388.7
        }, 0).wait(1).to({
            y: 427.6
        }, 0).wait(1).to({
            y: 466.5
        }, 0).wait(1).to({
            y: 505.4
        }, 0).wait(1).to({
            y: 544.3
        }, 0).wait(1).to({
            y: 583.2
        }, 0).wait(1).to({
            y: 622.1
        }, 0).wait(18));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 106.7, 295.6);


    (lib.ROD2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // ROD (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        var mask_graphics_4 = new cjs.Graphics().p("Aj9bwQgJgBgIgLQgKgOAOgSIAtg3QAAgRAQgZIAHgXQAEgNAKgFIABgIIgDgHIABgDQgEgdAWgXIAJgeQAGgSAJgKQgDgOAGgOQADgKALgPIADgRIAKgqQAHgYALgQQAGg0APgbIAVhZIAGgzQAFgcAIgWIABgdQgEgMAGgKQAEgHAMgJQgNgPAHgVQAJgegBgGQgDgWAMgIIABgKIAKhhQAHg6AJglIACgmQgDgVACgLQADgRAQgJQgMgJAAgOQAAgJAGgPQADgGAIAEQAMAFADAAQAAgHgOgPQgMgNAIgNQgFgcAZgXIgCgJQgOgQAGgYQAKgaAAgNQACgXAGghIAKg4IACgpQACgWAHgRIAQiQQgBgJAEgHIAMhhQACiLAPhzIADgaQgDgeABgSQACgaAHgUIADguQgEgmAMgjIAAAAIACgSQgCgmABgTQACghASgUIgJgUIAKi0QgBglAAgTQAAggAIgYIADgbIAAgLIgBguQABgbAIgUIACgQQAIhwABidIABkOIADgVIAFgWQAGgNAKACQAGABALAJIAGAHIAAABIACADQANATgCAbQAAAHgJApIABAEQAAADgCACIgBAHIgJAWQADAFAKAJQAGAJgLAIQgLAJAGALQAHAQAAACIAEAVQABAMgFAIIgBAeQAOAMgJAWQgKAYAGAJIgHAEIAAAAIADADQADgCABgFQAIAJgFAMQgFAQABAFQAHANgCARIgFAeIAAAqQAAAYgIAQQAAAEgDADQgIAUADApQADApgHATQgBAHABAjQACAZgLAPQACADgCAFQAJATgBAWQgBARgIAXIgBAnQADB3gVB8IgLARQAAADAGAGQAFAGgCAGIAAAmQABAXgHAOQAAACgDADIABA1QgCAegGAWQAAAEgCADIgMCyIABA0QAAAegHAVQABAEgDAEIgCA6QgCAwgRBHIAAATIAAAgQgBASgIAMIgRApQgHAXAPAVQADAFgCAIQgDAIgIADIgCAUQADAggGAoQgCAUgLA0QAAAKgDAIIgKAyQADAEgEADIABAXQgBANgIAHIgCAcIABAmQAAAXgJAPIgDAiQAEAcgMAaIACADIgCADIgCAdIgEAbQgEAPgLAIQAGArgHAcIAAAaQgBAPgIAJIgKAdIADAhQgBATgKAMIgKBEQADAEgFAFQgEAJgBAbQgBAZgKALIgCgHIgCAAIADAHQACAagGAeQgEATgMAiQgBAegSAVQADAFgEADQgCAIACARQgBAPgKAIQgDAEgFgBQAEAYgIAbQgEANgPAiQgCARgEAJQgHAMgPAEQABAFgBAEQADARgHATQgEAMgLAWQACAVgPAcQABAKgGAJIgNAOIgBAPQgDAIgHAEIAAABIAAAAQgFARgPARIgdAcQgJAIgJAAIgCAAg");

        this.timeline.addTween(cjs.Tween.get(mask).to({
            graphics: null,
            x: 0,
            y: 0
        }).wait(4).to({
            graphics: mask_graphics_4,
            x: 27.6,
            y: 177.7
        }).wait(41));

        // GRDT
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);
        this.instance._off = true;

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({
            _off: false
        }, 0).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -117.8
        }, 0).wait(1).to({
            y: -82.7
        }, 0).wait(1).to({
            y: -47.6
        }, 0).wait(1).to({
            y: -12.5
        }, 0).wait(1).to({
            y: 22.6
        }, 0).wait(1).to({
            y: 57.6
        }, 0).wait(1).to({
            y: 92.7
        }, 0).wait(1).to({
            y: 127.8
        }, 0).wait(1).to({
            y: 162.9
        }, 0).wait(1).to({
            y: 198
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 265.5
        }, 0).wait(1).to({
            y: 297.9
        }, 0).wait(1).to({
            y: 330.3
        }, 0).wait(1).to({
            y: 362.7
        }, 0).wait(1).to({
            y: 395.1
        }, 0).wait(1).to({
            y: 427.6
        }, 0).wait(1).to({
            y: 460
        }, 0).wait(1).to({
            y: 492.4
        }, 0).wait(1).to({
            y: 524.8
        }, 0).wait(1).to({
            y: 557.2
        }, 0).wait(1).to({
            y: 589.6
        }, 0).wait(1).to({
            y: 622.1
        }, 0).wait(18));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = null;


    (lib.ROD1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // rod (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AmqdWQgKgjALgjQAJgaAYgkQADgoAQgeQgCgQAGgQQADgKALgTIANgUQgDgNAIgNIAOgXQgBgDAAgGQgFgSAHgUQAFgOANgTIAAgBQAEgmAZg2QgBgEADgEQAAgNAHgRQAKgUADgKQgBgFADgEIANhIQAJgqAUgZIgCgLQACgkAMgtIAXhPIABgbQABgOAKgJQACgcACgKQAEgUAJgPQACgbADgNQAFgWAUgJQgbgeAmgQQAOgKgIgZQgHgaANgJQAEgfAFgRQAHgZAPgSQgEgSAAgIQABgOAJgLQAJh0AqiFIACgTIALhCQAIgmAKgbIAShQQACguAPglIACgGQAAgpAUg8QAEgyAQgeQgHgfARgbQgBgTABgIQACgPAIgLQgDgEAEgCQABgzASgqQAAgfALgQIABgaQACgPAHgJIABgLQgDgMAGgSQAHgXAAgGQgBg2AUglIABgWQABgNAGgIIADglIAKgnQgDgIAIgEIAEgeQACgTAIgKIAUhPQgBgYAGgeIAOg4IAHglQgBgDAEgPQgBgeABgOQACgZAHgSQgDgFAFgDIAMh4QgFgqANgdIgBAAIAAg8QACgiAHgaIADgnQADgfACgPQAFgaAJgTQACg7ARgrQgDgEAEgDIAGgtIAIgsQAEgRAGgIQAJgLAQADQAOADADANQACAJgDAQIgXBvIgGgCIAAABQADACADgBQgDA0gTA6IAAAbQgBAQgIAKQACAFgDACQgCAFACAbQACAUgLALIACA2QgBAegNAWQAHAVgCAdIgFAyQAJAcgTAhQAAAfgJAjQgIAkgKAKQgBAGAIARQAHAOgIAKIgSAfQAUAQgTANIAEAQQABAIgFAHQgNARgCAfQgEAsgCAHQgBAHgBAOQgBAMgIAHQgBAJACARQAAAQgJAJQgBAzgTAyQABAcgKAOQABAkgMAVQgFA4gNAbQAAAEgDADQAAAhgKArQgFAZgOAxQADAjgNAYIgKAeQgBA3gPAtQgBAHgEAEQACAXgOAhQgQAngCAPQAIALABAEQABAIgKAGQgFAIADAUQAEATgMAJQgCAEgFAAQABAIAGAQQADAOgNAJQgKAMACAeQACAdgNAMQACAFgEADQAEAPgMAQIgBATIgUBRIgIAKQgDAIABAcQABAWgJAMQACAIgFAIIgKANQgDBRgfBvQgDAFABAUQAAAPgMAGQgGADgBAHIgCANQgBAYgDANQgEAVgKAOIgDAcQgCAagQAYQADAcgNAPIgBAZQgBAOgIAJIgLAdQAEAKgIAPQgJAQACAIQADAlgUAkIgBARQgBAKgJAEIgBAbQABAfgUAfQACAEgEADQAEArgWAnQgBAggFAPQgHAZgSAPQgGAQgHAlQgGAjgHASQgEALgFADQgFADgKgBQADADgCAEQAIAlgNAnQgJAcgZAoQgBApgIAbQgKAjgXAaQAEASgIAXIgQAnQgDAVgKAGQgEADgFAAQgJAAgMgIgAiuPaIADACIABgCIAAgBIgDgCgAE81IIAEgDIgEgCgAGX7EgAGX7Eg");
        mask.setTransform(43.2, 188.6);

        // GRDT
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -117.8
        }, 0).wait(1).to({
            y: -82.7
        }, 0).wait(1).to({
            y: -47.6
        }, 0).wait(1).to({
            y: -12.5
        }, 0).wait(1).to({
            y: 22.6
        }, 0).wait(1).to({
            y: 57.6
        }, 0).wait(1).to({
            y: 92.7
        }, 0).wait(1).to({
            y: 127.8
        }, 0).wait(1).to({
            y: 162.9
        }, 0).wait(1).to({
            y: 198
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 265.5
        }, 0).wait(1).to({
            y: 297.9
        }, 0).wait(1).to({
            y: 330.3
        }, 0).wait(1).to({
            y: 362.7
        }, 0).wait(1).to({
            y: 395.1
        }, 0).wait(1).to({
            y: 427.6
        }, 0).wait(1).to({
            y: 460
        }, 0).wait(1).to({
            y: 492.4
        }, 0).wait(1).to({
            y: 524.8
        }, 0).wait(1).to({
            y: 557.2
        }, 0).wait(1).to({
            y: 589.6
        }, 0).wait(1).to({
            y: 622.1
        }, 0).wait(22));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 86.5, 377.3);

})(magnetisedTrees.lib, magnetisedTrees.images, createjs);

Pathways.animation.addAnimation('magnetisedTrees', magnetisedTrees);

Pathways.components.gallery.aldinisExperiments = {
    data: {
        location: '_assets/galleries/aldinis-experiments/',
        images: [{
            image: 'L0001964',
            text: '1/11: Animal electricity produced on frog legs.'
        }, {
            image: 'L0011096',
            text: '2/11: Galvanism experiments on people&hellip;'
        }, {
            image: 'L0023892',
            text: '3/11: &hellip;and animals.'
        }, {
            image: 'L0023893',
            text: '4/11: And animals’ heads.'
        }, {
            image: 'L0023894',
            text: '5/11: Human dissection without heads&hellip;'
        }, {
            image: 'L0023895',
            text: '6/11: &hellip;and with.'
        }, {
            image: 'L0023897',
            text: '7/11: Galvanism experiment with dog.'
        }, {
            image: 'L0023898',
            text: '8/11: More frogs’ legs.'
        }, {
            image: 'L0023899',
            text: '9/11: Galvanic apparatus.'
        }, {
            image: 'L0029687',
            text: '10/11: Frogs’ legs experiment - how to. Part I'
        }, {
            image: 'L0029689',
            text: '11/11: Frogs’ legs experiment - how to. Part II'
        }, ]
    }
};

Pathways.components.gallery.hypnotisedWomen = {
    data: {
        location: '_assets/galleries/hypnotised-women/',
        images: [{
            image: 'L0000476',
            text: '1/6: Most images of mesmerism and hypnotism show men treating women in manipulative or exploitative ways.'
        }, {
            image: 'L0034228',
            text: '2/6: A corrupt old man tries to seduce a woman by urging her to take a hypnotic draught.'
        }, {
            image: 'L0034922',
            text: '3/6: A mesmeric physician taking advantage of his female patient.'
        }, {
            image: 'V0006760',
            text: '4/6: Jean-Martin Charcot demonstrates hysteria in a hypnotised subject at the Salpêtrière hospital in Paris, 1888.'
        }, {
            image: 'V0011793',
            text: '5/6: An exotic doctor magnetises a young woman; her husband looks on.'
        }, {
            image: 'V0016621',
            text: '6/6: A female patient being hypnotised in front of a group of four men.'
        }, ]
    }
};

Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('gonad-man', function(panelId, panelEl, panelAttrs) {
    var $panel = $(panelEl);

    var scene1 = new ScrollScene({
            triggerElement: $panel,
            triggerHook: 'top',
            duration: function() {
                return $panel.outerHeight();
            }
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
        });

    return scene1;
});

Pathways.components.quiz.guessTheTumour = {
    data: {
        'title': 'The Esdaile Game',
        'images': '_assets/quizzes/guess-the-tumour',
        'questions': [{
            'image': 'q1-300h.jpg',
            'title': 'How much did this jaw-dropping tumour weigh?',
            'answers': ['2 pounds', '5 pounds', '10 pounds', '23 pounds'],
            'correct': 2
        }, {
            'image': 'q2-300h.jpg',
            'title': 'How long did it take Esdaile to remove this whopping 103 pound tumour?',
            'answers': ['10 seconds', '1 hour', '6 and a half minutes', '6 hours'],
            'correct': 3
        }, {
            'image': 'q3-300h.jpg',
            'title': 'What was the weight of this extremely uncomfortable-looking tumour?',
            'answers': ['80 pounds', '40 pounds', '400 pounds', '60 pounds'],
            'correct': 1
        }, {
            'image': 'q4-300h.jpg',
            'title': 'How much did this tumour weigh before Esdaile got it off the patient’s chest?',
            'answers': ['10 pounds', '80 pounds', '60 pounds', '40 pounds'],
            'correct': 1
        }, {
            'image': 'q5-300h.jpg',
            'title': 'This 90 pound tumour was removed by Esdaile without anaesthetic. But how long did it take?',
            'answers': ['It never was removed', '30 minutes', '9 minutes', '3 minutes'],
            'correct': 4
        }, ]
    }
};

Pathways.scrollSceneCtrl.addSinglePanelScrollFactory('india', function() {
    var $panel,
        $boats,
        ratio = 1050 / 1900,
        boat_ratio = 322 / 1900,
        boat_height = (boat_ratio * window.innerWidth);

    function setBoatStyle(e) {
        boat_height = (boat_ratio * window.innerWidth);
        if ($boats.length) {
            $boats.css({
                bottom: 0,
                height: boat_height
            });
        }
    }

    return {
        load: function(panelId, panelEl, panelAttrs) {
            $panel = $(panelEl);
            $boats = $panel.find('.boats');
            setBoatStyle();
            $(window).on('resize', setBoatStyle);
        },
        getScenes: function(panelId, panelEl, panelAttrs) {
            var $panel = $(panelEl),
                $boats = $boats || $panel.find('.boats');

            var scene1 = new ScrollScene({
                    triggerElement: $panel,
                    triggerHook: 'top',
                    duration: function() {
                        return $panel.outerHeight();
                    }
                })
                .on('enter', function() {
                    $panel.addClass('current-scroll-panel');
                }).on('leave', function() {
                    $panel.removeClass('current-scroll-panel');
                });

            return scene1;
        },
        unload: function() {
            $(window).off('resize', setBoatStyle);
            $boats.removeAttr('style');
        }
    };
});

Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('anna-o', function(panelId, panelEl, panelAttrs) {
   var positions = [
        { x: -57,   y: -107 },
        { x: 79,    y: 32 },
        { x: 178,   y: 178 },
        { x: -144,  y: 106 },
        ],
        $panel = $(panelEl),
        scenes = [],
        $fragments = $(panelEl).find('.fragmented');

    $fragments.each(function(index) {

        var $this = $(this);
        var x = positions[index].x,
            y = positions[index].y;

        $this.css( { 'transform': 'translate('+ x +'px, '+ y +'px)' } );

    });

    $fragments.each(function() {
        var tween = TweenMax.to( $(this), 1, { x: 0, y: -3 } );

        var scene = new ScrollScene({
                triggerElement: panelEl,
                triggerHook:    'top',
                duration:       function() { return $panel.height() - 400; },
                offset:         50,
            })
            .setTween(tween);

        scenes.push(scene);
    });

    return scenes;
});

Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('office-2', function(panelId, panelEl, panelAttrs) {
    var $panel = $(panelEl);

    var scene1 = new ScrollScene({
            triggerElement: $panel,
            triggerHook: 'top',
            duration: function() {
                return $panel.outerHeight() - $('.fork').outerHeight();
            }
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
        });

    return scene1;
});

Pathways.components.slidingModal.johnTradescant = {
    data: {
        '1.1': {
            'image': '/pathways/2-the-collectors/_assets/1-curious-gardener/tradescant/full/1.1-large.jpg',
            'title': 'Smilax Hortensis (kidney bean)',
            'download': 'http://wellcomelibrary.org/actual/b20723143/0/f87d84f4-d665-4102-b90f-7b76c4f70b5d/jp2?download=true',
            'ga': 'the-collectors - curious-gardener - john-tradescant - l2 open sliding panel 1.1',
            'fx': 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-paper-slide.mp3',
        },
        '1.2': {
            'image': 'data-image="/pathways/2-the-collectors/_assets/1-curious-gardener/tradescant/full/1.2-large.jpg',
            'title': 'Hedera Nigra (black ivy)',
            'download': 'http://wellcomelibrary.org/actual/b20723143/0/dd26de48-0556-431a-bffb-abf9885ed89a/jp2?download=true',
            'ga': 'the-collectors - curious-gardener - john-tradescant - l2 open sliding panel 1.2',
            'fx': 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-paper-slide.mp3',
        },
        '1.3': {
            'image': '/pathways/2-the-collectors/_assets/1-curious-gardener/tradescant/full/1.3-large.jpg',
            'title': 'Tilia Foemina (limetree)"',
            'download': 'http://wellcomelibrary.org/actual/b20723143/0/42e2e4df-a131-4f64-9181-af53ad6ec59b/jp2?download=true',
            'ga': 'the-collectors - curious-gardener - john-tradescant - l2 open sliding panel 1.3',
            'fx': 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-paper-slide.mp3',
        },
        '1.4': {
            'image': '/pathways/2-the-collectors/_assets/1-curious-gardener/tradescant/full/1.4-large.jpg',
            'title': 'Daffodils',
            'download': 'http://wellcomelibrary.org/actual/b11827786/0/87530b09-1873-4a7e-a68f-3efd00e7690c/jp2?download=true',
            'ga': 'the-collectors - curious-gardener - john-tradescant - l2 open sliding panel 1.4',
            'fx': 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-paper-slide.mp3',
        },
    }
};

Pathways.scrollSceneCtrl.addSinglePanelScrollFactory('duke-of-buckingham', function() {

    var $clip,
        $pence,
        startY,
        ratio = 1900 / 1050;

    // Keep the clipping mask the correct height in relation to the 'cover' background
    function doResize(e) {
        if ($pence) $pence.css('transform', 'translate(0, ' + (window.scrollY - startY) + 'px)');
        if (!$clip) return;

        if ((window.innerWidth / window.innerHeight) > ratio) {
            var newHeight = window.innerWidth / ratio,
                percent = parseInt(((newHeight / 100) * 88), 10),
                difference = parseInt((newHeight - window.innerHeight), 10);

            $clip.css({
                'height': percent,
                'transform': 'translate(0, ' + -difference + 'px)'
            });
        } else
            $clip.css({
                'height': '88%',
                'transform': 'none'
            });
    }

    return {
        load: function(panelId, panelEl, panelAttrs) {
            $clip = $(panelEl).find('.clip');
            $pence = $(panelEl).find('.pence');
        },
        getScenes: function(panelId, panelEl, panelAttrs) {
            var $panel = $(panelEl),
                startY,
                coinBoxFx = new Audio('http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-coin-into-box.mp3'),
                coinOnPage = new Audio('http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-coin-onto-screen.mp3'),
                scenes = [],
                initCoinOffset = 380;

            scenes.push(new ScrollScene({
                    triggerElement: panelEl,
                    triggerHook: 'top',
                    duration: Pathways.panelHeight,
                })
                .on('enter', function(e) {
                    doResize();
                    window.addEventListener('resize', doResize);

                    if (e.scrollDirection == 'FORWARD') {
                        startY = window.scrollY;
                    } else {
                        startY = window.scrollY - (Pathways.panelHeight - 100);
                    }
                })
                .on('progress', function(e) {
                    $pence.css('transform', 'translate(0, ' + (window.scrollY - startY) + 'px)');
                }).on('leave', function() {
                    window.removeEventListener('resize', doResize);
                }));

            scenes.push(new ScrollScene({
                    triggerElement: panelEl,
                    triggerHook: 'top',
                    offset: initCoinOffset
                })
                .on('start', function(e) {
                    // console.log('coin in box');
                    Pathways.media.ctrl.playMediaOnFxChannel(coinBoxFx);
                }));

            scenes.push(new ScrollScene({
                    triggerElement: $pence,
                    triggerHook: 'bottom',
                    offset: 20
                })
                .on('start', function(e) {
                    if (e.scrollDirection == 'FORWARD') {
                        // console.log('coin on page');
                        Pathways.media.ctrl.playMediaOnFxChannel(coinOnPage);
                    }
                }));

            return scenes;
        },
        unload: function(panelId, panelEl, panelAttrs) {
            window.removeEventListener('resize', resizeClip);
        }
    };
});


Pathways.components.cropZoom.uniqueArtifacts = {
    data: {
        'croc': {
            'image': '/pathways/2-the-collectors/1-curious-gardener/_assets/crop-zoom/crocodile.jpg',
            'title': '',
            'text': 'Tradescant was attracted by large or exotic items. His requests to British ships included pleas for ‘the biggest that canbe gotten’ and ‘any thing that is strang’.',
            'position': 'right'
        },
        'person': {
            'image': '/pathways/2-the-collectors/1-curious-gardener/_assets/crop-zoom/people.jpg',
            'text': 'Royal apothecary John Parkinson described his friend, and self-made man, John Tradescant as ‘that worthy, curious, and diligent searcher and preserver of all natures rarities and varieties’.',
            'position': 'left'
        },
        'bird': {
            'image': '/pathways/2-the-collectors/1-curious-gardener/_assets/crop-zoom/birds.jpg',
            'text': 'One of Tradescant’s earliest documented collecting experiences occurred on a 16-week sea voyage to the Russian city of Archangel. When a strange bird, ‘whose like I yet never sawe’, flew onto the ship’s deck, it was caught and given to Tradescant.',
            'position': 'right'
        },
        'cabinet': {
            'image': '/pathways/2-the-collectors/1-curious-gardener/_assets/crop-zoom/cabinet.jpg',
            'text': 'Tradescant’s rarities were ultimately acquired, in disputed circumstances, by the lawyer and alchemist Elias Ashmole. Ashmole later left the collection to the University of Oxford, where it formed the basis of the Ashmolean Museum.',
            'position': 'right'
        },
        'books': {
            'image': '/pathways/2-the-collectors/1-curious-gardener/_assets/crop-zoom/books.jpg',
            'text': 'New World explorer John Smith bequeathed half his library of books to Tradescant.',
            'position': 'left'
        },
        'window': {
            'image': '/pathways/2-the-collectors/1-curious-gardener/_assets/crop-zoom/window.jpg',
            'text': 'After establishing what would become Britain’s first museum, Tradescant clocked up another first. He became the initial Keeper of the Oxford Physic Garden, England’s first botanic garden.',
            'position': 'left'
        }
    }
};

Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('graunt-records', function(panelId, panelEl, panelAttrs) {
    var $panel = $(panelEl);

    var scene = new ScrollScene({
            triggerElement: panelEl,
            triggerHook: 'top',
            duration: Pathways.panelHeight,
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
        });

    return scene;

});

Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('death-infographic', function(panelId, panelEl, panelAttrs) {
    var $panel = $(panelEl),
        $infoBox = $panel.find('.info-box'),
        $inputContainer = $panel.find('.input-container');
    //console.log(infoBox, inputContainer);


    var scene = new ScrollScene({
            triggerElement: panelEl,
            duration: Pathways.panelHeight
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
            if ($infoBox.css('display') === 'block') {
                $infoBox.css('display', 'none');
            }
        });

    return scene;

});

window.TheCollectors = {};

$(function() {
    //Initialise the interface object with the Data object

    if ($('#radial').length === 0) return;

    var SCREEN_MODE;
    if ($(window).width() > 480) {
        SCREEN_MODE = TheCollectors.SCREEN_MODE_DESKTOP;
    } else {
        SCREEN_MODE = TheCollectors.SCREEN_MODE_MOBILE;
    }

    TheCollectors.Interface.Init(SCREEN_MODE);


    $(window).resize(function() {
        if (($(window).width() > 480) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_MOBILE)) {
            SCREEN_MODE = TheCollectors.SCREEN_MODE_DESKTOP;
            TheCollectors.Interface.changeScreenMode(SCREEN_MODE);
            return;
        }

        if (($(window).width() < 480) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP)) {
            SCREEN_MODE = TheCollectors.SCREEN_MODE_MOBILE;
            TheCollectors.Interface.changeScreenMode(SCREEN_MODE);
            return;
        }

    });

});


TheCollectors.SCREEN_MODE_MOBILE = 'mobile';
TheCollectors.SCREEN_MODE_DESKTOP = 'desktop';

TheCollectors.getData = function(SCREEN_MODE) {
    if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
        return TheCollectors.data;
    } else if (SCREEN_MODE == TheCollectors.SCREEN_MODE_MOBILE) {
        var dataToReturn = [];
        for (var i = 0; i < TheCollectors.data.length; i++) {
            if (TheCollectors.data[i].mobileData) dataToReturn.push(TheCollectors.data[i]);
        }
        return dataToReturn;
    }
    console.log('NO DATA FOUND');
    return 'NO DATA FOUND';

};

TheCollectors.assetRoot = '_assets/infographics/death-collector/';

TheCollectors.data = [{

        name: "Abortive, and stilborn",
        description: "These figures almost certainly include both deliberate abortions, brought on by imbibing herbal concoctions, and miscarriages. Since babies who died in the womb had not received baptism, stillborns were either not buried at all, or were interred in secret, unconsecrated locations.",
        ValueLabelPos_desktop: {
            x: 20,
            y: -232
        },
        mobileData: false,
        imgID: 0,
        data: [{
            year: 1629,
            value: 499
        }, {
            year: 1630,
            value: 439
        }, {
            year: 1631,
            value: 410
        }, {
            year: 1632,
            value: 445
        }, {
            year: 1633,
            value: 500
        }, {
            year: 1634,
            value: 475
        }, {
            year: 1635,
            value: 507
        }, {
            year: 1636,
            value: 523
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 335
        }, {
            year: 1648,
            value: 329
        }, {
            year: 1649,
            value: 327
        }, {
            year: 1650,
            value: 351
        }, {
            year: 1651,
            value: 389
        }, {
            year: 1652,
            value: 381
        }, {
            year: 1653,
            value: 384
        }, {
            year: 1654,
            value: 433
        }, {
            year: 1655,
            value: 483
        }, {
            year: 1656,
            value: 419
        }, {
            year: 1657,
            value: 463
        }, {
            year: 1658,
            value: 467
        }, {
            year: 1659,
            value: 421
        }, {
            year: 1660,
            value: 544
        }]
    },

    {
        name: "Aged",
        description: "'Aged' referred to deaths when over 60, or perhaps 70, years old. Graunt calculated that only two or three of every 100 individuals born in London would live to such a ripe old age. His own father was one of these few, along with his friend Samuel Pepys. Graunt himself died at the age of 54.",
        ValueLabelPos_desktop: {
            x: 42,
            y: -110
        },
        mobileData: false,
        imgID: 1,
        data: [

            {
                year: 1629,
                value: 579
            }, {
                year: 1630,
                value: 712
            }, {
                year: 1631,
                value: 661
            }, {
                year: 1632,
                value: 671
            }, {
                year: 1633,
                value: 704
            }, {
                year: 1634,
                value: 623
            }, {
                year: 1635,
                value: 794
            }, {
                year: 1636,
                value: 714
            }, {
                year: 1637,
                value: "NO DATA"
            }, {
                year: 1638,
                value: "NO DATA"
            }, {
                year: 1639,
                value: "NO DATA"
            }, {
                year: 1640,
                value: "NO DATA"
            }, {
                year: 1641,
                value: "NO DATA"
            }, {
                year: 1642,
                value: "NO DATA"
            }, {
                year: 1643,
                value: "NO DATA"
            }, {
                year: 1644,
                value: "NO DATA"
            }, {
                year: 1645,
                value: "NO DATA"
            }, {
                year: 1646,
                value: "NO DATA"
            }, {
                year: 1647,
                value: 916
            }, {
                year: 1648,
                value: 835
            }, {
                year: 1649,
                value: 889
            }, {
                year: 1650,
                value: 696
            }, {
                year: 1651,
                value: 780
            }, {
                year: 1652,
                value: 834
            }, {
                year: 1653,
                value: 864
            }, {
                year: 1654,
                value: 974
            }, {
                year: 1655,
                value: 743
            }, {
                year: 1656,
                value: 892
            }, {
                year: 1657,
                value: 869
            }, {
                year: 1658,
                value: 1176
            }, {
                year: 1659,
                value: 909
            }, {
                year: 1660,
                value: 1095
            }
        ]
    },

    {
        name: "Ague, and Fever",
        description: "Ague and fever are rather catch-all symptoms, which may result from any number of conditions. When William Shakespeare died on his fifty-third birthday in 1616 he had been suffering fevers for several weeks. No one is quite sure what caused his death, though syphilis, typhoid, influenza and alcoholism have all been mooted.",
        ValueLabelPos_desktop: {
            x: 110,
            y: -135
        },
        mobileData: false,
        imgID: 2,
        data: [{
            year: 1629,
            value: 956

        }, {
            year: 1630,
            value: 1091
        }, {
            year: 1631,
            value: 1115
        }, {
            year: 1632,
            value: 1108
        }, {
            year: 1633,
            value: 953
        }, {
            year: 1634,
            value: 1279
        }, {
            year: 1635,
            value: 1622
        }, {
            year: 1636,
            value: 2360
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 1260
        }, {
            year: 1648,
            value: 884
        }, {
            year: 1649,
            value: 751
        }, {
            year: 1650,
            value: 970
        }, {
            year: 1651,
            value: 1038
        }, {
            year: 1652,
            value: 1212
        }, {
            year: 1653,
            value: 1282
        }, {
            year: 1654,
            value: 1371
        }, {
            year: 1655,
            value: 689
        }, {
            year: 1656,
            value: 875
        }, {
            year: 1657,
            value: 999
        }, {
            year: 1658,
            value: 1800
        }, {
            year: 1659,
            value: 2303
        }, {
            year: 1660,
            value: 2148
        }]
    },

    {
        name: "Cancer, Gangrene, and Fistula",
        description: "Cancer was only diagnosed when it could be observed externally, with most cases seen in the breast or face. Blamed on an excess of melancholic black bile, it was perceived as a fierce and ravenous evil that gnawed away the body. The grievous symptoms caused many sufferers to subject themselves to surgical treatments, which brought their own high risks of death.",
        ValueLabelPos_desktop: {
            x: 220,
            y: -130
        },
        mobileData: false,
        imgID: 3,
        data: [

            {
                year: 1629,
                value: 20
            }, {
                year: 1630,
                value: 14
            }, {
                year: 1631,
                value: 23
            }, {
                year: 1632,
                value: 28
            }, {
                year: 1633,
                value: 27
            }, {
                year: 1634,
                value: 30
            }, {
                year: 1635,
                value: 24
            }, {
                year: 1636,
                value: 30
            }, {
                year: 1637,
                value: "NO DATA"
            }, {
                year: 1638,
                value: "NO DATA"
            }, {
                year: 1639,
                value: "NO DATA"
            }, {
                year: 1640,
                value: "NO DATA"
            }, {
                year: 1641,
                value: "NO DATA"
            }, {
                year: 1642,
                value: "NO DATA"
            }, {
                year: 1643,
                value: "NO DATA"
            }, {
                year: 1644,
                value: "NO DATA"
            }, {
                year: 1645,
                value: "NO DATA"
            }, {
                year: 1646,
                value: "NO DATA"
            }, {
                year: 1647,
                value: 26
            }, {
                year: 1648,
                value: 29
            }, {
                year: 1649,
                value: 31
            }, {
                year: 1650,
                value: 19
            }, {
                year: 1651,
                value: 31
            }, {
                year: 1652,
                value: 53
            }, {
                year: 1653,
                value: 36
            }, {
                year: 1654,
                value: 37
            }, {
                year: 1655,
                value: 73
            }, {
                year: 1656,
                value: 31
            }, {
                year: 1657,
                value: 24
            }, {
                year: 1658,
                value: 35
            }, {
                year: 1659,
                value: 63
            }, {
                year: 1660,
                value: 52
            }
        ]
    },

    {
        name: "Childbed",
        description: "In the words of one seventeenth-century mother, the pain of childbirth was an 'exquisite torment' akin to the rack, but it was also a spiritual test of faith and endurance. If mothers suffered well, even those who died in the bed where they had given birth would be saved after death.",
        ValueLabelPos_desktop: {
            x: 150,
            y: -37
        },
        mobileData: false,
        imgID: 4,
        data: [{
            year: 1629,
            value: 150
        }, {
            year: 1630,
            value: 157
        }, {
            year: 1631,
            value: 112
        }, {
            year: 1632,
            value: 171
        }, {
            year: 1633,
            value: 132
        }, {
            year: 1634,
            value: 143
        }, {
            year: 1635,
            value: 163
        }, {
            year: 1636,
            value: 230
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 161
        }, {
            year: 1648,
            value: 106
        }, {
            year: 1649,
            value: 114
        }, {
            year: 1650,
            value: 117
        }, {
            year: 1651,
            value: 206
        }, {
            year: 1652,
            value: 213
        }, {
            year: 1653,
            value: 158
        }, {
            year: 1654,
            value: 192
        }, {
            year: 1655,
            value: 177
        }, {
            year: 1656,
            value: 201
        }, {
            year: 1657,
            value: 236
        }, {
            year: 1658,
            value: 225
        }, {
            year: 1659,
            value: 226
        }, {
            year: 1660,
            value: 194
        }]
    },

    {
        name: "Chrisomes, and Infants",
        description: "Almost ten per cent of babies didn't survive their first month of life. These 'chrisomes' died as a result of birth trauma, tetanus contracted when the umbilical cord was cut, low weight or inherited birth defects. Graunt's figures also include the deaths of 'infants', children who were not yet old enough to speak.",
        ValueLabelPos_desktop: {
            x: 220,
            y: 10
        },
        ValueLabelPos_mobile: {
            x: 230,
            y: -230
        },
        mobileData: true,
        imgID: 5,
        data: [{
            year: 1629,
            value: 1596

        }, {
            year: 1630,
            value: 2378
        }, {
            year: 1631,
            value: 2035
        }, {
            year: 1632,
            value: 2268
        }, {
            year: 1633,
            value: 2130
        }, {
            year: 1634,
            value: 2315
        }, {
            year: 1635,
            value: 2113
        }, {
            year: 1636,
            value: 1895
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 1369
        }, {
            year: 1648,
            value: 1254
        }, {
            year: 1649,
            value: 1065
        }, {
            year: 1650,
            value: 990
        }, {
            year: 1651,
            value: 1237
        }, {
            year: 1652,
            value: 1280
        }, {
            year: 1653,
            value: 1050
        }, {
            year: 1654,
            value: 1343
        }, {
            year: 1655,
            value: 1089
        }, {
            year: 1656,
            value: 1393
        }, {
            year: 1657,
            value: 1162
        }, {
            year: 1658,
            value: 1144
        }, {
            year: 1659,
            value: 858
        }, {
            year: 1660,
            value: 1123
        }]
    },

    {
        name: "Consumption, and Cough",
        description: "Graunt was dubious about the reliability of 'consumption' when reported as a cause of death in the Bills. The searchers, he wrote, might 'after the mist of a Cup of Ale' or a bribe apply it to any cadaver that looked in any way emaciated or lean.",
        ValueLabelPos_desktop: {
            x: 240,
            y: 75
        },
        mobileData: false,
        imgID: 6,
        data: [{
            year: 1629,
            value: 1827

        }, {
            year: 1630,
            value: 1910
        }, {
            year: 1631,
            value: 1713
        }, {
            year: 1632,
            value: 1797
        }, {
            year: 1633,
            value: 1754
        }, {
            year: 1634,
            value: 1955
        }, {
            year: 1635,
            value: 2080
        }, {
            year: 1636,
            value: 2477
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 2423
        }, {
            year: 1648,
            value: 2200
        }, {
            year: 1649,
            value: 2388
        }, {
            year: 1650,
            value: 1988
        }, {
            year: 1651,
            value: 2350
        }, {
            year: 1652,
            value: 2410
        }, {
            year: 1653,
            value: 2286
        }, {
            year: 1654,
            value: 2868
        }, {
            year: 1655,
            value: 606
        }, {
            year: 1656,
            value: 3184
        }, {
            year: 1657,
            value: 2757
        }, {
            year: 1658,
            value: 3610
        }, {
            year: 1659,
            value: 2982
        }, {
            year: 1660,
            value: 3414
        }]
    },

    {
        name: "Convulsion",
        description: "Convulsion only established itself as a reported cause of death in the seventeenth century. A symptom usually seen in young children, convulsions might be an outward sign of any number of underlying infections or diseases, including smallpox.",
        ValueLabelPos_desktop: {
            x: 135,
            y: 95
        },
        mobileData: false,
        imgID: 7,
        data: [{
            year: 1629,
            value: 52
        }, {
            year: 1630,
            value: 87
        }, {
            year: 1631,
            value: 18
        }, {
            year: 1632,
            value: 241
        }, {
            year: 1633,
            value: 221
        }, {
            year: 1634,
            value: 386
        }, {
            year: 1635,
            value: 418
        }, {
            year: 1636,
            value: 709
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 684
        }, {
            year: 1648,
            value: 491
        }, {
            year: 1649,
            value: 530
        }, {
            year: 1650,
            value: 493
        }, {
            year: 1651,
            value: 569
        }, {
            year: 1652,
            value: 653
        }, {
            year: 1653,
            value: 606
        }, {
            year: 1654,
            value: 828
        }, {
            year: 1655,
            value: 702
        }, {
            year: 1656,
            value: 1027
        }, {
            year: 1657,
            value: 807
        }, {
            year: 1658,
            value: 841
        }, {
            year: 1659,
            value: 742
        }, {
            year: 1660,
            value: 1031
        }]
    }, {
        name: "Dropsy, and Tympany",
        description: "Dropsy was an ugly, uncomfortable condition, in which the body became bloated with liquid. Usually associated with drunkenness, we now know it to be a symptom of kidney or liver problems. Sufferers, who included writers Henry Fielding and Samuel Johnson, were treated by 'tapping' and endured the added stigma of bringing their deaths upon themselves.",
        ValueLabelPos_desktop: {
            x: 165,
            y: 220
        },
        ValueLabelPos_mobile: {
            x: 250,
            y: 180
        },
        mobileData: true,
        imgID: 8,
        data: [{
            year: 1629,
            value: 235

        }, {
            year: 1630,
            value: 252
        }, {
            year: 1631,
            value: 279
        }, {
            year: 1632,
            value: 280
        }, {
            year: 1633,
            value: 266
        }, {
            year: 1634,
            value: 250
        }, {
            year: 1635,
            value: 329
        }, {
            year: 1636,
            value: 389
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 185
        }, {
            year: 1648,
            value: 434
        }, {
            year: 1649,
            value: 422
        }, {
            year: 1650,
            value: 508
        }, {
            year: 1651,
            value: 444
        }, {
            year: 1652,
            value: 556
        }, {
            year: 1653,
            value: 617
        }, {
            year: 1654,
            value: 704
        }, {
            year: 1655,
            value: 660
        }, {
            year: 1656,
            value: 706
        }, {
            year: 1657,
            value: 631
        }, {
            year: 1658,
            value: 931
        }, {
            year: 1659,
            value: 646
        }, {
            year: 1660,
            value: 872
        }]
    }, {
        name: "Drowned",
        description: "Many of the city's drownings occurred under London Bridge, then the only thoroughfare spanning the Thames. In 1641, Queen Henrietta Maria's barge overturned while navigating the hazardous rapids beneath its arches and a Woman of the Bedchamber drowned. Londoners were also known to take their own lives by deliberately jumping from boats as they passed below the bridge.",
        ValueLabelPos_desktop: {
            x: 50,
            y: 145
        },
        mobileData: false,
        imgID: 9,
        data: [{
            year: 1629,
            value: 43

        }, {
            year: 1630,
            value: 33
        }, {
            year: 1631,
            value: 29
        }, {
            year: 1632,
            value: 34
        }, {
            year: 1633,
            value: 37
        }, {
            year: 1634,
            value: 32
        }, {
            year: 1635,
            value: 32
        }, {
            year: 1636,
            value: 45
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 47
        }, {
            year: 1648,
            value: 40
        }, {
            year: 1649,
            value: 30
        }, {
            year: 1650,
            value: 27
        }, {
            year: 1651,
            value: 49
        }, {
            year: 1652,
            value: 50
        }, {
            year: 1653,
            value: 53
        }, {
            year: 1654,
            value: 30
        }, {
            year: 1655,
            value: 43
        }, {
            year: 1656,
            value: 4
        }, {
            year: 1657,
            value: 63
        }, {
            year: 1658,
            value: 60
        }, {
            year: 1659,
            value: 57
        }, {
            year: 1660,
            value: 48
        }]
    }, {
        name: "Executed",
        description: "Criminals convicted of murder, wounding, robbery and rape all usually received the death penalty, though many were pardoned before being led to the scaffold. One convict who didn't get away was King Charles I, who was beheaded at Whitehall on January 30 1649, for 'High Treason and other high crimes'.",
        ValueLabelPos_desktop: {
            x: 10,
            y: 145
        },
        mobileData: false,
        imgID: 10,
        data: [{
            year: 1629,
            value: 19

        }, {
            year: 1630,
            value: 13
        }, {
            year: 1631,
            value: 12
        }, {
            year: 1632,
            value: 18
        }, {
            year: 1633,
            value: 13
        }, {
            year: 1634,
            value: 13
        }, {
            year: 1635,
            value: 13
        }, {
            year: 1636,
            value: 13
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 8
        }, {
            year: 1648,
            value: 17
        }, {
            year: 1649,
            value: 29
        }, {
            year: 1650,
            value: 43
        }, {
            year: 1651,
            value: 24
        }, {
            year: 1652,
            value: 12
        }, {
            year: 1653,
            value: 19
        }, {
            year: 1654,
            value: 21
        }, {
            year: 1655,
            value: 19
        }, {
            year: 1656,
            value: 22
        }, {
            year: 1657,
            value: 20
        }, {
            year: 1658,
            value: 18
        }, {
            year: 1659,
            value: 7
        }, {
            year: 1660,
            value: 18
        }]
    }, {
        name: "Fainted in a Bath",
        description: "Bathing was not only an unusual occurrence in the seventeenth century, it might also be considered dangerous. A popular pamphlet providing medical advice a century before had advised to 'use no baths or stoves' during outbreaks of plague. The publication explained that bathing opened up the skin's pores, so that 'venomous' air might infect the body.",
        ValueLabelPos_desktop: {
            x: -27,
            y: 195
        },
        mobileData: false,
        imgID: 11,
        data: [{
            year: 1629,
            value: 0

        }, {
            year: 1630,
            value: 0
        }, {
            year: 1631,
            value: 0
        }, {
            year: 1632,
            value: 0
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 0
        }, {
            year: 1635,
            value: 0
        }, {
            year: 1636,
            value: 0
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 0
        }, {
            year: 1648,
            value: 0
        }, {
            year: 1649,
            value: 0
        }, {
            year: 1650,
            value: 0
        }, {
            year: 1651,
            value: 0
        }, {
            year: 1652,
            value: 1
        }, {
            year: 1653,
            value: 0
        }, {
            year: 1654,
            value: 0
        }, {
            year: 1655,
            value: 0
        }, {
            year: 1656,
            value: 0
        }, {
            year: 1657,
            value: 0
        }, {
            year: 1658,
            value: 0
        }, {
            year: 1659,
            value: 0
        }, {
            year: 1660,
            value: 0
        }]
    }, {
        name: "Flox, and Small Pox",
        description: "Smallpox deaths are probably under-reported in the Bills, since the most severe form of the disease killed its victims so quickly the distinctive pustules had not yet erupted. Those who survived the feverish horror of the disease might, however, end up blinded, deafened or grossly disfigured by pits and holes.",
        ValueLabelPos_desktop: {
            x: -100,
            y: 195
        },
        mobileData: false,
        imgID: 12,
        data: [{
            year: 1629,
            value: 72

        }, {
            year: 1630,
            value: 40
        }, {
            year: 1631,
            value: 58
        }, {
            year: 1632,
            value: 531
        }, {
            year: 1633,
            value: 72
        }, {
            year: 1634,
            value: 1354
        }, {
            year: 1635,
            value: 293
        }, {
            year: 1636,
            value: 127
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 139
        }, {
            year: 1648,
            value: 400
        }, {
            year: 1649,
            value: 1190
        }, {
            year: 1650,
            value: 184
        }, {
            year: 1651,
            value: 525
        }, {
            year: 1652,
            value: 1279
        }, {
            year: 1653,
            value: 239
        }, {
            year: 1654,
            value: 812
        }, {
            year: 1655,
            value: 1294
        }, {
            year: 1656,
            value: 823
        }, {
            year: 1657,
            value: 835
        }, {
            year: 1658,
            value: 409
        }, {
            year: 1659,
            value: 1523
        }, {
            year: 1660,
            value: 354
        }]
    }, {
        name: "Found dead in the Streets",
        description: "Seventeenth-century dramatist Nathaniel Lee, known as the 'Mad Poet', was found dead in the street after a night of riot and extravagance. In his play Caesar Borgia, Lee had described death as unwelcome, but only because it delivered 'an eternal laziness'.",
        ValueLabelPos_desktop: {
            x: -160,
            y: 185
        },
        mobileData: false,
        imgID: 13,
        data: [{
            year: 1629,
            value: 18
        }, {
            year: 1630,
            value: 33
        }, {
            year: 1631,
            value: 26
        }, {
            year: 1632,
            value: 6
        }, {
            year: 1633,
            value: 13
        }, {
            year: 1634,
            value: 8
        }, {
            year: 1635,
            value: 24
        }, {
            year: 1636,
            value: 24
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 6
        }, {
            year: 1648,
            value: 6
        }, {
            year: 1649,
            value: 9
        }, {
            year: 1650,
            value: 8
        }, {
            year: 1651,
            value: 7
        }, {
            year: 1652,
            value: 9
        }, {
            year: 1653,
            value: 14
        }, {
            year: 1654,
            value: 4
        }, {
            year: 1655,
            value: 3
        }, {
            year: 1656,
            value: 4
        }, {
            year: 1657,
            value: 9
        }, {
            year: 1658,
            value: 11
        }, {
            year: 1659,
            value: 2
        }, {
            year: 1660,
            value: 6
        }]
    }, {
        name: "Grief",
        description: "The intense sorrow brought on by another's demise was an accepted cause of death in the Bills. When King Charles I was executed, the deaths of Scottish poet William Drummond, the Vice-Chancellor of the University of Oxford Dr Samuel Fell and Charles's second daughter Elizabeth were all attributed to grief.",
        ValueLabelPos_desktop: {
            x: -110,
            y: 70
        },
        ValueLabelPos_mobile: {
            x: 0,
            y: 140
        },
        mobileData: true,
        imgID: 14,
        data: [{
            year: 1629,
            value: 18
        }, {
            year: 1630,
            value: 20
        }, {
            year: 1631,
            value: 22
        }, {
            year: 1632,
            value: 11
        }, {
            year: 1633,
            value: 14
        }, {
            year: 1634,
            value: 17
        }, {
            year: 1635,
            value: 5
        }, {
            year: 1636,
            value: 20
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 12
        }, {
            year: 1648,
            value: 13
        }, {
            year: 1649,
            value: 16
        }, {
            year: 1650,
            value: 7
        }, {
            year: 1651,
            value: 17
        }, {
            year: 1652,
            value: 14
        }, {
            year: 1653,
            value: 11
        }, {
            year: 1654,
            value: 17
        }, {
            year: 1655,
            value: 10
        }, {
            year: 1656,
            value: 13
        }, {
            year: 1657,
            value: 10
        }, {
            year: 1658,
            value: 12
        }, {
            year: 1659,
            value: 13
        }, {
            year: 1660,
            value: 4
        }]
    }, {
        name: "Hanged, and made-away themselves",
        description: "Graunt described those who took their own lives as 'Mad-men' who committed 'the greatest sin', and suicide was, at the time, both a civil and religious crime. Families would be keen to avoid such a report, so they might be allowed to bury their deceased relative in a churchyard and keep custody of their otherwise impounded belongings.",
        ValueLabelPos_desktop: {
            x: -290,
            y: 99
        },
        mobileData: false,
        imgID: 15,
        data: [{
            year: 1629,
            value: 8
        }, {
            year: 1630,
            value: 8
        }, {
            year: 1631,
            value: 6
        }, {
            year: 1632,
            value: 15
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 3
        }, {
            year: 1635,
            value: 8
        }, {
            year: 1636,
            value: 7
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 11
        }, {
            year: 1648,
            value: 10
        }, {
            year: 1649,
            value: 13
        }, {
            year: 1650,
            value: 14
        }, {
            year: 1651,
            value: 9
        }, {
            year: 1652,
            value: 14
        }, {
            year: 1653,
            value: 15
        }, {
            year: 1654,
            value: 9
        }, {
            year: 1655,
            value: 14
        }, {
            year: 1656,
            value: 16
        }, {
            year: 1657,
            value: 24
        }, {
            year: 1658,
            value: 18
        }, {
            year: 1659,
            value: 11
        }, {
            year: 1660,
            value: 36
        }]
    }, {
        name: "Killed by several Accidents",
        description: "In bustling seventeenth-century London, there were fatal risks at every turn. Inhabitants might tumble down a flight of stairs in an unlit home, experience a workplace accident or fall under one of the two thousand or so carts and coaches that traversed the city's crowded streets.",
        ValueLabelPos_desktop: {
            x: -260,
            y: 10
        },
        mobileData: false,
        imgID: 16,
        data: [{
            year: 1629,
            value: 54
        }, {
            year: 1630,
            value: 55
        }, {
            year: 1631,
            value: 47
        }, {
            year: 1632,
            value: 46
        }, {
            year: 1633,
            value: 49
        }, {
            year: 1634,
            value: 41
        }, {
            year: 1635,
            value: 51
        }, {
            year: 1636,
            value: 60
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 27
        }, {
            year: 1648,
            value: 57
        }, {
            year: 1649,
            value: 39
        }, {
            year: 1650,
            value: 94
        }, {
            year: 1651,
            value: 47
        }, {
            year: 1652,
            value: 45
        }, {
            year: 1653,
            value: 57
        }, {
            year: 1654,
            value: 58
        }, {
            year: 1655,
            value: 52
        }, {
            year: 1656,
            value: 43
        }, {
            year: 1657,
            value: 52
        }, {
            year: 1658,
            value: 47
        }, {
            year: 1659,
            value: 55
        }, {
            year: 1660,
            value: 47
        }]
    }, {
        name: "Murdered",
        description: "The city's murder rate may seem low, but Londoners could still be a brutal bunch. In the summer of 1628, a riotous mob of young men pursued the notorious quack 'Dr' John Lambe through the city's streets before beating him with stones and cudgels. A convicted witch and rapist who had escaped the gallows twice, Lambe may have been a victim of public justice. His killers were never apprehended.",
        ValueLabelPos_desktop: {
            x: -140,
            y: -35
        },
        ValueLabelPos_mobile: {
            x: -180,
            y: 80
        },
        mobileData: true,
        imgID: 17,
        data: [{
            year: 1629,
            value: 0
        }, {
            year: 1630,
            value: 0
        }, {
            year: 1631,
            value: 3
        }, {
            year: 1632,
            value: 7
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 6
        }, {
            year: 1635,
            value: 5
        }, {
            year: 1636,
            value: 8
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 3
        }, {
            year: 1648,
            value: 2
        }, {
            year: 1649,
            value: 7
        }, {
            year: 1650,
            value: 5
        }, {
            year: 1651,
            value: 4
        }, {
            year: 1652,
            value: 3
        }, {
            year: 1653,
            value: 3
        }, {
            year: 1654,
            value: 3
        }, {
            year: 1655,
            value: 9
        }, {
            year: 1656,
            value: 6
        }, {
            year: 1657,
            value: 5
        }, {
            year: 1658,
            value: 7
        }, {
            year: 1659,
            value: 70
        }, {
            year: 1660,
            value: 20
        }]
    }, {
        name: "Plague",
        description: "Graunt concluded that the searchers had underreported plague deaths during the Great Plague of 1625, but who could blame them? The distinctive swellings or 'buboes' didn't always appear before a victim died, families were desperate not to be quarantined in an infected house for forty days and the public feared contamination from anyone who might have been in contact with the disease.",
        ValueLabelPos_desktop: {
            x: -133,
            y: -64
        },
        ValueLabelPos_mobile: {
            x: -120,
            y: -105
        },
        mobileData: true,
        imgID: 18,
        data: [{
            year: 1629,
            value: 0

        }, {
            year: 1630,
            value: 1317
        }, {
            year: 1631,
            value: 274
        }, {
            year: 1632,
            value: 8
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 1
        }, {
            year: 1635,
            value: 0
        }, {
            year: 1636,
            value: 10400
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 3597
        }, {
            year: 1648,
            value: 611
        }, {
            year: 1649,
            value: 67
        }, {
            year: 1650,
            value: 15
        }, {
            year: 1651,
            value: 23
        }, {
            year: 1652,
            value: 16
        }, {
            year: 1653,
            value: 6
        }, {
            year: 1654,
            value: 16
        }, {
            year: 1655,
            value: 9
        }, {
            year: 1656,
            value: 6
        }, {
            year: 1657,
            value: 4
        }, {
            year: 1658,
            value: 14
        }, {
            year: 1659,
            value: 36
        }, {
            year: 1660,
            value: 14
        }]
    }, {
        name: "Rickets",
        description: "Rickets, a softening of the bones now linked with vitamin D deficiency, was the principal disease of infancy in the 1600s. Surprisingly, the aristocracy – including King Charles I – were often the worst affected, due to a diet rich in meat and low in milk. The only treatment was swaddling children so tightly that they might not stand or walk on their malleable bones.",
        ValueLabelPos_desktop: {
            x: -180,
            y: -180
        },
        mobileData: false,
        imgID: 19,
        data: [{
            year: 1629,
            value: 0
        }, {
            year: 1630,
            value: 0
        }, {
            year: 1631,
            value: 0
        }, {
            year: 1632,
            value: 0
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 14
        }, {
            year: 1635,
            value: 49
        }, {
            year: 1636,
            value: 50
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 150
        }, {
            year: 1648,
            value: 224
        }, {
            year: 1649,
            value: 216
        }, {
            year: 1650,
            value: 190
        }, {
            year: 1651,
            value: 260
        }, {
            year: 1652,
            value: 379
        }, {
            year: 1653,
            value: 229
        }, {
            year: 1654,
            value: 372
        }, {
            year: 1655,
            value: 347
        }, {
            year: 1656,
            value: 458
        }, {
            year: 1657,
            value: 317
        }, {
            year: 1658,
            value: 476
        }, {
            year: 1659,
            value: 441
        }, {
            year: 1660,
            value: 521
        }]
    }, {
        name: "Mother, rising of the Lights",
        description: "These mysterious-sounding diseases both led to breathing difficulties. The movement of either the uterus (known as 'mother') or the lungs (known as 'lights') was blamed for conditions we might now describe as croup, asthma, pleurisy or bronchitis.",
        ValueLabelPos_desktop: {
            x: -110,
            y: -220
        },
        mobileData: false,
        imgID: 20,
        data: [{
            year: 1629,
            value: 44
        }, {
            year: 1630,
            value: 72
        }, {
            year: 1631,
            value: 99
        }, {
            year: 1632,
            value: 98
        }, {
            year: 1633,
            value: 60
        }, {
            year: 1634,
            value: 84
        }, {
            year: 1635,
            value: 72
        }, {
            year: 1636,
            value: 104
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 150
        }, {
            year: 1648,
            value: 92
        }, {
            year: 1649,
            value: 215
        }, {
            year: 1650,
            value: 120
        }, {
            year: 1651,
            value: 134
        }, {
            year: 1652,
            value: 138
        }, {
            year: 1653,
            value: 135
        }, {
            year: 1654,
            value: 178
        }, {
            year: 1655,
            value: 166
        }, {
            year: 1656,
            value: 212
        }, {
            year: 1657,
            value: 203
        }, {
            year: 1658,
            value: 228
        }, {
            year: 1659,
            value: 210
        }, {
            year: 1660,
            value: 249
        }]
    }, {
        name: "Teeth, and Worms",
        description: "Although 'teeth' or 'breeding of the teeth' were commonly listed as causes of death, they say more about the age of the victim than the condition they died from. The terms relate to the developmental stage when children are teething, at which point they might succumb to a broad range of afflictions.",
        ValueLabelPos_desktop: {
            x: -45,
            y: -247
        },
        mobileData: false,
        imgID: 21,
        data: [{
            year: 1629,
            value: 440
        }, {
            year: 1630,
            value: 506
        }, {
            year: 1631,
            value: 335
        }, {
            year: 1632,
            value: 470
        }, {
            year: 1633,
            value: 432
        }, {
            year: 1634,
            value: 454
        }, {
            year: 1635,
            value: 539
        }, {
            year: 1636,
            value: 1207
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 767
        }, {
            year: 1648,
            value: 597
        }, {
            year: 1649,
            value: 540
        }, {
            year: 1650,
            value: 598
        }, {
            year: 1651,
            value: 709
        }, {
            year: 1652,
            value: 905
        }, {
            year: 1653,
            value: 691
        }, {
            year: 1654,
            value: 1131
        }, {
            year: 1655,
            value: 803
        }, {
            year: 1656,
            value: 1198
        }, {
            year: 1657,
            value: 878
        }, {
            year: 1658,
            value: 1036
        }, {
            year: 1659,
            value: 839
        }, {
            year: 1660,
            value: 1008

        }]
    },
];


TheCollectors.Interface = function() {
    var self = {},
        dom = {};
    var DATA = [];
    var SCREEN_MODE;
    self.Init = function(screenMode) {

        SCREEN_MODE = screenMode;
        $('.dragger').append('<div class=\'currentYear\'></div>');
        dom = {
            chart: $('#radial'),
            yearSelector: $('#yearSelector'),
            infoBox: $('#info-box-1'),
            infoBoxImg: $('#info-box-1>img'),
            infoBoxHeader: $('#info-box-1 h1'),
            infoBoxCopy: $('#info-box-1 p'),
            infoBoxBtn: $('#info-box-1 .btn'),
            noData: $('.no-data'),
            currentYear: $('.currentYear'),
            infoBoxYear: $('.info-box .year'),
            infoBoxDeaths: $('.info-box .number-of-deaths'),
            hideGlossaryBtn: $('header .hide-gloassary-btn'),
            showGlossaryBtn: $('header .show-gloassary-btn'),
        };

        dom.noData.css('opacity', 0);
        dom.currentYear.text(dom.yearSelector[0].value);



        getInitialData(SCREEN_MODE);
        updateData();
        dom.infoBox.hide();
        dom.hideGlossaryBtn.hide();
        loadData();
        buildBase();
        setScales();
        drawBars();
        addCircleAxes();
        addLineAxes();
        addOverlayBtns();
        globalEventListeners();
        eventListeners();
        updateInfoBoxValues();
    };

    self.changeScreenMode = function(screenMode) {
        SCREEN_MODE = screenMode;
        viz.selectAll("*").remove();
        viz.remove();
        //console.log("changing view to : ",SCREEN_MODE);
        getInitialData(SCREEN_MODE);
        updateData();
        dom.infoBox.hide();
        dom.hideGlossaryBtn.hide();
        loadData();
        buildBase();
        setScales();
        drawBars();
        addCircleAxes();
        addLineAxes();
        addOverlayBtns();
        eventListeners();
        updateInfoBoxValues();


    };

    var getInitialData = function(SCREEN_MODE) {
        DATA = TheCollectors.getData(SCREEN_MODE);
        axis = DATA.length;
        maxVal = Number(Math.sqrt(2500 * DATA.length / Math.PI));
    };

    var currentData = [];

    var timeseries, sdat, series, minVal = 0,
        radius, radiusLength;
    var maxVal;
    var w = 1500,
        h = 1000,
        axis, ruleColor = '#fff';
    var vizPadding = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    var innerRadiusVal = 8;
    var numticks = 5;
    var viz, vizBody, maxs, keys;
    var oldRadius = [];
    var newRadius = [];
    var labelWidth = [];
    var valueHolders;
    var SELECTED_ITEM = -1;
    var NO_DATA_YEAR = false;

    var updateInfoBoxValues = function() {
        dom.infoBoxYear.text(dom.yearSelector[0].value);
        if (SELECTED_ITEM > -1) dom.infoBoxDeaths.text(DATA[SELECTED_ITEM].data[dom.yearSelector[0].value - 1629].value);
    };
    var loadData = function() {
        sdat = [];
        keys = [];
        for (var j = 0; j < DATA.length; j++) {
            keys[j] = DATA[j].name;
        }
        for (i = 0; i <= numticks; i++) {
            sdat[i] = maxVal / numticks * i;
        }
    };
    var buildBase = function() {
        viz = d3.select('#radial').append('svg:svg').attr('viewBox', '0,0,' + w + ',' + h).attr("width", w + "px").attr("height", h + "px");
        viz.append('svg:rect').attr('x', 0).attr('y', 0).attr('height', 0).attr('width', 0).attr('height', 0);
        vizBody = viz.append('svg:g').attr('id', 'body');
    };
    var setScales = function() {
        var heightCircleConstraint, widthCircleConstraint, circleConstraint, centerXPos, centerYPos;
        heightCircleConstraint = h - vizPadding.top - vizPadding.bottom;
        widthCircleConstraint = w - vizPadding.left - vizPadding.right;
        circleConstraint = d3.min([
            heightCircleConstraint,
            widthCircleConstraint
        ]);
        radius = d3.scale.linear().domain([
            0,
            maxVal
        ]).range([
            0,
            circleConstraint / 2
        ]);
        radiusLength = radius(maxVal);
        centerXPos = widthCircleConstraint / 2 + vizPadding.left;
        centerYPos = heightCircleConstraint / 2 + vizPadding.top;
        vizBody.attr('transform', 'translate(' + centerXPos + ', ' + centerYPos + ')');
    };
    addCircleAxes = function() {
        var radialTicks = radius.ticks(numticks),
            circleAxes, i;
        vizBody.selectAll('.circle-ticks').remove();
        circleAxes = vizBody.selectAll('.circle-ticks').data(sdat).enter().append('svg:g').attr('class', 'circle-ticks');
        circleAxes.append('svg:circle').attr('r', function(d, i) {
            return radius(d);
        }).attr('class', 'circle').style('stroke', ruleColor).style('stroke-opacity', '0.7').style('opacity', 0.7).style('fill', 'none');
    };
    addLineAxes = function() {
        var radialTicks = radius.ticks(numticks),
            lineAxes;
        vizBody.selectAll('.line-ticks').remove();
        lineAxes = vizBody.selectAll('.line-ticks').data(keys).enter().append('svg:g').attr('transform', function(d, i) {
            var angle = i / axis * 360 - 90 + 360 / axis / 1.5;
            if (i > DATA.length / 2 - 1) {
                angle = i / axis * 360 - 90 + 360 / axis / 2.8;
            }
            var radiusForTextToStart;
            if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
                radiusForTextToStart = 20;
            } else {
                radiusForTextToStart = 5;
            }
            return 'rotate( ' + angle + ')translate(' + radius(radiusForTextToStart) + ')';
        }).attr('class', 'line-ticks');
        lineAxes.append('svg:text').text(function(d, i) {
            return keys[i];
        }).attr('text-anchor', 'right').attr('fill', '#e5254e').attr('font-size', function() {
            if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
                return 14;
            } else {
                return 30;
            }
        }).attr('class', 'label').attr('transform', function(d, i) {
            labelWidth[i] = $(this)[0].getBBox().width;
            if (i > DATA.length / 2 - 1) {
                return ' rotate(180,' + labelWidth[i] / 2 + ',' + 0 + ')';
            }
        });
        vizBody.selectAll('.value-label-holders').remove();

        valueHolders = vizBody.selectAll('.value-label-holders').data(keys).enter().append('svg:text').text(function(d, i) {
            return currentData[i].realValue;
        }).attr('class', 'value-label-holders opacity-transition display-opacity-0').attr('fill', function(d, i) {
            value = radius(currentData[i].y);
            value2 = Math.sqrt(Math.pow(DATA[i]["ValueLabelPos_" + SCREEN_MODE].x, 2) + Math.pow(DATA[i]["ValueLabelPos_" + SCREEN_MODE].y, 2));
            if (value > value2 + 6) {
                return 'white';
            } else {
                return 'black';
            }
        }).attr('x', function(d, i) {
            return DATA[i]["ValueLabelPos_" + SCREEN_MODE].x;
        }).attr('y', function(d, i) {
            return DATA[i]["ValueLabelPos_" + SCREEN_MODE].y;
        }).attr('font-size', function() {
            if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
                return 16;
            } else {
                return 30;
            }
        });
    };
    var drawBars = function() {
        var groups, bar;
        pie = d3.layout.pie().value(function(d) {
            return d;
        }).sort(null);
        d = [];
        for (i = 0; i < currentData.length; i++) {
            d.push(1);
        }
        groups = vizBody.selectAll('.series').data([d]);
        groups.enter().append('svg:g').attr('class', 'series').style('fill', 'blue').style('stroke', 'black');
        groups.exit().remove();
        bar = d3.svg.arc().innerRadius(innerRadiusVal).outerRadius(function(d, i) {
            oldRadius[i] = radius(currentData[i].y);
            return radius(currentData[i].y);
        });
        arcs = groups.selectAll('.series g.arc').data(pie).enter().append('g').attr('class', 'attr');
        arcs.append('path').attr('fill', 'black').attr('stroke', 'white').attr('stroke-opacity', '0.3').attr('d', bar).style('opacity', 1).style('cursor', 'pointer');
    };
    var addOverlayBtns = function() {
        var groups, bar;
        pie = d3.layout.pie().value(function(d) {
            return d;
        }).sort(null);
        d = [];
        for (i = 0; i < currentData.length; i++) {
            d.push(1);
        }
        groups = vizBody.selectAll('.series2').data([d]);
        groups.enter().append('svg:g').attr('class', 'series2').style('fill', 'blue').style('stroke', 'black');
        groups.exit().remove();
        bar = d3.svg.arc().innerRadius(innerRadiusVal).outerRadius(function(d, i) {
            return 500;
        });
        arcs = groups.selectAll('.series g.arc').data(pie).enter().append('g').attr('class', 'attr');
        arcs.append('path').attr('fill', 'yellow').attr('stroke', 'white').attr('fill-opacity', '0').attr('stroke-opacity', '0').attr('d', bar).style('opacity', 1).style('cursor', 'pointer');
    };
    var transition = function(val) {
        var bar = d3.svg.arc().innerRadius(innerRadiusVal).outerRadius(function(d, i) {
            return radius(currentData[i].y);
        });
        newRadius = [];
        for (i = 0; i < currentData.length; i++) {
            newRadius.push(radius(currentData[i].y));
        }
        path = d3.selectAll('#radial svg g.series path');
        path.each(function(dat, s) {
            d3.select(this).transition().duration(800).attrTween('d', function(a) {
                var k = d3.interpolate(oldRadius[s], newRadius[s]);
                return function(t) {

                    oldRadius[s] = k(t);

                    return bar.outerRadius(k(t))(a);
                };
            }).each('end', function() {
                oldRadius[s] = newRadius[s];
            });
        });
        valueHolders.each(function(dat, s) {
            d3.select(this).transition().duration(800).tween('text', function(d, id) {
                var i = d3.interpolate(this.textContent, currentData[s].realValue);
                return function(t, id) {
                    value = radius(currentData[s].y);
                    value2 = Math.sqrt(Math.pow(DATA[s]["ValueLabelPos_" + SCREEN_MODE].x, 2) + Math.pow(DATA[s]["ValueLabelPos_" + SCREEN_MODE].y, 2));
                    if (value > value2 + 6) {
                        d3.select(this).attr('fill', 'white');
                    } else {
                        d3.select(this).attr('fill', 'black');
                    }
                    this.textContent = Math.round(i(t));
                };
            });
        });
    };
    var updateData = function() {
        var yearIndex;
        if ((dom.yearSelector, dom.yearSelector[0].value > 1636) && (dom.yearSelector, dom.yearSelector[0].value < 1647)) {

            if (!NO_DATA_YEAR) {
                dom.chart.fadeTo(400, 0);
                dom.noData.fadeTo(400, 1);
                if (SELECTED_ITEM > -1)
                    dom.infoBox.fadeTo(200, 0);
            }
            NO_DATA_YEAR = true;
            yearIndex = 1636 - 1629;
        } else {

            if (NO_DATA_YEAR) {
                dom.chart.fadeTo(400, 1);
                if (SELECTED_ITEM > -1)
                    dom.infoBox.fadeTo(200, 1);
                dom.noData.fadeTo(400, 0);
            }
            NO_DATA_YEAR = false;
            yearIndex = dom.yearSelector[0].value - 1629;

        }
        currentData = [];
        for (var i = 0; i < DATA.length; i++) {

            if (!isNaN(DATA[i].data[yearIndex].value)) {
                var value = DATA[i].data[yearIndex].value;
                var chartValue = Number(Math.sqrt(value * DATA.length / Math.PI));

                if ((chartValue <= innerRadiusVal) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP)) {
                    //console.log('????',SCREEN_MODE==TheCollectors.SCREEN_MODE_DESKTOP,SCREEN_MODE)
                    chartValue = innerRadiusVal * 1.2;
                }

                if ((chartValue < innerRadiusVal) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_MOBILE)) {
                    //console.log('????',chartValue,SCREEN_MODE==TheCollectors.SCREEN_MODE_DESKTOP,SCREEN_MODE)
                    chartValue = chartValue + innerRadiusVal;
                }


                var name = DATA[i].name;
                currentData.push({
                    y: chartValue,
                    realValue: value,
                    name: name,
                    id: i,
                    borderwidth: 0
                });
            }
        }
    };


    var globalEventListeners = function() {
        $('.dragger').on('mousedown touchstart', function() {
            dom.currentYear.addClass('currentYear-dragging');
        });
        $('body').on('mouseup touchend', function() {
            dom.currentYear.removeClass('currentYear-dragging');
        });

        dom.yearSelector.on('slider:changed', function(ev, d) {
            dom.currentYear.text(d.value);

            updateInfoBoxValues();
            updateData();
            transition();
        });


        dom.infoBoxBtn.on('click', function() {

            updateDisplayInfo(SELECTED_ITEM + 1);
        });
        dom.hideGlossaryBtn.on('click', function() {
            if (!NO_DATA_YEAR) {
                dom.showGlossaryBtn.show();
                dom.hideGlossaryBtn.hide();
                updateDisplayInfo(SELECTED_ITEM);
            }
        });


        dom.showGlossaryBtn.on('click', function() {
            if (!NO_DATA_YEAR) {
                dom.showGlossaryBtn.hide();
                dom.hideGlossaryBtn.show();
                updateDisplayInfo(0);
            }
        });
    };


    var eventListeners = function() {
        viz.selectAll('#radial svg g.series path, #radial svg g.series2 path').on('click', function(a, index) {

            if (!NO_DATA_YEAR) {
                updateDisplayInfo(index);
                updateInfoBoxValues();
            }

        });
        viz.selectAll('#radial svg g.series path, #radial svg g.series2 path').on('mouseover', function(a, index) {
            var id;
            if (index >= DATA.length) {
                id = index - DATA.length;
            }
            d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-1");
        });
        viz.selectAll('#radial svg g.series path, #radial svg g.series2 path').on('mouseout', function(a, index) {
            var id;
            if (index >= DATA.length) {
                id = index - DATA.length;
            }
            if (id == SELECTED_ITEM) return;
            d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-0");
        });
    };

    var updateDisplayInfo = function(index) {
        var paths = viz.selectAll('#radial svg g.series path');
        var labels = viz.selectAll('.line-ticks .label');
        var id = index;
        if (index >= DATA.length) {
            id = index - DATA.length;
        }

        d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-1");
        if (SELECTED_ITEM == id) {
            d3.select(paths[0][SELECTED_ITEM]).attr('fill', 'black');
            d3.select(labels[0][SELECTED_ITEM]).attr('fill', '#e5254e');
            d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-0");
            SELECTED_ITEM = -1;
            if ($(window).width() <= 768) {
                dom.hideGlossaryBtn.hide();
                dom.showGlossaryBtn.show();
            }
            updateBox();
            return;
        }
        if (SELECTED_ITEM > -1) {
            d3.select(paths[0][SELECTED_ITEM]).attr('fill', 'black');
            d3.select(labels[0][SELECTED_ITEM]).attr('fill', '#e5254e');
            d3.select(valueHolders[0][SELECTED_ITEM]).attr('class', "value-label-holders opacity-transition display-opacity-0");
            if ($(window).width() <= 768) {
                dom.hideGlossaryBtn.show();
                dom.showGlossaryBtn.hide();
            }

        }
        SELECTED_ITEM = id;
        if (SELECTED_ITEM > -1) {
            d3.select(paths[0][SELECTED_ITEM]).attr('fill', '#e5254e');
            d3.select(labels[0][SELECTED_ITEM]).attr('fill', 'white');
            if ($(window).width() <= 768) {
                dom.hideGlossaryBtn.show();
                dom.showGlossaryBtn.hide();
            }
        }
        updateBox();
    };
    var updateBox = function() {
        updateInfoBoxValues();
        var ar = TheCollectors.assetRoot;
        if (SELECTED_ITEM > -1) {
            dom.infoBox.fadeOut('fast', function() {
                dom.infoBoxImg.css('opacity', 0);
                dom.infoBoxImg.bind('load', function() {
                    dom.infoBoxImg.css('opacity', 1);
                });
                dom.infoBoxImg.attr('src', ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '.jpg');
                dom.infoBoxImg.attr('srcset', ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '.jpg 1x, ' +
                    ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '_x2.jpg 2x, ' +
                    ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '_x2.jpg 3x,' +
                    ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '_x2.jpg 4x,'
                );
                dom.infoBoxHeader.text(DATA[SELECTED_ITEM].name);
                dom.infoBoxCopy.text(DATA[SELECTED_ITEM].description);
                dom.infoBox.fadeIn();
            });
        } else {
            dom.infoBox.fadeOut('fast');
        }
    };
    return self;
}();

Pathways.components.infiniteCanvas.wellcomeCollection = {
    data: {
        gaRoot: 'the-collectors - unceasing-seeker - l2 infinite-canvas open image',
        location: '_assets/infinite-canvas/infiniteCanvas_',
        images: [{
            id: 'L0011600a',
            pos: [1220, 35],
            text: 'When Professor Max Neuberger assessed the state of the Wellcome Library after Wellcome’s death, he found the contents bewilderingly eclectic.'
        }, {
            id: 'L0011599a',
            pos: [1648, 35],
            text: 'Before Wellcome’s collection was dispersed after his death, it contained more than a million items, many of them stored in warehouses around London.'
        }, {
            id: 'L0006437a',
            pos: [2075, 35],
            text: 'A nineteenth-century Persian watercolour of an annotated skeleton.'
        }, {
            id: 'L0058576a',
            pos: [2397, 35],
            text: 'Wellcome’s collecting collaborator C J S Thompson bought pestles and mortars on at least 80 different occasions. When the Wellcome Historical Medical Museum opened, more than 700 mortars were on display.'
        }, {
            id: 'L0058329',
            pos: [4083, 37],
            text: 'Ceramics, like these eighteenth-century Italian vases, provided inspiration for dressing Burroughs Wellcome & Co. trade exhibits.'
        }, {
            id: 'L0065696a',
            pos: [3235, 38],
            text: 'A sample of body snatcher William Burke’s brain, extracted from his cadaver after his execution in 1829. Wellcome Images/Science Museum'
        }, {
            id: 'L0057218a',
            pos: [66, 52],
            text: 'Wellcome acquired several mummified bodies, including this Egyptian head from the first or second millennium BCE. Wellcome Images/Science Museum'
        }, {
            id: 'L0023265a',
            pos: [6704, 54],
            text: 'A corpulent king who hoped leeches would suck out his excess fat, from the sixteenth-century manuscript Histoires Prodigieuses.'
        }, {
            id: 'L0057148a',
            pos: [5455, 68],
            text: 'A nineteenth-century pewter box for transporting leeches used in bloodletting.'
        }, {
            id: 'L0015581a',
            pos: [773, 113],
            text: 'Wellcome acquired or commissioned numerous paintings depicting the work of apothecaries, physicians and surgeons, like this bloodletting scene by Matthijs Naiveu.'
        }, {
            id: 'L0039443a',
            pos: [7418, 163],
            text: 'Painting of a duck from a seventeenth-century Chinese herbal. The accompanying text reports that the flesh of ducks replenishes qi and treats weakness of the blood and physical frailty.'
        }, {
            id: 'L0011597a',
            pos: [2765, 165],
            text: 'The Wellcome Library stores at Enfield. In 1930 one of the Library’s staff likened disturbing ‘the dust of years’ on boxes of books that had never been unpacked to the explorations of a new world by ‘stout Cortez’.'
        }, {
            id: 'L0057653a',
            pos: [3704, 231],
            text: 'Seventeenth-century brass weights for weighing sheep’s wool, a valuable commodity at the time. Wellcome Images/Science Museum'
        }, {
            id: 'V0021599a',
            pos: [5913, 275],
            text: 'Engraving of a narwhal and a sperm whale. Powdered narwhal tusks were thought to act as an antidote against arsenic or mercury poisoning.'
        }, {
            id: 'L0057750a',
            pos: [4836, 294],
            text: 'Wellcome purchased this antelope horn at auction in 1932. It was said to have been used in Nigeria, to heal and protect against disease. Wellcome Images/Science Museum'
        }, {
            id: 'M0015033a',
            pos: [1220, 366],
            text: 'A paleolithic flint hand axe found in the City of London in 1690 by apothecary, archaeologist and collector of antiquities John Conyrs. Wellcome attributed the start of his own collecting life to his discovery of a sharpened flint in Wisconsin when he was aged just four.'
        }, {
            id: 'L0058357a',
            pos: [6704, 446],
            text: 'Snake-like storage jars used in a pharmacy. Like much of Wellcome’s collection, the provenance and practical use of these jars was never recorded. Wellcome Images/Science Museum'
        }, {
            id: 'L0022370a',
            pos: [773, 486],
            text: 'Wellcome’s interest in collecting letters centred more around who they were written by than what they were about. This 1823 missive from Mary Anning, however, happens to include the first sketch of a plesiosaurus.'
        }, {
            id: 'L0012386a',
            pos: [3387, 511],
            text: 'Sixteenth and seventeenth-century surgical instruments, including dental forceps, a trepanning drill, a bullet extractor and a surgical saw.'
        }, {
            id: 'L0013467a',
            pos: [2765, 512],
            text: 'A fifteenth-century ‘wound man’ illustration, documenting common injuries to the human body.'
        }, {
            id: 'L0032229',
            pos: [4083, 546],
            text: 'The Burroughs Wellcome & Co. 1911 ‘Book of Beauty’, featuring the head of Venus.'
        }, {
            id: 'L0031259a',
            pos: [2311, 575],
            text: 'A sixteenth-century fragment of Arabic poetry mounted as a wall decoration.'
        }, {
            id: 'L0036897a',
            pos: [2098, 576],
            text: 'Jars full of seeds and roots.'
        }, {
            id: 'M0009391a',
            pos: [66, 670],
            text: 'Ancient Hindu forceps resembling the mouths of animals, including the ‘lion’, ‘wolf’, ‘curlew’, ‘heron’ and ‘tiger’.'
        }, {
            id: 'V0035815',
            pos: [4811, 758],
            text: 'Greek and Roman gods and goddesses, like this muscular Mercury, appeared in Burroughs Wellcome & Co.’s advertising materials.'
        }, {
            id: 'V0022070a',
            pos: [5359, 758],
            text: 'Etching of a spotted eel. Eeels have been used as a restorative for consumptives. Their fat has also been used to treat deaf ears, smallpox spots and piles.'
        }, {
            id: 'L0072171',
            pos: [3387, 790],
            text: 'Images of classical vases and urns, like the one depicted in this eighteenth-century etching by Giovanni Piranesi, provided inspiration for Burroughs Wellcome & Co.’s advertising materials.'
        }, {
            id: 'L0033345a',
            pos: [2094, 870],
            text: 'The impressive physique of 21-year-old Eugen Sandow, who became a celebrity after winning a competition to find the strongest man in the world.'
        }, {
            id: 'M0019473a',
            pos: [6704, 930],
            text: 'Catgut ligatures soaked in carbolic oil by Joseph Lister to prevent infection when used to tie off arteries in surgery. Despite its name, catgut is usually sourced from sheep.'
        }, {
            id: 'M0016570a',
            pos: [773, 1078],
            text: 'Anthropomorphic Peruvian vases in the form of blind figures.'
        }, {
            id: 'L0032232',
            pos: [4083, 1271],
            text: 'A late nineteenth-century Burroughs Wellcome & Co. price list, featuring Hippocrates, Mercury and other classical references.'
        }, {
            id: 'L0025709a',
            pos: [228, 1300],
            text: 'A nineteenth-century Japanese illustration depicting the removal of a breast cancer tumour under general anaesthetic.'
        }, {
            id: 'L0032222',
            pos: [2765, 1372],
            text: 'A Burroughs Wellcome & Co. 1906 booklet on anaesthesia.'
        }, {
            id: 'L0057155a',
            pos: [5902, 1414],
            text: 'An eighteenth-century Italian jar for storing spermaceti, a waxy substance obtained from the head of a sperm whale, used in medicinal ointments and moisturisers. Wellcome Images/Science Museum'
        }, {
            id: 'M0012576a',
            pos: [6192, 1414],
            text: 'Spider illustration from a sixteenth century ‘Materia Medica’ text.'
        }, {
            id: 'L0058457a',
            pos: [6927, 1414],
            text: 'Sixteenth- or seventeenth-century bezoar stones that were dropped into drinks to protect against poisons. Bezoars are concretions of indigestible materials found in the stomachs and intestines of animals and humans. Wellcome Images/Science Museum'
        }, {
            id: 'L0039446a',
            pos: [7420, 1414],
            text: 'Painting of a crane from a seventeenth-century Chinese herbal. The accompanying text reports that the flesh of cranes treats parasitic worms and fish poisons.'
        }, {
            id: 'L0025988a',
            pos: [1266, 1527],
            text: 'A fifteenth-century Persian manuscript showing the position of the heavens at the moment of Prince Iskandar’s birth.'
        }, {
            id: 'M0013911a',
            pos: [1636, 1527],
            text: 'Spears, clubs, shields and arrows from Wellcome’s collection laid out at the British Museum in 1955 before being dispersed to other museums. His collection of non-mechanical weapons was thought to contain at least 50 000 objects.'
        }, {
            id: 'V0031371a',
            pos: [805, 1608],
            text: 'A seventeenth-century Italian pharmacy reconstructed in the Wellcome Historical Medical Museum.'
        }, {
            id: 'L0027577',
            pos: [4809, 1628],
            text: 'Auction catalogue for William Morris’s library, including Wellcome’s notes on individual sale items.'
        }, {
            id: 'L0057380a',
            pos: [5230, 1659],
            text: 'Mole paws that may have been carried to protect against toothache or cramp. Part of Edward Lovett’s collection – largely purchased from London’s costermongers and dock workers – which was acquired by Wellcome in 1930.'
        }, {
            id: 'M0018240a',
            pos: [6927, 1746],
            text: 'Bear’s grease labels from pharmacy jars, promoting its use for ‘beautifying and strengthening’ the hair.'
        }, {
            id: 'L0024843a',
            pos: [1265, 1816],
            text: 'A photographic album documenting plastic surgery at London’s King George Military Hospital. Part of the RAMC Muniment Collection in the care of the Wellcome Library.'
        }, {
            id: 'V0029805a',
            pos: [1995, 1816],
            text: 'A potential hunting ground for Wellcome or his agents, a Parisian sale of artefacts from an old apothecary’s shop.'
        }, {
            id: 'L0025821',
            pos: [4324, 1816],
            text: '‘Kepler’ Solution was Burroughs Wellcome & Co.’s brand of cod liver oil. One set of advertisements for the product was based on the ancient history of Greece.'
        }, {
            id: 'L0039442a',
            pos: [5902, 1845],
            text: 'Silk painting of an owl from a seventeenth-century Chinese herbal. The accompanying text reports that the flesh of owls relieves ague, dispels wind and calms fright.'
        }, {
            id: 'L0057178a',
            pos: [6286, 1845],
            text: 'A nineteenth-century English jar for storing leeches. Wellcome Images/Science Museum'
        }, {
            id: 'L0039453a',
            pos: [6668, 1846],
            text: 'Painting of pigeons from a seventeenth-century Chinese herbal. The accompanying text reports that the flesh of pigeons dispels wind, removes poisons and promotes the healing of wounds.'
        }, {
            id: 'L0006591a',
            pos: [1629, 1852],
            text: 'Wellcome collected examples of everyday pharmaceutical practices, which would have been sold in shops like this 1897 pharmacy.'
        }, {
            id: 'L0058984a',
            pos: [7420, 1903],
            text: 'A necklace made from snake bones, worn to protect against back pain. Part of Edward Lovett’s collection of amulets and charms, purchased by Wellcome in 1930. Wellcome Images/Science Museum'
        }, {
            id: 'L0036438a',
            pos: [805, 1998],
            text: 'Manuscripts and boxes from the archive of the Wellcome Historical Medical Museum. Wellcome’s personal archive alone amounted to 700 archive boxes and 6500 individual items.'
        }, {
            id: 'L0039441a',
            pos: [5406, 2101],
            text: 'Silk painting of a peacock from a seventeenth-century Chinese herbal. The accompanying text reports that the flesh and blood of peacocks treats poisoning, ulcers and abscesses.'
        }, {
            id: 'L0057151a',
            pos: [6286, 2101],
            text: 'Sixteenth-century Italian jars for storing horse fat (left) and badger fat (right). Badger fat (or grasso di tasso) was believed to heal broken bones and muscles. It was also used to treat fevers and inflammation. Wellcome Images/Science Museum'
        }, {
            id: 'L0057156a',
            pos: [6927, 2114],
            text: 'An eighteenth-century Italian jar for storing oil of eathworms, a pain reliever used in the treatment of arthritis, rickets and cramp. Wellcome Images/Science Museum'
        }, {
            id: 'L0018916a',
            pos: [1265, 2126],
            text: 'The dusty remains of the decayed clinical records of gynaecological operations at Guy’s Hospital in 1909–12.'
        }, {
            id: 'V0006204a',
            pos: [315, 2135],
            text: 'A 1900 caricature from Chemist and Druggist depicting Wellcome as ‘a very compact and fascinating bird’ that feeds on tabloids, prefers warmer climes to London and is ‘very fond of large pumpkins’.'
        }, {
            id: 'L0034055',
            pos: [4984, 2178],
            text: 'A Burroughs Wellcome & Co. window display in Argentina. Wellcome’s approach to window dressing crammed as many products into the space as possible, making full use of the available height.'
        }, {
            id: 'L0057197',
            pos: [4226, 2212],
            text: 'Wellcome sent tins, cases, bottles and tubes to his company engineers, with detailed instructions of how to apply their designs. This nineteenth-century brass tobacco box may only be opened by solving a puzzle. Wellcome Images/Science Museum'
        }, {
            id: 'L0021967a',
            pos: [5902, 2371],
            text: 'A reconstruction of a traditional Arabic pharmacy in the Wellcome Historical Medical Museum.'
        }, {
            id: 'M0009572a',
            pos: [6414, 2371],
            text: 'The Hall of Primitive Medicine in the Wellcome Building on Euston Road, 1946.'
        }, {
            id: 'V0029806a',
            pos: [805, 2388],
            text: 'A possible source of Italian pharmacy jars.'
        }, {
            id: 'V0049059a',
            pos: [1729, 2389],
            text: 'Wellcome’s agents travelled to auctions like this French art sale under assumed names, for fear of sellers increasing the prices in their honour. Wellcome himself sometimes went under the name of Wilkins or Wilton.'
        }, {
            id: 'V0017599a',
            pos: [2164, 2389],
            text: 'After Wellcome married 21-year-old Syrie Barnardo, her life became ‘one constant round’ of visits to bazaars like this, as well as ‘old pharmacies, bookshops, dealers in antiquities and owners of private collections’.'
        }, {
            id: 'V0035823',
            pos: [2875, 2389],
            text: 'Greek and Roman gods and goddesses, like the Venus de’ Medici, appeared in Burroughs Wellcome & Co.’s advertising materials.'
        }, {
            id: 'V0031394a',
            pos: [7420, 2451],
            text: 'Wellcome (second from right) and the architect Septimus Warwick (second from left) inspecting stonework for the Wellcome Building on Euston Road, 1931.'
        }, {
            id: 'L0025888',
            pos: [4982, 2455],
            text: 'Snow duck illustration from an eighteenth-century Danish book acquired from William Morris’s library.'
        }, {
            id: 'L0017214',
            pos: [3387, 2480],
            text: 'Like Wellcome, the founder of Sequah, Yorkshireman William Hartley was a savvy salesman and showman. Hartley dressed himself, his staff and his medicines up as if they hailed from the American Wild West.'
        }, {
            id: 'L0049007',
            pos: [3707, 2480],
            text: 'Images of classical sculptures, like this statue of Laocoön and his sons, provided source material for Burroughs Wellcome & Co.’s advertising materials.'
        }, {
            id: 'M0004497a',
            pos: [6414, 2692],
            text: 'The Hall of Statuary stairs in the Wellcome Building on Euston Road.'
        }, {
            id: 'L0032227',
            pos: [4226, 2726],
            text: 'A Burroughs Wellcome & Co. 1906 price list.'
        }, {
            id: 'L0017734',
            pos: [4674, 2726],
            text: 'Burroughs Wellcome & Co.’s 1895 price list, incorporating images of coins and the company’s Snow Hill headquarters.'
        }, {
            id: 'M0004494a',
            pos: [5406, 2741],
            text: 'The Hall of Statuary in the Wellcome Building on Euston Road.'
        }, {
            id: 'M0020280a',
            pos: [6927, 2876],
            text: 'Portraits and paintings in the Wellcome Historical Medical Museum on Portman Street, 1947–54. Today, the Wellcome Library contains over 100 000 pictures.'
        }, {
            id: 'L002897a',
            pos: [2164, 2914],
            text: 'Wellcome’s agents travelled to auctions like this French art sale under assumed names, for fear of sellers increasing the prices in their honour. Wellcome himself sometimes went under the name of Wilkins or Wilton.'
        }, {
            id: 'L0021542a',
            pos: [2571, 2914],
            text: 'The Silk Mercers bazaar in Cairo, c.1848. After Wellcome visited Egpyt and the Sudan in 1901, he shipped 44 trunks and cases back from Cairo, many of them containing African curiosities.'
        }, {
            id: 'M0008536a',
            pos: [147, 2944],
            text: 'Wellcome snapped this photograph of his interpreter in his car while on tour in Europe in 1908.'
        }, {
            id: 'L0021424',
            pos: [1801, 2944],
            text: 'A sketch of alchemical equipment that had been offered for sale to one of Wellcome’s agents in Rome.'
        }, {
            id: 'M0007861',
            pos: [4991, 2997],
            text: 'Henry Wellcome in his early 30s, dressed as a warrior.'
        }, {
            id: 'M0020277a',
            pos: [5409, 3114],
            text: 'The Hall of Statuary in the Wellcome Historical Medical Museum on Wigmore Street, 1926.'
        }, {
            id: 'L0021269',
            pos: [4674, 3140],
            text: 'An illustrated sixteenth-century book by Catherine of Siena, which was purchased from the library of William Morris.'
        }, {
            id: 'L0021264a',
            pos: [2164, 3172],
            text: 'After C J S Thompson started working for Wellcome, his first acquisition was a book of seventeenth-century medicinal recipes collected by Lady Ayscough. This page deals with treating ‘a wheezing in the pipes’.'
        }, {
            id: 'L0021122',
            pos: [3632, 3177],
            text: 'The first major book purchase Wellcome’s agent C J S Thompson made was 482 lots from William Morris’s library, bought at Sotheby’s in 1898. The collection included books on architecture, textiles and printing.'
        }, {
            id: 'L0002141a',
            pos: [2550, 3345],
            text: 'A medicine vendor hawking his wares in China.'
        }, {
            id: 'M0006329a',
            pos: [2949, 3345],
            text: 'Wellcome and his agents travelled extensively to acquire artefacts – and even entire shops – for his collection. This pharmacy was found in the Bazaar at Constantinople.'
        }, {
            id: 'L0056757a',
            pos: [1801, 3377],
            text: 'A dealer in curiosities photographed in Beijing, 1869.'
        }, {
            id: 'V0022144',
            pos: [4226, 3424],
            text: 'Depictions of strength and power, like this 1690 engraving of an eagle clutching an owlet, may have provided inspiration for Burroughs Wellcome & Co.’s advertising materials.'
        }, {
            id: 'L0021417a',
            pos: [7079, 3429],
            text: 'The cover of the 1913 Handbook of the Historical Medical Museum, which was finally opened for the 17th International Congress of Medicine in London, a decade after Wellcome had initially discussed the idea of an exhibition.'
        }, {
            id: 'L0021453a',
            pos: [7396, 3429],
            text: 'The Wellcome Historical Medical Library, which previously admitted visitors only by appointment, finally opened to the public 13 years after Wellcome’s death.'
        }, {
            id: 'L0013410a',
            pos: [270, 3461],
            text: 'Wellcome’s longest-serving collaborator, the writer Charles John Samuel Thompson. Their 25-year business relationship broke down after Thompson developed a personal book on company time.'
        }, {
            id: 'M0007600a',
            pos: [533, 3461],
            text: 'Wellcome reconstructed nine different pharmacies in the Wellcome Historical Medical Museum, including this Indian drug shop.'
        }, {
            id: 'L0029861a',
            pos: [4990, 3537],
            text: 'The Hall of Primitive Medicine in the Wellcome Historical Medical Museum on Wigmore Street.'
        }, {
            id: 'L0031841a',
            pos: [2550, 3618],
            text: 'As well as purchasing individual books and objects, Wellcome and his agents also acquired the entire collections of others, like this trunk of photographs collected by E N Fallaize.'
        }, {
            id: 'L0038109a',
            pos: [941, 3653],
            text: 'A shopkeeper photographed by Dr Lillias Anna Hamilton.'
        }, {
            id: 'L0021416a',
            pos: [6006, 3705],
            text: 'The cover of a Wellcome Historical Medical Exhibition booklet, featuring the Egyptian god I-Em-Hetep.'
        }, {
            id: 'L0017437a',
            pos: [6333, 3705],
            text: 'Part of the Wellcome Library’s early printed books stores. Today, the Library holds over 15 000 European books printed before 1701.'
        }, {
            id: 'L0018446a',
            pos: [119, 3818],
            text: 'When this Oxford Street pharmacy was closing down in 1908, Wellcome’s collaborator C J S Thompson acquired much of its contents, before suggesting that they buy the shopfront too. The entire store ended up on display in the Wellcome Historical Medical Museum in Wigmore Street.'
        }, {
            id: 'L0034640a',
            pos: [7079, 3876],
            text: 'Henry Mlinaric’s 1991 design for the remodelled entrance hall of the Wellcome Building on Euston Road, featuring a classical sculpture.'
        }]
    }
};

Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('seized-and-destroyed', function(panelId, panelEl, panelAttrs) {

    var $panel = $(panelEl),
        vector = { x: -10, y: -5 },
        scenes = [];

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

        scenes.push(scene);
    });

    return scenes;

});

Pathways.components.gallery.quacksOfThe18thCentury = {
    data: {
        location: '_assets/galleries/quacks-of-the-18th-century/',
        images: [{
            image: 'L0018661a',
            text: 'Quacks and travelling medicine vendors were a common sight in the 17th and 18th century.'
        }, {
            image: 'M0013726',
            text: 'Some may have hawked snake oil, but this Italian charlatan is selling antidotes to snake poison.'
        }, {
            image: 'V0007356a',
            text: 'Some of them were women: Anne Manning, a quack doctor, outside her cottage with Betty Upton.'
        }, {
            image: 'V0010929a',
            text: 'The tale of ‘Doctor Kill’em or Cure’em’: ‘if you kill ‘em or cure’ em it don’t matter to thee’.'
        }, {
            image: 'V0011005',
            text: 'A sailor with a bandaged eye consulting a quack doctor.'
        }, {
            image: 'V0016170',
            text: 'Doctor Bossey selling his wares on stage.'
        }, {
            image: 'V0016171',
            text: '‘Doctor Botherum’, a caricature probably based on Doctor Bossey, selling his goods to a raucous crowd.'
        }, {
            image: 'V0016188a',
            text: 'Richard ‘Doctor’ Rock using his horse-drawn carriage as a stage. He may be selling his ‘anti-venereal, grand, specifick pill’.'
        }, {
            image: 'V0016215',
            text: 'This vendor puts on a real show, assisted by an elaborately dressed man and an owl.'
        }, {
            image: 'V0016230a',
            text: 'The colourful quack troupe including a donkey, a monkey and a fool blowing a trumpet.'
        }]
    }
};

Pathways.components.gallery.indecentSexualImages = {
    data: {
        location: '_assets/galleries/indecent-sexual-images/',
        images: [{
            image: 'L0038201',
            text: 'Scrotum diseased with syphilis'
        }, {
            image: 'L0038202',
            text: 'Labia diseased with syphilis'
        }, {
            image: 'L0038205',
            text: 'Skin of the scrotum and perineum diseased with syphilis'
        }, {
            image: 'L0038206',
            text: 'Breast diseased with syphilis'
        }, {
            image: 'L0038209',
            text: 'Pubis and penis diseased with syphilis'
        }, {
            image: 'L0060656',
            text: '‘Syphilide vegetante framboisee’'
        }, {
            image: 'L0074250',
            text: 'Combycomata, female perineum'
        }, {
            image: 'V0009962',
            text: 'Hypertrophy of the clitoris'
        }, {
            image: 'V0009971',
            text: 'Syphilitic lesions on the genitalia and torso'
        }, {
            image: 'V0010253',
            text: 'Syphilitic swelling of the knee and testicles'
        }]
    }
};

Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('british-museum', function(panelId, panelEl, panelAttrs) {
    var $panel = $(panelEl);

    var scene = new ScrollScene({
            triggerElement: panelEl,
            triggerHook: 'top',
            duration: Pathways.panelHeight,
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
        });

    return scene;

});

Pathways.components.gallery.madeAFilm = {
    data: {
        location: '_assets/galleries/they-even-made-a-film/',
        images: [{
            image: '01_Maisie_Dick_in_love',
            text: 'Maisie’s Marriage was produced in the summer of 1923. It follows the story of Maisie Burrows, the eldest of ten children, and her beau, fireman Dick Reading.'
        }, {
            image: '02_Drudgery',
            text: 'Despite being very much in love with Dick, Maisie refuses his marriage proposal; she doesn’t want a life of drudgery, with too many children and not enough money.'
        }, {
            image: '03_Jump',
            text: 'Maisie is thrown out of her home and attempts suicide. She ends up as a maid in the household of a happily married couple who have three children.'
        }, {
            image: '04_wedding',
            text: 'When her new home catches fire, Maisie is rescued by Dick and finally agrees to marry him.'
        }, {
            image: '05_credits',
            text: 'The film was promoted as being written by Marie Stopes, though it was actually authored by her co-writer Walter Summers.'
        }, {
            image: '06_Marie Stopes',
            text: 'The association with Stopes – along with the original title of Married Love – was guaranteed to generate a lot of publicity. Five years after she had published her first book, Married Love was still selling hundreds of thousands of copies a year, and Stopes had also written two other successful books.'
        }, {
            image: '07_Film_poster_crop',
            text: 'The Stopes name also caused problems. While a reviewer described the film as nothing more than ‘a straightforward human story of sentimental rather than sexual appeal’, the British Board of Film Censors was concerned about ‘the title, taken in conjunction with the name of the book and the authoress referred to’. It felt the production was ‘propaganda on a subject unsuitable for discussion in a Cinema Theatre.'
        }, ]
    }
};

Pathways.components.letterGallery.marieStopesLetters = {
    data: {
        location: '_assets/galleries/marie-stopes-letters/',
        images: [{
            image: '01-HorridVice-pp-08-HIGHLIGHT',
            textSrc: '/_assets/text/marie-stopes-letters/01-letter.html',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/01-HorridVice-Extract.mp3',
        }, {
            image: '02-HugeAppendage-Transcript-pp-03-HIGHLIGHT',
            textSrc: '/_assets/text/marie-stopes-letters/02-letter.html',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/02-HugeAppendage-Extract.mp3',
        }, {
            image: '03-PositionsDuringPregnancy-pp-01-HIGHLIGHT',
            textSrc: '/_assets/text/marie-stopes-letters/03-letter.html',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/03-PositionsDuringPregnancy-Extract.mp3',
        }, {
            image: '04-PleasureWithoutPregnancy-pp-0102-HIGHLIGHT',
            textSrc: '/_assets/text/marie-stopes-letters/04-letter.html',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/04-PleasureWithoutPregnancy-Extract.mp3',
        }, {
            image: '05-LargeSexOrgans-pp-01-HIGHLIGHT',
            textSrc: '/_assets/text/marie-stopes-letters/05-letter.html',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/05-LargeSexOrgans-Extract.mp3',
        }, {
            image: '06-GoBackHome-pp-01-HIGHLIGHT',
            textSrc: '/_assets/text/marie-stopes-letters/06-letter.html',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/06-GoBackHome-Extract.mp3',
        }, {
            image: '07-FreeingTheCaptives-pp-01-HIGHLIGHT',
            textSrc: '/_assets/text/marie-stopes-letters/07-letter.html',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/07-FreeingTheCaptives.mp3',
        }]
    }
};


Pathways.scrollScenes.Example = function(panel_height, panelID) {

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
        });

    return scene;
};

// Global Nav
(function(w, $) {
    "use strict";

    var $nav = $('.global-navigation'),
        $nav_handle = $nav.find('.handle'),
        state = 'open',
        navHeight = $nav.outerHeight(),
        handleHeight = $nav_handle.outerHeight();

    $nav.on('click', '.handle', function() {
        navHeight = $nav.outerHeight();

        if (state == 'open') {
            $nav.css('transform', 'translate(0, ' + -(navHeight - handleHeight) + 'px)');
            state = 'closed';
        } else {
            $nav.css('transform', 'translate(0, 0)');
            state = 'open';

            // add an event listener on scroll to close the nav if open.
            $(w).one('scroll', function() {
                $nav_handle.trigger('click');
            });
        }
    });

    w.addEventListener('resize', function() {
        navHeight = $nav.outerHeight();
        $nav.css('transform', 'translate(0, ' + -(navHeight - handleHeight) + 'px)');
    });

    w.setTimeout(function() {
        $nav_handle.trigger('click');
    }, 1000);

}(window, $));




// Init Pathways
(function(w, p, ga) {

    function onPathwaysLoad() {

        function initScript(d, s, id, a) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.async = 1;
            js.src = a;
            fjs.parentNode.insertBefore(js, fjs);
        }

        w.___gcfg = {
            parsetags: 'onload'
        };

        initScript(document, 'script', 'facebook-jssdk', "//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=1494497634145827&version=v2.0");
        initScript(document, 'script', 'pth-ga-api', "//apis.google.com/js/platform.js");
        initScript(document, 'script', 'pth-pin-api', "//assets.pinterest.com/js/pinit.js");
        initScript(document, 'script', 'pth-twt-api', "//platform.twitter.com/widgets.js");

        p.components.core.ga.init('[data-ga]');
    }

    p.init(onPathwaysLoad);

}(window, Pathways, ga));

