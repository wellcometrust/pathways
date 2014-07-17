
Pathways.Scene.BritishMuseum = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#british-museum',
            triggerHook:    'top'
        })
        .on('enter', function(e) {
            $('#british-museum').addClass('active');
        })

    Pathways.Scenes.push(scene);
}