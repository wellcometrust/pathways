
Pathways.Scene.JohnTradescant = function() {

    $('.sliding-panel').css({ 'opacity': 0 });

    var translate_array = [-100, 100, -100, 100, -100, 100, -100, 100, -100, 100, -100, 100],
        count           = 0;

    $('.sliding-panel').each(function() {
        var $this   = $(this);

        $this.css('transform', 'translate('+ translate_array[count] +'px,0)');

        var tween   = TweenMax.to( $this, 1, { x: 0, opacity: 1 } ),
            offset  = $this.data('offset') ? $this.data('offset') : 0;

        var scene = new ScrollScene({
                triggerElement:     $this,
                duration:           200,
                offset:             offset
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);

        count++;
    });
}