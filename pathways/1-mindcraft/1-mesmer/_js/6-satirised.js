
Pathways.Scene.Satirised = function() {
    var news_offset = $('#satirised').data('offset-height') ? $('#satirised').data('offset-height') : 0;
    
    var videoStr = '#satirised video';

    var videoPlayOnEnter = Pathways.autoPlayVideoOnEnter(videoStr);
    var videoStopOnLeave = Pathways.autoStopVideoOnLeave(videoStr);
    
    var scene = new ScrollScene({
            triggerElement: '#satirised',
            duration:       Pathways.panel_height + news_offset + 100
        })
        .on('enter', videoPlayOnEnter)
        .on('leave', videoStopOnLeave);

    Pathways.Scenes.push(scene);
}