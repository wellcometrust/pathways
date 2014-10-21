
Pathways.Scene.Airloom = function(panelID) {

    var videoStr = panelID + ' video';

    var videoPlayOnEnter = Pathways.autoPlayVideoOnEnter(videoStr, 0.4);
    var videoStopOnLeave = Pathways.autoStopVideoOnLeave(videoStr, 0.4);

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panel_height
        })
        .on('enter', videoPlayOnEnter)
        .on('leave', videoStopOnLeave)

    Pathways.Scenes.push(scene);
}