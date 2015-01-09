console.log('include media/ctrl');
(function(exports, model, vol, channelCtrl) {

    function init() {

        channelCtrl.init();

    }


    exports.ctrl = {

        init: init,

        playMediaWithChannel: channelCtrl.playMediaWithChannel,
        stopChannel: channelCtrl.stopChannel,

        playMediaOnPanelChannel: channelCtrl.playMediaOnPanelChannel,
        stopPanelChannel: channelCtrl.stopPanelChannel,

        playMediaOnGlobalChannel: channelCtrl.playMediaOnGlobalChannel,
        stopGlobalChannel: channelCtrl.stopGlobalChannel,

        playMediaOnVideoChannel: channelCtrl.playMediaOnVideoChannel,
        stopVideoChannel: channelCtrl.stopVideoChannel,

        playMediaOnComponentChannel: channelCtrl.playMediaOnComponentChannel,
        stopComponentChannel: channelCtrl.stopComponentChannel,

        playMediaOnFxChannel: channelCtrl.playMediaOnFxChannel,
        stopFxChannel: channelCtrl.stopFxChannel,

        disable: function() {
            console.log('disabling media');
            // TODO: disabling media
        }

    };

}(Pathways.media, Pathways.media.model, Pathways.media.vol, Pathways.media.channels.ctrl, jQuery));
