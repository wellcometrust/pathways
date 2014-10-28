
Pathways.Scene.UniqueArtifacts = function() {

    var $bg         = $('#unique-artifacts .bg-container'),
        bg_tween    = TweenMax.to( _('#unique-artifacts .bg-container'),    1, { 'background-position': '50% -216px' }),
        crop_tween  = TweenMax.to( _('#unique-artifacts .crop-zoom'),       1, { 'y': '-216' });

    var scene = new ScrollScene({
            triggerElement: '#unique-artifacts',
            duration:       (Pathways.panelHeight - 100),
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
        });

    var scene2 = new ScrollScene({
            triggerElement: '#unique-artifacts',
            duration:       (Pathways.panelHeight - 100)
        })
        .setTween(bg_tween)

    var scene3 = new ScrollScene({
            triggerElement: '#unique-artifacts',
            duration:       (Pathways.panelHeight - 100)
        })
        .setTween(crop_tween)

    Pathways.Scenes.push(scene);
    Pathways.Scenes.push(scene2);
    Pathways.Scenes.push(scene3);
}