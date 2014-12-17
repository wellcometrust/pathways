console.log('include media/ctrl');
(function(exports, model, cookies, channelCtrl) {

    function init() {
        mute(cookies.getCookieOrDefaultValBool('mute'));
        channelCtrl.init();
    }

    function mute(doMute) {
        if (doMute === model.getIsMuted()) return;

        model.setMuted(doMute);

        $('video, audio').each(function() {
            this.muted = doMute;
        });

        cookies.setCookieFromBool('mute', doMute);
    }

    function disable() {
        $('video, audio').each(function() {
            this.muted = true;
        });
    }

    exports.ctrl = {

        init: init,
        mute: mute,
        disable: disable,
        isMuted: model.getIsMuted,

        playMediaWithChannel: channelCtrl.playMediaWithChannel,
        stopChannel: channelCtrl.stopChannel,
        playMediaOnPanelChannel: channelCtrl.playMediaOnPanelChannel,
        stopPanelChannel: channelCtrl.stopPanelChannel,
        playMediaOnGlobalChannel: channelCtrl.playMediaOnGlobalChannel,
        stopGlobalChannel: channelCtrl.stopGlobalChannel,
        playMediaOnVideoChannel: channelCtrl.playMediaOnVideoChannel,
        stopVideoChannel: channelCtrl.stopVideoChannel


    };

}(Pathways.media, Pathways.media.model, Pathways.cookieManager, Pathways.media.channels.ctrl, jQuery));
