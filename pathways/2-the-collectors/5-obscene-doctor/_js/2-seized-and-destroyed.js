
Pathways.Scene.SeizedAndDestroyed = function(panel_height) {

    $('#seized-and-destroyed .rubbish div').each(function() {
        var tween = TweenMax.to( $(this), 1, { x: -50, y: -25 } );

        var scene = new ScrollScene({
                triggerElement: '#seized-and-destroyed',
                duration:       $('#seized-and-destroyed').outerHeight(),
                offset:         50,
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);
    });
}