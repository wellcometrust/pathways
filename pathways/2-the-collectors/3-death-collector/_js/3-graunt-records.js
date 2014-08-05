
Pathways.Scene.GrauntRecords = function() {

    var scene = new ScrollScene({
            triggerElement: '#graunt-records',
            duration:       Pathways.panel_height
        })
        .on('enter', function(e) {
            $('#graunt-records').addClass('active');
        })

    Pathways.Scenes.push(scene);
}