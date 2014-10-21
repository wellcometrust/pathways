
Pathways.Scene.MesmersSalon = function(panelID) {

    var audio = Pathways.getPanelAudioElement(panelID);
    
    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       (Pathways.panel_height - 100),
            offset:         100
        })
        .on('enter', function(e) {                          
            Pathways.LoadPanelAudio(audio);                     

            _('.crop-zoom').style['position'] = 'fixed';
            TweenMax.to('.crop-zoom', 0.2, { opacity: 1 }); // Fade in
        })
        .on('leave', function(e) {
            Pathways.UnloadPanelAudio(audio);

            TweenMax.to('.crop-zoom', 0.2, { opacity: 0 }); // Fade out
            
            setTimeout(function() {
                _('.crop-zoom').style['position'] = 'absolute';
            }, 200);
        })

    Pathways.Scenes.push(scene);
}