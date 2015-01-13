

(function(exports, getMediaAudio, mixer, utils, $) {

    function getSrc(media) {
        if (!media) return 'no media';
        return media.src || media.currentSrc;
    }

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
        setMediaTime(media, config.initTime);
    }


    function setChannelStateOnComplete(media, channel) {
        function onComplete() {

            media.currentTime = 0;
            channel.removeMediaDefinitionsByMedia(media);

            if (!channel.hasMediaDefinitions()) {
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
    }

    function noop() {}

    function getPlayStrategy(media, config, currentDefs, _onStopComplete) {
        var delay = parseInt(((config && config.delay) || 1000), 10),
            noFade = (config && config.noFade),
            single = !currentDefs,
            noInterrupt = (config && config.noInterrupt),
            onStopComplete = _onStopComplete || function() {},
            result;

        if (!media.paused) return noop;

        // (single && noFade) || ( !single && noInterrupt && noFade)
        function singlePlay() {
            // console.debug('>> singlePlay ['+ channel.id + '] ', getSrc(currentMedia), getSrc(media));
            mixer.play(media);
        }

        // (single && !noFade) || ( !single && noInterrupt && !noFade)
        function singleFade() {
            // console.debug('>> singleFade ['+ channel.id + '] ', getSrc(currentMedia), getSrc(media));
            mixer.fadeIn(media, delay);
        }

        // !single && !noInterrupt && noFade
        function crossPlay() {
            // console.debug('>> crossPlay ['+ channel.id + '] ', getSrc(currentMedia), getSrc(media));
            mixer.crossplay(null, media, onStopComplete);
            currentDefs.forEach(function(def) {
                mixer.stop(def.media);
            });
        }

        // !single && !noInterrupt && !noFade
        function crossFade() {
            // console.debug('>> crossFade ['+ channel.id + '] ', getSrc(currentMedia), getSrc(media));
            mixer.crossfade(null, media, delay, onStopComplete);
            currentDefs.forEach(function(def) {
                mixer.fadeOut(def.media, delay);
            });
        }

        if (single) {
            if (noFade) result = singlePlay;
            else result = singleFade;
        } else {
            if (noInterrupt) {
                if (noFade) result = singlePlay;
                else result = fadeIn;
            } else {
                if (noFade) result = crossPlay;
                else result = crossFade;
            }
        }

        return result;

    }

    function getStopStrategy(media, config, _onStopComplete) {
        var delay = parseInt(((config && config.delay) || 1000), 10),
            noFade = config && config.noFade,
            onStopComplete = _onStopComplete || function() {},
            result;

        if (media.paused) return noop;

        function singleStop() {
            mixer.stop(media);
            onStopComplete();
        }

        function singleFade() {
            mixer.fadeOut(media, delay, onStopComplete);
        }

        if (noFade) {
            result = singleStop;
        } else {
            result = singleFade;
        }

        return result;
    }

    function ChannelDefaultState(channel) {
        var self = this;
        self.channel = channel;
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
    utils.extend(ChannelDefaultState, ChannelInactiveStoppedState);


    function ChannelInactivePlayingState(channel) {
        ChannelDefaultState.call(this, channel);
    }

    ChannelInactivePlayingState.prototype = {
        stopAll: function() {
            this.channel.removeAllMediaDefinitions();
            this.channel.setState(this.channel.getState('inactiveStopped'));
        },
        stop: function(media) {
            this.channel.removeMediaDefinitionsByMedia(media);
            if (!this.channel.hasMediaDefinitions()) {
                this.channel.setState(this.channel.getState('inactiveStopped'));
            }
        },
        resume: function() {
            var defs = this.channel.getAllMediaDefinitions();
            defs.forEach(function(def) {
                getPlayStrategy(def.media, def.config)();
            });

            this.channel.setState(this.channel.getState('activePlaying'));
        }
    };
    utils.extend(ChannelDefaultState, ChannelInactivePlayingState);


    function ChannelActiveStoppedState(channel) {
        ChannelDefaultState.call(this, channel);
    }



    ChannelActiveStoppedState.prototype = {
        play: function(media, config) {
            var def = this.channel.addMediaDefinition(media, config);


            setMediaStateAtStart(media, config);
            setChannelStateOnComplete(media, this.channel);

            getPlayStrategy(media, config)();

            this.channel.setState(this.channel.getState('activePlaying'));
            return def;
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
            var lastDefs = this.channel.getAllMediaDefinitions(),
                newDef;

            newDef = this.channel.addMediaDefinition(media, config);

            setMediaStateAtStart(media, config);
            setChannelStateOnComplete(media, this.channel);

            getPlayStrategy(media, config, lastDefs, function() {
                lastDefs.forEach(function(def) {
                    setMediaStateAtEnd(def.media, def.config);
                });
            })();

            return newDef;
        },
        stopAll: function(config) {

            var defs = this.channel.removeAllMediaDefinitions();

            defs.forEach(function(def) {
                config = config || def.config || {};

                getStopStrategy(def.media, config, function() {
                    setMediaStateAtEnd(def.media, config);
                })();
            });

            this.channel.setState(this.channel.getState('activeStopped'));
        },
        stop: function(media, config) {

            var defsAll = this.channel.getAllMediaDefinitions();

            var defs = this.channel.removeMediaDefinitionsByMedia(media);
            var defsAll2 = this.channel.getAllMediaDefinitions();

            defs.forEach(function(def) {
                config = config || def.config || {};
                getStopStrategy(def.media, config, function() {
                    setMediaStateAtEnd(def.media, config);
                })();
            });

            if (!this.channel.hasMediaDefinitions()) {
                this.channel.setState(this.channel.getState('activeStopped'));
            }

        },
        silence: function() {
            var defs = this.channel.getAllMediaDefinitions();
            defs.forEach(function(def) {
                getStopStrategy(def.media, def.config)();
            });
            this.channel.setState(this.channel.getState('inactivePlaying'));
        }
    };
    utils.extend(ChannelDefaultState, ChannelActivePlayingState);



    function Channel(id, config) {

        this.id = id;
        this.config = config || null;
        this.mediaDefinitions = [];

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
            this.state.silence();
        },
        resume: function() {
            this.state.resume();
        },
        play: function(media, config) {
            // console.debug('channel -', this.id, '- play', getSrc(media));
            return this.state.play(media, config);
        },
        stopAll: function(config) {
            // console.debug('channel -', this.id, '- stop', getSrc(this.currentMedia));
            this.state.stopAll(config);
        },
        stop: function(media, config) {
            // console.debug('channel -', this.id, '- stop', getSrc(this.currentMedia));
            this.state.stop(media, config);
        },


        addMediaDefinition: function(media, config) {
            var definition = {
                media: media,
                config: config
            };
            this.mediaDefinitions.push(definition);
            return definition;
        },
        removeAllMediaDefinitions: function() {
            var defs = [].concat(this.mediaDefinitions);
            this.mediaDefinitions = [];
            return defs;
        },
        removeMediaDefinitions: function(defs) {
            var list = [].concat(this.mediaDefinitions),
                removed = [];

            defs.forEach(function(def) {
                var l = utils.removeItemFromArray(def, list);
                if (l) removed.push(l);
            });
            this.mediaDefinitions = list;
            return removed;
        },
        removeMediaDefinitionsByMedia: function(media) {
            var defs = this.getDefinitionsFromMedia(media);
            return this.removeMediaDefinitions(defs);
        },
        getAllMediaDefinitions: function() {
            var defs = [].concat(this.mediaDefinitions);
            return defs;
        },
        getDefinitionsFromMedia: function(media) {
            var mediaDefs = this.mediaDefinitions;
            mediaList = [].concat(media);

            var defs = mediaList.map(function(medium) {
                return mediaDefs.filter(function(def) {
                    return def.media === medium;
                })[0];
            }) || [];

            return defs;
        },
        removeMediaDefinition: function(definition) {
            return utils.removeItemFromArray(definition, this.mediaDefinitions);
        },
        hasMediaDefinitions: function() {
            return this.mediaDefinitions.length > 0;
        }
    };


    exports.channels = {
        Channel: Channel,
        getChannel: getChannel = function(id, config) {
            return new Channel(id, config);
        }
    };


}(Pathways.media, Pathways.media.getMediaAudio, Pathways.media.mixer, Pathways.utils, jQuery));
