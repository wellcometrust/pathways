
Pathways.Scene.AnnaOVideo = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#anna-o-video',
            duration:       panel_height + 100
        })
        .on('enter', function(e) {
            if( _('#anna-o-video video') )
                _('#anna-o-video video').play();
        })
        .on('leave', function(e) {
            if( _('#anna-o-video video') ) {
                _('#anna-o-video video').pause();
                _('#anna-o-video video').currentTime = 0;
            }
        })

    Pathways.Scenes.push(scene);
}