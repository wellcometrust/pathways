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

        disable: function() {
            console.log('disabling media');
        }

    };

}(Pathways.media, Pathways.media.model, Pathways.media.vol, Pathways.media.channels.ctrl, jQuery));
