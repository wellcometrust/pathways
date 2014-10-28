
Pathways.Scene.Office = function(panelID) {

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to(panelID + ' .black-strip', .5, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to(panelID + ' .black-strip', .2, { y: Pathways.panelHeight }); // scroll down
        })

    Pathways.Scenes.push(scene);
}