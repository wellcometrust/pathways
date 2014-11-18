
Pathways.Scene.AnnaO = function(panelID) {

    var positions = [
        { x: -57,   y: -107 },
        { x: 79,    y: 32 },
        { x: 178,   y: 178 },
        { x: -144,  y: 106 },
    ];

    var counter = 0;
    var $panel = $(panelID);
    var scenes = [];

    $(panelID + ' .fragmented').each(function() {
        var $this = $(this);

        var x = positions[counter].x,
            y = positions[counter].y;

        if( Modernizr.csstransforms3d )
            $this.css( { 'transform': 'translate3d('+ x +'px, '+ y +'px, 0)' } );
        else
            $this.css( { 'transform': 'translate('+ x +'px, '+ y +'px)' } );

        counter++;
    });

    $(panelID + ' .fragmented').each(function() {
        var tween = TweenMax.to( $(this), 1, { x: 0, y: -3 } );

        var scene = new ScrollScene({
                triggerElement: panelID,
                triggerHook:    'top',
                duration:       function() { return $panel.height() - 400; },
                offset:         50,
            })
            .setTween(tween);

        scenes.push(scene);
    });

    return scenes;
};
