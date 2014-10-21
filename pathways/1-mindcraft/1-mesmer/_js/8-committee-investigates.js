
Pathways.Scene.CommitteeInvestigates = function(panelID) {

    var video = Pathways.getPanelVideoElement(panelID);

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panel_height + 100
        })
        .on('enter', function(e){
            Pathways.autoPlayVideoOnEnter(video);
        })
        .on('leave', function(e){
            Pathways.autoStopVideoOnLeave(video);
        });

    Pathways.Scenes.push(scene);
}