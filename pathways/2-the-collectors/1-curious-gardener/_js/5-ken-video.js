
Pathways.scrollScenes.KenVideo = function(panelID) {

    var $panel  = $(panelID),
        video   = $panel.find('video').get(0);

    var scene = new ScrollScene({
            triggerElement: $panel,
            duration:       Pathways.panelHeight + 100
        })
        .on('enter', function(e) {
            video.play();
        })
        .on('leave', function(e) {
            video.pause();
            video.currentTime = 0;
        });

    return scene;
};
