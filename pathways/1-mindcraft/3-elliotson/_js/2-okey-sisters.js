
Pathways.Scene.OkeySisters = function(panel_height) {

    $('#okey-sisters .main-content, #okey-sisters .secondary-content').css({ 'bottom': 'auto', 'top': panel_height });
    $('#thomas-wakley .main-content').css({ 'bottom': 'auto', 'top': (panel_height / 3) });

    var scene = new ScrollScene({
            triggerElement: '#okey-sisters',
            triggerHook:    'top',
            duration:       panel_height
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to('.black-strip', .5, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to('.black-strip', .2, { y: panel_height }); // scroll down
        })

    Pathways.Scenes.push(scene);
}