
Pathways.Scene.GonadMan = function(panelID) {

    var $panel  = $(panelID),
        $quiz   = $panel.find('[data-component="quiz"]'),
        height  = $panel.outerHeight();

    var scene1 = new ScrollScene({
            triggerElement: panelID,
            triggerHook:    'top',
            duration: function () { return $panel.outerHeight() + (Pathways.panelHeight * 0.5); }            
        })
        .on('enter', function() {
            $panel.addClass('active');
        }).on('leave', function(){
            $panel.removeClass('active');
        });

    Pathways.Scenes.push(scene1);
}