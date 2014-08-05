
Pathways.Scene.SeizedAndDestroyed = function() {

    var vector = { x: -10, y: -5 };

    $('#seized-and-destroyed .rubbish div').each(function() {    
        // random number between 5 and 25 (create a random num between 0 and 20 then add 5);
        var rand    = 5 + (Math.random() * 20),
            pos     = { x: vector.x * rand, y: vector.y * rand };

        console.log(pos);

        var tween = TweenMax.to( $(this), 1, { x: pos.x, y: pos.y } );

        var scene = new ScrollScene({
                triggerElement: '#seized-and-destroyed',
                duration:       $('#seized-and-destroyed').outerHeight(),
                offset:         50,
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);
    });
}