
Pathways.Scene.OkeySisters = function(panelID) {

    $('#okey-sisters .main-content, #okey-sisters .secondary-content').css({ 'bottom': 'auto', 'top': Pathways.panel_height });
    $('#thomas-wakley .main-content').css({ 'bottom': 'auto', 'top': (Pathways.panel_height / 3) });

    var $panel      = $(panelID),
        $gallery    = $panel.find('[data-component="gallery"]'),
        height      = $panel.outerHeight();

    var scene = new ScrollScene({
            triggerElement: panelID,
            triggerHook:    'top',
            duration:       Pathways.panel_height
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to('.black-strip', .5, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to('.black-strip', .2, { y: Pathways.panel_height }); // scroll down
        })

    var scene1 = new ScrollScene({
            triggerElement: $panel,
            triggerHook:    'top',
            duration:       (height - (height / 2) ),
            offset:         300
        })
        .on('enter', function() {
            $gallery.css({ position: 'fixed', display: 'block' });
            setTimeout(function() { $gallery.addClass('active'); }, 50);
        })
        .on('leave', function() {
            $gallery.css({ position: 'absolute', display: 'none' });
            setTimeout(function() { $gallery.removeClass('active'); }, 50);
        })

    Pathways.Scenes.push(scene);
    Pathways.Scenes.push(scene1);
}