console.log('include media/mixer/index');
/***
 *   Media audio mixer
 */
(function(exports, w, vol, $) {

    function fadeOut(media, delay, callback) {
        delay = delay || 1000;
        if (media && (typeof media !== 'undefined')) {
            $(media).stop(false, true);
            $(media).animate({
                volume: 0
            }, {
                duration: delay,
                complete: function() {
                    this.pause();
                    if (callback) {
                        callback();
                        callback = null;
                    }
                }
            });
        }
    }

    function fadeIn(media, delay, callback) {
        delay = delay || 1000;
        if (media && (typeof media !== 'undefined')) {
            $(media).stop(false, true);
            media.volume = 0;
            media.muted = vol.isMuted();
            media.play();
            $(media).animate({
                volume: 1
            }, {
                duration: delay,
                complete: function() {
                    if (callback) {
                        callback();
                        callback = null;
                    }
                }
            });
        }
    }

    function play(media) {
        if (!media) return;
        media.muted = vol.isMuted();
        media.volume = 1;
        media.play();
    }

    function stop(media) {
        if (media) media.pause();
    }

    function crossplay(oldMedia, newMedia, callback) {
        play(newMedia);
        stop(oldMedia);
        callback();
    }

    function crossfade(fadeOutMedia, fadeInMedia, delay, fadeOutCompleteCallback, fadeInCompleteCallback) {
        delay = delay || 1000;

        if (fadeOutMedia === fadeInMedia) {
            if (fadeOutCompleteCallback) w.setTimeout(fadeOutCompleteCallback, delay);
            if (fadeInCompleteCallback) w.setTimeout(fadeInCompleteCallback, delay);
            return;
        }

        if (fadeOutMedia !== null && typeof fadeOutMedia !== 'undefined') {
            fadeOut(fadeOutMedia, delay, fadeOutCompleteCallback);
        } else {
            if (fadeOutCompleteCallback) w.setTimeout(fadeOutCompleteCallback, delay);
        }

        if (fadeInMedia !== null && typeof fadeInMedia !== 'undefined') {
            fadeIn(fadeInMedia, delay, fadeInCompleteCallback);
        } else {
            if (fadeInCompleteCallback) w.setTimeout(fadeInCompleteCallback, delay);
        }
    }

    exports.mixer = {
        crossfade: crossfade,
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        play: play,
        stop: stop,
        crossplay: crossplay
    };


}(Pathways.media, window, Pathways.media.vol, jQuery));
