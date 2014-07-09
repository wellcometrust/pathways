
Pathways.Scene.Airloom = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#airloom',
            duration:       panel_height
        })
        .on('enter', function(e) {
            if( _('#airloom video') ) {
                _('#airloom video').currentTime = 0.4;
                _('#airloom video').play();
            }
        })
        .on('leave', function(e) {
            if( _('#airloom video') ) {
                _('#airloom video').pause();
                _('#airloom video').currentTime = 0;
            }
        })

    Pathways.Scenes.push(scene);
}