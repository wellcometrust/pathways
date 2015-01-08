console.log('include media/channels/ctrl');
(function(exports, getChannel) {

    var CHANNEL_IDS = {
            global: 'global',
            video: 'video',
            panel: 'panel',
            component: 'component',
            fx: 'fx',
        },
        modes = {
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
            scroll: {
                channels: {
                    global: getChannel(CHANNEL_IDS.global),
                    video: getChannel(CHANNEL_IDS.video, {
                        exclude: [CHANNEL_IDS.global, CHANNEL_IDS.panel]
                    }),
                    component: getChannel(CHANNEL_IDS.component, {
                        exclude: [CHANNEL_IDS.global, CHANNEL_IDS.panel, CHANNEL_IDS.video, CHANNEL_IDS.fx]
                    }),
                    panel: getChannel(CHANNEL_IDS.panel, {
                        exclude: [CHANNEL_IDS.global]
                    }),
                    fx: getChannel(CHANNEL_IDS.fx)
                }
            }
        },
        mode;

    function getMode() {
        return {
            channels: {
                global: getChannel(CHANNEL_IDS.global),
                video: getChannel(CHANNEL_IDS.video, {
                    exclude: [CHANNEL_IDS.global, CHANNEL_IDS.panel]
                }),
                component: getChannel(CHANNEL_IDS.component, {
                    exclude: [CHANNEL_IDS.global, CHANNEL_IDS.panel, CHANNEL_IDS.video, CHANNEL_IDS.fx]
                }),
                panel: getChannel(CHANNEL_IDS.panel, {
                    exclude: [CHANNEL_IDS.global]
                }),
                fx: getChannel(CHANNEL_IDS.fx)
            }
        };
        //TODO: update for change in functionality level
    }

    function init() {
        mode = getMode();
    }

    function getChannelById(channelID) {
        var channel = mode.channels[channelID];
        if (!channel) return console.warn('[Pathways Channel] [getChannelById] no channel found with id \'' + channelID + '\'');
        return channel;
    }

    function resetChannels() {
        var channelIDs =[CHANNEL_IDS.global, CHANNEL_IDS.panel, CHANNEL_IDS.video, CHANNEL_IDS.component, CHANNEL_IDS.fx];
        // console.log('channel resetChannels');
        function setChannelAc(channelID) {
            // console.log('setting channel active', channelID);
            var channel = getChannelById(channelID);
            channel.resume();
        }
        channelIDs.forEach(setChannelAc);
    }

    function setChannelsInactive(config) {
        if (!config || !config.exclude) return;
        // console.log('channel setChannelsInactive', config.exclude);
        function setChannelIn(channelID) {
            // console.log('setting channel inactive', channelID);
            var channel = getChannelById(channelID);
            channel.silence();
        }
        if (config.exclude && config.exclude.length > 0) {
            config.exclude.forEach(setChannelIn);
        }
    }

    function playMediaWithChannel(media, channelID, config) {
        if (!media) return;
        var channel = getChannelById(channelID);

        var excludeConfig = (config && config.exclude) ? config : channel.config;
        config = config || channel.config;

        setChannelsInactive(excludeConfig);
        channel.play(media, config);
    }

    function stopChannel(channelID, config) {
        var channel = getChannelById(channelID);
        if (!channel.currentMedia) return;
        channel.stop(config);
        resetChannels();
    }

    function playMediaOnPanelChannel(media, config) {
        playMediaWithChannel(media, CHANNEL_IDS.panel, config);
    }

    function stopPanelChannel(config) {
        stopChannel(CHANNEL_IDS.panel, config);
    }

    function playMediaOnGlobalChannel(media, config) {
        playMediaWithChannel(media, CHANNEL_IDS.global, config);
    }

    function stopGlobalChannel(config) {
        stopChannel(CHANNEL_IDS.global, config);
    }

    function playMediaOnVideoChannel(media, config) {
        playMediaWithChannel(media, CHANNEL_IDS.video, config);
    }

    function stopVideoChannel(config) {
        stopChannel(CHANNEL_IDS.video, config);
    }

    exports.ctrl = {
        init: init,
        playMediaWithChannel: playMediaWithChannel,
        stopChannel: stopChannel,
        playMediaOnPanelChannel: playMediaOnPanelChannel,
        stopPanelChannel: stopPanelChannel,
        playMediaOnGlobalChannel: playMediaOnGlobalChannel,
        stopGlobalChannel: stopGlobalChannel,
        playMediaOnVideoChannel: playMediaOnVideoChannel,
        stopVideoChannel: stopVideoChannel
    };

}(Pathways.media.channels, Pathways.media.channels.getChannel));
