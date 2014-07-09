
Pathways.Scene.AnnaO = function(panel_height) {

    var positions = [
        { x: -57,   y: -107 },
        { x: 79,    y: 32 },
        { x: 178,   y: 178 },
        { x: -144,  y: 106 },
    ];

    var counter = 0;

    $('#anna-o .fragmented').each(function() {
        var $this = $(this);

        var x = positions[counter].x;
            y = positions[counter].y;

        if( Modernizr.csstransforms3d )
            $this.css( { 'transform': 'translate3d('+ x +'px, '+ y +'px, 0)' } );
        else
            $this.css( { 'transform': 'translate('+ x +'px, '+ y +'px)' } );

        counter++;
    })

    $('#anna-o .fragmented').each(function() {
        var tween = TweenMax.to( $(this), 1, { x: 0, y: -3 } );

        var scene = new ScrollScene({
                triggerElement: '#anna-o',
                triggerHook:    'top',
                duration:       $('#anna-o').height() - 420,
                offset:         50,
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);
    });

}