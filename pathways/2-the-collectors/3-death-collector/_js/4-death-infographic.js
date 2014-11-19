Pathways.Scene.DeathInfographic = function(panelID) {

    var $infoBox = $(panelID + ' .info-box'),
        $inputContainer = $(panelID + ' .input-container');
        //console.log(infoBox, inputContainer);

    var $panel = $(panelID);

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight
        })
        .on('enter', function() {
            $panel.addClass('active');
        }).on('leave', function() {
            $panel.removeClass('active');
            if($infoBox.css('display') === 'block') {
                $infoBox.css('display', 'none');
            }
        });

    return scene;
};
