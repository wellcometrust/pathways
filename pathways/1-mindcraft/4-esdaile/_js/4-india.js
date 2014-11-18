
Pathways.Scene.India = function(panelID) {

    var $panel      = $(panelID),
        $boats      = $panel.find('.boats'),
        ratio       = 1050 / 1900,
        boat_ratio  = 322 / 1900,
        boat_height = (boat_ratio * window.innerWidth),
        offsetHeight = $(panelID).find('.main-content').outerHeight() + 100;

        var height  = $panel.outerHeight();

    $boats.css({ bottom: 0, height: boat_height });

    $(window).on('resize', function() {
        boat_height = (boat_ratio * window.innerWidth);
        $boats.css({ height: boat_height });
    });

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       function() { return $panel.outerHeight() + (Pathways.panelHeight / 4); }
        })
        .on('enter', function() {
            $boats.css('transition', 'transform 120s linear');
            $boats.css('transform', 'translate('+window.innerWidth+'px,0)');
        })
        .on('leave', function() {
            $boats.css('transition', 'none');
            $boats.css('transform', 'translate(-600px,0)');
        });

    return scene;
};
