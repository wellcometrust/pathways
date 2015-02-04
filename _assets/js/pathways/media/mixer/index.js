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
