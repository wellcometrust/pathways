
Pathways.Scene.CommitteeInvestigates = function() {

    var videoStr = '#committee-investigates video';

    var videoPlayOnEnter = Pathways.autoPlayVideoOnEnter(videoStr);
    var videoStopOnLeave = Pathways.autoStopVideoOnLeave(videoStr);

    var scene = new ScrollScene({
            triggerElement: '#committee-investigates',
            duration:       Pathways.panel_height + 100
        })
        .on('enter', videoPlayOnEnter)
        .on('leave', videoStopOnLeave);

    Pathways.Scenes.push(scene);
}