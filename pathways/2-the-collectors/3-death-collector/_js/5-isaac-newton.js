
Pathways.Scene.IsaacNewton = function(panel_height) {

    var scene1 = new ScrollScene({
            triggerElement: '#isaac-newton',
            duration:       panel_height
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to('#isaac-newton .black-strip', .4, { y: 0 }); // Scroll up
            }
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to('#isaac-newton .black-strip', .2, { y: panel_height }); // scroll down
            }
        });

    Pathways.Scenes.push(scene1);
}