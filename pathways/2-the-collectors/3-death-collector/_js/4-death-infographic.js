Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('death-infographic', function(panelId, panelEl, panelAttrs) {
    var $panel = $(panelEl);

    var scene = new ScrollScene({
            triggerElement: panelEl,
            duration: panelAttrs.getContentDuration
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
        });

    return scene;

});
