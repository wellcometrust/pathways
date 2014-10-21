
Pathways.Scene.AnimalMagnetism = function(panelID) {
    
    var $panel      = $(panelID),
        $gallery    = $panel.find('[data-component="gallery"]'),
        height      = $panel.outerHeight();
    
    var scene1 = new ScrollScene({
            triggerElement: $panel,
            triggerHook:    'top',
            duration:       (height - (height / 2) ),
            offset:         200
        })
        .on('enter', function() {
            $gallery.css({ position: 'fixed', display: 'block' });
            setTimeout(function() { $gallery.addClass('active'); }, 50);
        })
        .on('leave', function() {
            $gallery.css({ position: 'absolute', display: 'none' });
            setTimeout(function() { $gallery.removeClass('active'); }, 50);
        });

    Pathways.Scenes.push(scene1);
}