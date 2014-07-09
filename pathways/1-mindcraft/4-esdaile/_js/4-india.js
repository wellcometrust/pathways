
Pathways.Scene.India = function(panel_height) {

    var $boats      = $('#india .boats'),
        ratio       = 1050 / 1900,
        boat_ratio  = 322 / 1900,
        boat_height = (boat_ratio * window.innerWidth);

    // $boats.css({ bottom: 'auto', top: (ratio * window.innerWidth) - boat_height - 40, height: boat_height });
    $boats.css({ bottom: 0, height: boat_height });

    $(window).on('resize', function() {
        boat_height = (boat_ratio * window.innerWidth);
        // $boats.css({ bottom: 'auto', top: (ratio * window.innerWidth) - boat_height - 40, height: boat_height });
        $boats.css({ height: boat_height });
    });

    var scene = new ScrollScene({
            triggerElement: '#india',
            duration:       panel_height
        })
        .on('enter', function() {
            $boats.css('transform', 'translate(320px,0)');
        })

    Pathways.Scenes.push(scene);
}