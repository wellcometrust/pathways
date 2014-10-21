
Pathways.Scene.MagnetisedTrees = function(panelID) {
    
    // var tree_offset = $('#magnetised-trees').data('offset-height') ? $('#magnetised-trees').data('offset-height') : 0;
    var audio = Pathways.getPanelAudioElement(panelID);    


    var scene1 = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panel_height
        })
        .on('enter', function(e) {
            Pathways.LoadPanelAudio(audio);
            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to(panelID + ' .black-strip', .4, { y: 0 }); // Scroll up
                createjs.Ticker.addEventListener("tick", stage);
            }
        })
        .on('leave', function(e) {
            Pathways.UnloadPanelAudio(audio);
            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to(panelID + ' .black-strip', .2, { y: Pathways.panel_height }); // scroll down
                createjs.Ticker.removeEventListener("tick", stage);
            }
        });

    Pathways.Scenes.push(scene1);
}