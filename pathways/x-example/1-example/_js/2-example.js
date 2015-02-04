Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('example', function(panelId, panelEl, panelAttrs) {

    var scene = new ScrollScene({
            triggerElement: panelEl,
            duration:       Pathways.viewportHeight,
            offset:         0
        })
        .on('enter', function(e) {
            //
        })
        .on('leave', function(e) {
            //
        });

    return scene;
});
