
Pathways.Scene.GrauntRecords = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#graunt-records',
            duration:       panel_height
        })
        .on('enter', function(e) {
            $('#graunt-records').addClass('active');
        })
        .on('leave', function(e) {
            // $('#graunt-records').addClass('active');
        })

    Pathways.Scenes.push(scene);
}