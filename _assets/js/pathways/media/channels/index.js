console.log('include media/channels/index');

(function(exports, mixer, utils, $) {

    function getSrc(media) {
        if (!media) return 'no media';
        return media.src || media.currentSrc;
    }

    function setMediaTime(media, time) {
        if (!media || typeof time === 'undefined' || isNaN(time)) return;
        console.log('setting media time', time, media.readyState);
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
        setMediaTime(media, config.initTime);
    }

    function setChannelStateOnComplete(media, channel) {
        function onComplete() {
            media.currentTime = 0;
            channel.setState(channel.getState('activeStopped'));
            media.removeEventListener('ended', onComplete);
        }
        media.addEventListener('ended', onComplete);
    }

    function ChannelDefaultState(channel) {
        var self = this;
        self.channel = channel;
    }

    ChannelDefaultState.prototype = {
        play: function(media, config) {},
        stop: function(config) {},
        silence: function() {},
        resume: function() {}
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
    utils.extend(ChannelDefaultState, ChannelInactiveStoppedState);


    function ChannelInactivePlayingState(channel) {
        ChannelDefaultState.call(this, channel);
    }

    ChannelInactivePlayingState.prototype = {
        stop: function() {
            this.channel.setState(this.channel.getState('inactiveStopped'));
        },
        resume: function() {
            console.log('>> resuming:', getSrc(this.channel.currentMedia));
            mixer.fadeIn(this.channel.currentMedia);
            this.channel.setState(this.channel.getState('activePlaying'));
        }
    };
    utils.extend(ChannelDefaultState, ChannelInactivePlayingState);


    function ChannelActiveStoppedState(channel) {
        ChannelDefaultState.call(this, channel);
    }

    ChannelActiveStoppedState.prototype = {
        play: function(media, config) {
            this.channel.currentMedia = media;
            this.channel.currentConfig = config;

            console.log('>> playing:', this.channel.id + ': ', config, getSrc(media));

            setMediaStateAtStart(media, config);
            setChannelStateOnComplete(media, this.channel);

            if (config && config.noFade) {
                media.volume = 1;
                media.play();
            } else {
                mixer.fadeIn(media, 1000);
            }

            this.channel.setState(this.channel.getState('activePlaying'));
        },
        silence: function() {
            this.channel.setState(this.channel.getState('inactiveStopped'));
        }
    };

    utils.extend(ChannelDefaultState, ChannelActiveStoppedState);




    function ChannelActivePlayingState(channel) {
        ChannelDefaultState.call(this, channel);
    }

    ChannelActivePlayingState.prototype = {
        play: function(media, config) {
            var currentMedia = this.channel.currentMedia,
                mediaNotTheSame = (currentMedia !== media),
                currentConfig = this.channel.currentConfig;

            console.log('>> crossfading:', this.channel.id + ': ', getSrc(currentMedia), getSrc(media));

            setMediaStateAtStart(media, config);
            setChannelStateOnComplete(media, this.channel);

            if (config && config.noFade) {
                currentMedia.pause();
                media.volume = 1;
                media.play();
            } else {
                mixer.crossfade(currentMedia, media, 1000, function() {
                    setMediaStateAtEnd(currentMedia, currentConfig);
                });
            }
            this.channel.currentMedia = media;

        },
        stop: function(config) {

            var media = this.channel.currentMedia;
            config = config || this.channel.currentConfig || {};

            console.log('>> stopping:', this.channel.id + ': ', config, getSrc(media));

            if (config && config.noFade) {
                media.pause();
            } else {
                mixer.fadeOut(media, 1000, function() {
                    setMediaStateAtEnd(media, config);
                });
            }


            this.channel.currentMedia = null;
            this.channel.currentConfig = null;

            this.channel.setState(this.channel.getState('activeStopped'));
        },
        silence: function() {
            console.log('>> silencing:', this.channel.id + ': ', getSrc(this.channel.currentMedia));
            mixer.fadeOut(this.channel.currentMedia);
            this.channel.setState(this.channel.getState('inactivePlaying'));
        }
    };
    utils.extend(ChannelDefaultState, ChannelActivePlayingState);



    function Channel(id, config) {
        var self = this;
        self.id = id;
        self.config = config || null;

        self.addState('activeStopped', new ChannelActiveStoppedState(self));
        self.addState('inactiveStopped', new ChannelInactiveStoppedState(self));
        self.addState('activePlaying', new ChannelActivePlayingState(self));
        self.addState('inactivePlaying', new ChannelInactivePlayingState(self));

        self.setState(self.getState('activeStopped'));
    }

    Channel.prototype = {
        addState: function(stateID, state) {
            this.states = this.states || {};
            this.states[stateID] = state;
        },
        setState: function(state) {
            //console.log('setting state', state.constructor.name);
            if (this.state === state) return;
            this.state = state;
        },
        getState: function(stateID) {
            return this.states[stateID];
        },
        silence: function() {
            this.state.silence();
        },
        resume: function() {
            this.state.resume();
        },

        play: function(media, config) {
            console.debug('channel -', this.id, '- play', getSrc(media));
            this.state.play(media, config);
        },
        stop: function(config) {
            console.debug('channel -', this.id, '- stop', getSrc(this.currentMedia));
            this.state.stop(config);
        }
    };


    exports.channels = {
        Channel: Channel,
        getChannel: getChannel = function(id, config) {
            return new Channel(id, config);
        }
    };


}(Pathways.media, Pathways.media.mixer, Pathways.utils, jQuery));
