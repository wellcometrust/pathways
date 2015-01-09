console.log('include core audio-player');

(function(exports, viewControl, mediaCtrl, vol, volViews, utils, $) {

    var fallbackDuration = 600;


    function getPlay(audio, linkedView, timeUpdate) {
        return function play() {
            if (!audio.paused) return;
            vol.addView(linkedView);
            audio.addEventListener('timeupdate', timeUpdate);
            console.log(audio.currentTime);
            if (audio.currentTime !== 0) {
                mediaCtrl.playMediaOnComponentChannel(audio, { noFade: true });
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
            mediaCtrl.stopComponentChannel({ noFade: true });
            audio.addEventListener('pause', onPause);
        };
    }

    function getStop(audio, linkedView, timeUpdate) {
        return function stop() {
            vol.removeView(linkedView);
            mediaCtrl.stopComponentChannel();
            audio.removeEventListener('timeupdate', timeUpdate);
            timeUpdate();
        };
    }

    function getTimeUpdate(audio, viewCtrl) {

        return function(e) {
            console.log('timeupdate', audio.src);
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
