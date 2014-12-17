console.log('include media/mixer/index');
/***
 *   Media audio mixer
 */
(function(exports, w, model, $){

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
            media.muted = model.getIsMuted();
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


    function crossfade(fadeOutMedia, fadeInMedia, delay, fadeOutCompleteCallback, fadeInCompleteCallback) {
        delay = delay || 1000;

        if (fadeOutMedia === fadeInMedia) {
            if (fadeOutCompleteCallback) w.setTimeout(fadeOutCompleteCallback, delay);
            if (fadeInCompleteCallback) w.setTimeout(fadeInCompleteCallback, delay);
            return;
        }

        fadeOut(fadeOutMedia, delay, fadeOutCompleteCallback);

        fadeIn(fadeInMedia, delay, fadeInCompleteCallback);

    }

    exports.mixer = {
        crossfade : crossfade,
        fadeIn : fadeIn,
        fadeOut : fadeOut
    };


}(Pathways.media, window, Pathways.media.model, jQuery));
