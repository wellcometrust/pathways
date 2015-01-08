Pathways.scrollScenes.StewartConn = function(panelID) {

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to(panelID + ' .black-strip', 0.5, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to(panelID + ' .black-strip', 0.2, { y: Pathways.panelHeight }); // scroll down
        });

    return scene;
};
