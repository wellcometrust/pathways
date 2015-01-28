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
