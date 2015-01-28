Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('anna-o', function(panelId, panelEl, panelAttrs) {
   var positions = [
        { x: -57,   y: -107 },
        { x: 79,    y: 32 },
        { x: 178,   y: 178 },
        { x: -144,  y: 106 },
        ],
        $panel = $(panelEl),
        scenes = [],
        $fragments = $(panelEl).find('.fragmented');

    $fragments.each(function(index) {

        var $this = $(this);
        var x = positions[index].x,
            y = positions[index].y;

        $this.css( { 'transform': 'translate('+ x +'px, '+ y +'px)' } );

    });

    $fragments.each(function() {
        var tween = TweenMax.to( $(this), 1, { x: 0, y: -3 } );

        var scene = new ScrollScene({
                triggerElement: panelEl,
                triggerHook:    'top',
                duration:       function() { return $panel.height() - 400; },
                offset:         50,
            })
            .setTween(tween);

        scenes.push(scene);
    });

    return scenes;
});
