
Pathways.Scene.Airloom = function() {

    var videoStr = '#airloom video';

    var videoPlayOnEnter = Pathways.autoPlayVideoOnEnter(videoStr, 0.4);
    var videoStopOnLeave = Pathways.autoStopVideoOnLeave(videoStr, 0.4);

    var scene = new ScrollScene({
            triggerElement: '#airloom',
            duration:       Pathways.panel_height
        })
        .on('enter', videoPlayOnEnter)
        .on('leave', videoStopOnLeave)

    Pathways.Scenes.push(scene);
}