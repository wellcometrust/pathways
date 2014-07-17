
Pathways.Scene.BillsOfMortality = function(panel_height) {

    var scene1 = new ScrollScene({
            triggerElement: '#bills-of-mortality',
            duration:       panel_height
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to('#bills-of-mortality .black-strip', .4, { y: 0 }); // Scroll up
            }
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to('#bills-of-mortality .black-strip', .2, { y: panel_height }); // scroll down
            }
        });

    Pathways.Scenes.push(scene1);
}