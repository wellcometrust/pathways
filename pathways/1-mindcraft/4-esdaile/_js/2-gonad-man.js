
Pathways.Scene.GonadMan = function(panelID) {

    var $panel  = $(panelID),
        $quiz   = $panel.find('[data-component="quiz"]'),
        height  = $panel.outerHeight();

    var scene1 = new ScrollScene({
            triggerElement: panelID,
            triggerHook:    'top'
        })
        .on('enter', function() {
            $(panelID).addClass('active');
        });

    Pathways.Scenes.push(scene1);
}