Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('office-2', function(panelId, panelEl, panelAttrs) {
    var $panel = $(panelEl);

    var scene1 = new ScrollScene({
            triggerElement: $panel,
            triggerHook: 'top',
            duration: function() {
                return $panel.outerHeight() - $('.fork').outerHeight();
            }
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
        });

    return scene1;
});
