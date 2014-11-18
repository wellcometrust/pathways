
Pathways.Scene.MagnetisedTrees = function(panelID) {

    var stage = animations.magnetisedTrees.stage;
    var scene1 = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {

            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to(panelID + ' .black-strip', 0.4, { y: 0 }); // Scroll up
                createjs.Ticker.addEventListener("tick", stage);
            }
        })
        .on('leave', function(e) {

            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to(panelID + ' .black-strip', 0.2, { y: Pathways.panelHeight }); // scroll down
                createjs.Ticker.removeEventListener("tick", stage);
            }
        });

    return scene1;
};
