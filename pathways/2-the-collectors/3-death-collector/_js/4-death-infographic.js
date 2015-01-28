Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('death-infographic', function(panelId, panelEl, panelAttrs) {
    var $panel = $(panelEl),
        $infoBox = $panel.find('.info-box'),
        $inputContainer = $panel.find('.input-container');
    //console.log(infoBox, inputContainer);


    var scene = new ScrollScene({
            triggerElement: panelEl,
            duration: Pathways.panelHeight
        })
        .on('enter', function() {
            $panel.addClass('current-scroll-panel');
        }).on('leave', function() {
            $panel.removeClass('current-scroll-panel');
            if ($infoBox.css('display') === 'block') {
                $infoBox.css('display', 'none');
            }
        });

    return scene;

});
