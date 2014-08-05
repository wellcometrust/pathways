
Pathways.Scene.GonadMan = function() {

    var scene = new ScrollScene({
            triggerElement: '#gonad-man',
            triggerHook:    'top'
        })
        .on('enter', function() {
            $('#gonad-man').addClass('active');
        });

    Pathways.Scenes.push(scene);
}