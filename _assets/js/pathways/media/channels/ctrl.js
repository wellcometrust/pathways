console.log('include media/channels/ctrl');
(function(exports, getChannel) {

    var CHANNEL_IDS = {
            global: 'global',
            video: 'video',
            panel: 'panel',
            component: 'component',
            fx: 'fx',
        },
        configs = {
            global: {
                exclude: null
            },
            video: {
                exclude: [CHANNEL_IDS.global, CHANNEL_IDS.panel]
            },
            component: {
                exclude: [CHANNEL_IDS.global, CHANNEL_IDS.panel, CHANNEL_IDS.video]
            },
            panel: {
                exclude: [CHANNEL_IDS.global]
            },
            fx: {
                exclude: null,
                noFade: true,
                noInterrupt: true
            }
        },
        // modes = {
        // basic: {
        //     channels: {
        //         global: getChannel(),
        //         video: getChannel({ exclude: [CHANNEL_IDS.global]}),
        //     }
        // },
        // component: {
        //     channels: {
        //         global: getChannel(),
        //         video: getChannel({ exclude: [CHANNEL_IDS.global]}),
        //         component : getChannel({ exclude: [CHANNEL_IDS.global, CHANNEL_IDS.video]}),
        //     }
        // },
        // scroll: {
        //     channels: {
        //         global: getChannel(CHANNEL_IDS.global, configs.global),
        //         video: getChannel(CHANNEL_IDS.video, configs.video),
        //         component: getChannel(CHANNEL_IDS.component, configs.component),
        //         panel: getChannel(CHANNEL_IDS.panel, configs.panel),
        //         fx: getChannel(CHANNEL_IDS.fx, configs.fx)
        //     }
        // }
        // },
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
        if (channels.hasOwnProperty(channelID)) return console.warn('[Pathways Channel] [addChannel] channel with id \'' + channelID + '\' already exists')
        channels[channelID] = getChannel(channelID, config);
    }

    function getChannelById(channelID) {
        var channel = channels[channelID];
        if (!channel) return console.warn('[Pathways Channel] [getChannelById] no channel found with id \'' + channelID + '\'');
        return channel;
    }

    function resetChannels() {
        var channelIDs = [CHANNEL_IDS.global, CHANNEL_IDS.panel, CHANNEL_IDS.video, CHANNEL_IDS.component, CHANNEL_IDS.fx];
        function setChannelAc(channelID) {
            var channel = getChannelById(channelID);
            channel.resume();
        }
        channelIDs.forEach(setChannelAc);
    }

    function setChannelsInactive(channelsToExclude) {
        if (!channelsToExclude || channelsToExclude.length === 0) return;
        function setChannelIn(channelID) {
            var channel = getChannelById(channelID);
            channel.silence();
        }
        channelsToExclude.forEach(setChannelIn);
    }

    function playMediaOnChannel(media, channelID, config) {
        if (!media) return;
        var channel = getChannelById(channelID);
        config = config || channel.config; //TODO: merge instead of overwrite
        var channelsToExclude = (config && config.exclude) ? config.exclude : channel.config.exclude;

        setChannelsInactive(channelsToExclude);
        channel.play(media, config);
    }

    function stopChannel(channelID, config) {
        var channel = getChannelById(channelID);
        config = config || channel.config;
        if (!channel.hasMediaDefinitions()) return;
        channel.stopAll(config);
        resetChannels();
    }

    function stopMediaOnChannel(media, channelID, config) {
        if (!media) return;
        var channel = getChannelById(channelID);
        config = config || channel.config;
        channel.stop(media, config);
        resetChannels();
    }

    function playMediaOnPanelChannel(media, config) {
        playMediaOnChannel(media, CHANNEL_IDS.panel, config);
    }

    function stopMediaOnPanelChannel(media, config) {
        stopMediaOnChannel(media, CHANNEL_IDS.panel, config);
    }

    function stopPanelChannel(config) {
        stopChannel(CHANNEL_IDS.panel, config);
    }

    function playMediaOnGlobalChannel(media, config) {
        playMediaOnChannel(media, CHANNEL_IDS.global, config);
    }

    function stopMediaOnGlobalChannel(media, config) {
        stopMediaOnChannel(media, CHANNEL_IDS.global, config);
    }

    function stopGlobalChannel(config) {
        stopChannel(CHANNEL_IDS.global, config);
    }

    function playMediaOnVideoChannel(media, config) {
        playMediaOnChannel(media, CHANNEL_IDS.video, config);
    }

    function stopMediaOnVideoChannel(media, config) {
        stopMediaOnChannel(media, CHANNEL_IDS.video, config);
    }

    function stopVideoChannel(config) {
        stopChannel(CHANNEL_IDS.video, config);
    }

    function playMediaOnComponentChannel(media, config) {
        playMediaOnChannel(media, CHANNEL_IDS.component, config);
    }

    function stopMediaOnComponentChannel(media, config) {
        stopMediaOnChannel(media, CHANNEL_IDS.component, config);
    }

    function stopComponentChannel(config) {
        stopChannel(CHANNEL_IDS.component, config);
    }

    function playMediaOnFxChannel(media, config) {
        playMediaOnChannel(media, CHANNEL_IDS.fx, config);
    }

    function stopMediaOnFxChannel(media, config) {
        stopMediaOnChannel(media, CHANNEL_IDS.fx, config);
    }

    function stopFxChannel(config) {
        stopChannel(CHANNEL_IDS.fx, config);
    }

    exports.ctrl = {
        init: init,
        addChannel: addChannel,
        removeChannel: function() {},

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

}(Pathways.media.channels, Pathways.media.channels.getChannel));
