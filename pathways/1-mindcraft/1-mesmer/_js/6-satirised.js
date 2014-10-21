
Pathways.Scene.Satirised = function(panelID) {
    var news_offset = $(panelID).data('offset-height') ? $(panelID).data('offset-height') : 0;
    
    var video = Pathways.getPanelVideoElement(panelID);

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panel_height + news_offset + 100
        })
        .on('enter', function(e){
            Pathways.autoPlayVideoOnEnter(video, 0, false);
        })
        .on('leave', function(e){
            Pathways.autoStopVideoOnLeave(video, 0, false);
        });

    Pathways.Scenes.push(scene);
}