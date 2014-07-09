
Pathways.Scene.SelfHypnosis = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#self-hypnosis',
            duration:       panel_height + 100
        })
        .on('enter', function(e) {
            if( _('#self-hypnosis video') )
                _('#self-hypnosis video').play();
        })
        .on('leave', function(e) {
            if( _('#self-hypnosis video') ) {
                _('#self-hypnosis video').pause();
                _('#self-hypnosis video').currentTime = 0;
            }
        })

    Pathways.Scenes.push(scene);
}