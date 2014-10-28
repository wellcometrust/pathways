
Pathways.Scene.OkeySisters = function(panelID) {

    $('#okey-sisters .main-content, #okey-sisters .secondary-content').css({ 'bottom': 'auto', 'top': Pathways.panelHeight });
    $('#thomas-wakley .main-content').css({ 'bottom': 'auto', 'top': (Pathways.panelHeight / 3) });

    var $panel      = $(panelID),
        height      = $panel.outerHeight();

    var scene = new ScrollScene({
            triggerElement: panelID,
            triggerHook:    'top',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to('.black-strip', .5, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to('.black-strip', .2, { y: Pathways.panelHeight }); // scroll down
        })


    Pathways.Scenes.push(scene);
}