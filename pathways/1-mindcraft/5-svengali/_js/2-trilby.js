
Pathways.Scene.Trilby = function() {

    $('.comic-panel').css('opacity', 0);

    $('.comic-panel').each(function() {
        var $this   = $(this),
            tween   = TweenMax.to( $this, 1, { opacity: 1 } ),
            offset  = $this.data('offset') ? $this.data('offset') : 0;

        var scene = new ScrollScene({
                triggerElement:     $this,
                duration:           200,
                offset:             offset
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);
    });
    
}