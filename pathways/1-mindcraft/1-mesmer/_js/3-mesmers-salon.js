
Pathways.Scene.MesmersSalon = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#mesmers-salon',
            duration:       (panel_height - 100),
            offset:         100
        })
        .on('enter', function(e) {
            _('.crop-zoom').style['position'] = 'fixed';
            TweenMax.to('.crop-zoom', 0.2, { opacity: 1 }); // Fade in
        })
        .on('leave', function(e) {
            TweenMax.to('.crop-zoom', 0.2, { opacity: 0 }); // Fade out
            
            setTimeout(function() {
                _('.crop-zoom').style['position'] = 'absolute';
            }, 200);
        })

    Pathways.Scenes.push(scene);
}