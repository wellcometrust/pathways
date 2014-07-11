
Pathways.Scene.MagnetisedTrees = function(panel_height) {
    
    // var tree_offset = $('#magnetised-trees').data('offset-height') ? $('#magnetised-trees').data('offset-height') : 0;
    
    var scene1 = new ScrollScene({
            triggerElement: '#magnetised-trees',
            duration:       panel_height
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to('#magnetised-trees .black-strip', .4, { y: 0 }); // Scroll up
                createjs.Ticker.addEventListener("tick", stage);
            }
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to('#magnetised-trees .black-strip', .2, { y: panel_height }); // scroll down
                createjs.Ticker.removeEventListener("tick", stage);
            }
        });

    Pathways.Scenes.push(scene1);
}