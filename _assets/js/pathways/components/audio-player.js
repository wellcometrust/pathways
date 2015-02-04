(function(exports, audioPlayer, $) {

    exports.audioPlayer = function(element, data, src) {

        src = src || $(element).data('src');
        var audio = new Audio(src);

        var playerCtrl = audioPlayer.getPlayerCtrl(audio);
        var playerView = audioPlayer.getPlayerView(element, playerCtrl);
        playerCtrl.addView(playerView);

        playerCtrl.enable();
    };

}(Pathways.components, Pathways.components.core.audioPlayer, jQuery));
