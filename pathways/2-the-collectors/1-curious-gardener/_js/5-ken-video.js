
Pathways.Scene.KenVideo = function() {

    var $panel  = $('#ken-video'),
        video   = $panel.find('video').get(0);

    var scene = new ScrollScene({
            triggerElement: $panel,
            duration:       Pathways.panel_height + 100
        })
        .on('enter', function(e) {
            video.play();
        })
        .on('leave', function(e) {
            video.pause();
            video.currentTime = 0;
        });

    Pathways.Scenes.push(scene);
}