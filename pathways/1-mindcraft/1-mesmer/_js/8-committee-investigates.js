
Pathways.Scene.CommitteeInvestigates = function() {
    var scene = new ScrollScene({
            triggerElement: '#committee-investigates',
            duration:       Pathways.panel_height + 100
        })
        .on('enter', function(e) {
            var ci_vid = _('#committee-investigates video');
            ci_vid.play();
        })
        .on('leave', function(e) {
            var ci_vid = _('#committee-investigates video');
            ci_vid.pause();
            ci_vid.currentTime = 0;
        });

    Pathways.Scenes.push(scene);
}