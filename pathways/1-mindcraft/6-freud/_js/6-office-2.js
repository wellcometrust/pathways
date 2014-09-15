
Pathways.Scene.Office2 = function() {

    var $img = $('#office-2').find('.large-screen').first();

    var scene = new ScrollScene({
            triggerElement: '#office-2',
            duration:       Pathways.panel_height + (Pathways.panel_height / 2)
        })
        .on('enter', function() {            
            $img.css('transition', 'transform 14s ease');
            $img.css('transform', 'translate(-80%, -40%) scale(1.8, 1.8)');
        })
        .on('leave', function() {
            $img.css('transition', 'none');
            $img.css('transform', 'translate(0,0) scale(1.6, 1.6)');
        })

    Pathways.Scenes.push(scene);
}