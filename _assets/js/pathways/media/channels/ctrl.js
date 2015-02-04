(function(exports, model, utils) {

    var extend = utils.extend,
        unique = utils.unique;

    function init() {
        model.init();
    }

    function getSilenceMethod(silencer) {
        return function silenceChannel(channelID) {
            var channel = model.getChannelById(channelID);
            silencer.addSilencee(channel.silencer);
        };
    }

    function silenceChannels(channelsToExclude, silencer) {
        if (!channelsToExclude || channelsToExclude === 'none') return;
        if (channelsToExclude === 'all') channelsToExclude = channelList;
        if (channelsToExclude.length === 0) return;

        channelsToExclude.forEach(getSilenceMethod(silencer));
    }

    function playMediaOnChannel(media, channelID, config) {
        if (!media) return;
        var channel = model.getChannelById(channelID);
        config = extend({}, channel.config, config);
        silenceChannels(config.exclude, channel.silencer);
        channel.play(media, config);
    }

    function stopChannel(channelID, config) {
        var channel = model.getChannelById(channelID);
        if (channel.isEmpty()) return;
        config = extend({}, channel.config, config);

        channel.stopAll(config);
    }

    function stopMediaOnChannel(media, channelID, config) {
        if (!media) return;
        var channel = model.getChannelById(channelID);
        config = extend({}, channel.config, config);
        channel.stop(media, config);
    }

    function playMediaOnPanelChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.panel, config);
    }

    function stopMediaOnPanelChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.panel, config);
    }

    function stopPanelChannel(config) {
        stopChannel(model.CHANNEL_IDS.panel, config);
    }

    function playMediaOnGlobalChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.global, config);
    }

    function stopMediaOnGlobalChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.global, config);
    }

    function stopGlobalChannel(config) {
        stopChannel(model.CHANNEL_IDS.global, config);
    }

    function playMediaOnVideoChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.video, config);
    }

    function stopMediaOnVideoChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.video, config);
    }

    function stopVideoChannel(config) {
        stopChannel(model.CHANNEL_IDS.video, config);
    }

    function playMediaOnComponentChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.component, config);
    }

    function stopMediaOnComponentChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.component, config);
    }

    function stopComponentChannel(config) {
        stopChannel(model.CHANNEL_IDS.component, config);
    }

    function playMediaOnFxChannel(media, config) {
        playMediaOnChannel(media, model.CHANNEL_IDS.fx, config);
    }

    function stopMediaOnFxChannel(media, config) {
        stopMediaOnChannel(media, model.CHANNEL_IDS.fx, config);
    }

    function stopFxChannel(config) {
        stopChannel(model.CHANNEL_IDS.fx, config);
    }

    exports.ctrl = {
        init: init,

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

}(Pathways.media.channels, Pathways.media.channels.model, Pathways.utils));
