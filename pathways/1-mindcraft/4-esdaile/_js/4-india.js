
Pathways.Scene.India = function() {

    var $boats      = $('#india .boats'),
        ratio       = 1050 / 1900,
        boat_ratio  = 322 / 1900,
        boat_height = (boat_ratio * window.innerWidth);

    $boats.css({ bottom: 0, height: boat_height });

    $(window).on('resize', function() {
        boat_height = (boat_ratio * window.innerWidth);
        $boats.css({ height: boat_height });
    });

    var scene = new ScrollScene({
            triggerElement: '#india',
            duration:       Pathways.panel_height + (Pathways.panel_height / 2)
        })
        .on('enter', function() {
            $boats.css('transition', 'transform 120s linear');
            $boats.css('transform', 'translate('+window.innerWidth+'px,0)');
        })
        .on('leave', function() {
            $boats.css('transition', 'none');
            $boats.css('transform', 'translate(-600px,0)');
        })

    Pathways.Scenes.push(scene);
}