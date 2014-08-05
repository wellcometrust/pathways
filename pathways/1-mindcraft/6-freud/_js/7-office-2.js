
Pathways.Scene.Office2 = function() {

    var scene = new ScrollScene({
            triggerElement: '#office-2',
        })
        .on('enter', function() {
            $('#office-2').addClass('active');
        })

    Pathways.Scenes.push(scene);
}