
Pathways.Scene.Office2 = function(panelID) {

    var $panel = $(panelID), 
        $img = $panel.find('.large-screen').first();

    var scene = new ScrollScene({
            triggerElement: panelID, 
            duration:       function () { return $panel.outerHeight() + (Pathways.panelHeight * 0.5); }, 
            offset:         100
        })
        .on('enter', function() {     
            console.log('enter couch')       
            $img.css('transition', 'transform 14s ease');
            $img.css('transform', 'translate(-80%, -10%) scale(1.8, 1.8)');
        })
        .on('leave', function() {
            $img.css('transition', 'none');
            $img.css('transform', 'translate(0,0) scale(1.6, 1.6)');
        })

    Pathways.Scenes.push(scene);
}