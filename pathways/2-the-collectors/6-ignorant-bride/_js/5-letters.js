
Pathways.Scene.Letters = function() {

    var scene = new ScrollScene({
            triggerElement: '#letters',
            duration:       Pathways.panel_height
        })
        .on('enter', function(e) {
            if( _('#letters audio') ) {
                _('#letters audio').play();
            }
        })
        .on('leave', function() {
            if( _('#letters audio') ) {
                _('#letters audio').pause();
            }
        })

    Pathways.Scenes.push(scene);
}