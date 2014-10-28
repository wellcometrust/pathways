
Pathways.Scene.GrauntRecords = function() {

    var scene = new ScrollScene({
            triggerElement: '#graunt-records',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            $('#graunt-records').addClass('active');
        })

    Pathways.Scenes.push(scene);
}