
Pathways.Scene.Example = function() {

    var scene = new ScrollScene({
            triggerElement: '#example',
            duration:       Pathways.panel_height,
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