Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('british-museum', function(panelId, panelEl, panelAttrs) {
    var $panel = $(panelEl);

    var scene = new ScrollScene({
            triggerElement: panelEl,
            triggerHook: 'top',
            duration: Pathways.panelHeight,
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
        });

    return scene;

});
