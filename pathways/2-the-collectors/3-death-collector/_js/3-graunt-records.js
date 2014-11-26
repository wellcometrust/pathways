
Pathways.scrollScenes.GrauntRecords = function(panelID) {

    var $panel = $(panelID);

    var scene = new ScrollScene({
            triggerElement: panelID,
            triggerHook: 'top',
            duration:     Pathways.panelHeight,
        })
        .on('enter', function() {
            $panel.addClass('active');
        }).on('leave', function() {
            $panel.removeClass('active');
        });

    return scene;
};
