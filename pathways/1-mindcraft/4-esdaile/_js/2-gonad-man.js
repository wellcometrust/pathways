
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

    var scene2 = new ScrollScene({
            triggerElement: $panel,
            triggerHook:    'top',
            duration:       height - (height / 2),
            offset:         (height / 4)
        })
        .on('enter', function() {
            $quiz.css({ position: 'fixed', display: 'block' });
            setTimeout(function() { $quiz.addClass('active'); }, 50);
        })
        .on('leave', function() {
            $quiz.css({ position: 'absolute', display: 'none' });
            setTimeout(function() { $quiz.removeClass('active'); }, 50);
        })

    Pathways.Scenes.push(scene1);
    Pathways.Scenes.push(scene2);
}