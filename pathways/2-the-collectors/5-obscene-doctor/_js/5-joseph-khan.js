
Pathways.Scene.JosephKhan = function() {
    var scene = new ScrollScene({
            triggerElement: '#joseph-khan',
            duration:       Pathways.panelHeight + 100
        })
        .on('enter', function(e) {
            var ci_vid = _('#joseph-khan video');
            ci_vid.play();
        })
        .on('leave', function(e) {
            var ci_vid = _('#joseph-khan video');
            ci_vid.pause();
            ci_vid.currentTime = 0;
        });

    return scene;
};
