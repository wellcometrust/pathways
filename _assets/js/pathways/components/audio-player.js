(function(components, audioPlayer, $) {

    components.create('audio-player', function(element, data, src) {
        console.log('data', data)
        src = src || $(element).data('src');
        var audio = new Audio(src);

        var playerCtrl = audioPlayer.getPlayerCtrl(audio);
        var playerView = audioPlayer.getPlayerView(element, playerCtrl);
        playerCtrl.addView(playerView);

        playerCtrl.enable();
    });

}(Pathways.components, Pathways.components.core.audioPlayer, jQuery));
