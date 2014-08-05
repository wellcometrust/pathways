
Pathways.Scene.SurgeryUnderHypnosis = function() {

    var scene = new ScrollScene({
            triggerElement: '#surgery-under-hypnosis',
            duration:       Pathways.panel_height + 100
        })
        .on('enter', function(e) {
            if( _('#surgery-under-hypnosis video') )
                _('#surgery-under-hypnosis video').play();
        })
        .on('leave', function(e) {
            if( _('#surgery-under-hypnosis video') ) {
                _('#surgery-under-hypnosis video').pause();
                _('#surgery-under-hypnosis video').currentTime = 0;
            }
        })

    Pathways.Scenes.push(scene);
}