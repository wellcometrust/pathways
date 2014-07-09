
Pathways.Scene.Satirised = function(panel_height) {
    var news_offset = $('#satirised').data('offset-height') ? $('#satirised').data('offset-height') : 0;

    var scene = new ScrollScene({
            triggerElement: '#satirised',
            duration:       panel_height + news_offset + 100
        })
        .on('enter', function(e) {
            if( _('#satirised video') )
                _('#satirised video').play();
        })
        .on('leave', function(e) {
            if( _('#satirised video') ) {
                _('#satirised video').pause();
                _('#satirised video').currentTime = 0;
            }
        });

    Pathways.Scenes.push(scene);
}