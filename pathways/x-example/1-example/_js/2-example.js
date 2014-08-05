
Pathways.Scene.Example = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#example',
            duration:       panel_height,
            offset:         0
        })
        .on('enter', function(e) {
            //
        })
        .on('leave', function(e) {
            //
        })

    Pathways.Scenes.push(scene);
}