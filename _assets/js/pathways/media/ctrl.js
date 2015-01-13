console.log('include media/ctrl');
(function(exports, model, vol, channelCtrl, $) {

    function init() {

        channelCtrl.init();

    }


    exports.ctrl = $.extend({}, channelCtrl, {
        init: init,
        disable: function() {
            console.log('disabling media');
            // TODO: disabling media
        }
    });


}(Pathways.media, Pathways.media.model, Pathways.media.vol, Pathways.media.channels.ctrl, jQuery));
