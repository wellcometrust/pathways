
Pathways.Scene.IsaacNewton = function() {

    var scene1 = new ScrollScene({
            triggerElement: '#isaac-newton',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to('#isaac-newton .black-strip', .4, { y: 0 }); // Scroll up
            }
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to('#isaac-newton .black-strip', .2, { y: Pathways.panelHeight }); // scroll down
            }
        });

    Pathways.Scenes.push(scene1);
}