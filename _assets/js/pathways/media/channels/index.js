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
