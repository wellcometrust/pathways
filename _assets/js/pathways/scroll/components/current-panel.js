Pathways.scrollSceneCtrl.addGlobalPanelScrollMethod(function(panelId, panelEl, panel) {
    var $panel = $(panelEl),
        triggerHook = panel.isFirst ? 'middle' : 'top';

    var scene = new ScrollScene({
            triggerElement: panelEl,
            triggerHook: triggerHook,
            duration: panel.getContentDuration
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
        });

    return scene;

});
