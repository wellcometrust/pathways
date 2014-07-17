
Pathways.Scene.DukeOfBuckingham = function(panel_height) {

    var startY;

    var scene = new ScrollScene({
            triggerElement: '#duke-of-buckingham',
            triggerHook:    'top',
            duration:       panel_height,
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                startY = window.scrollY;
            else
                startY = window.scrollY - (panel_height - 100);
        })
        .on('progress', function(e) {
            $('.pence').css('transform', 'translate(0, '+ (window.scrollY - startY) +'px)');
        })

    Pathways.Scenes.push(scene);
}