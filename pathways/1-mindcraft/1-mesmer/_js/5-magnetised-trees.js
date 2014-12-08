Pathways.scrollScenes.MagnetisedTrees = function(panelID, animation) {

    if (!animation) return console.warn('animation not inited for \'' + panelID + '\'');


    var scene1 = new ScrollScene({
            triggerElement: panelID,
            duration: Pathways.panelHeight
        })
        .on('enter', function(e) {
            console.log('evetre');
            if (e.scrollDirection == 'FORWARD') {
                TweenMax.to(panelID + ' .black-strip', 0.4, {
                    y: 0
                }); // Scroll up
                animation.start();
            }
        })
        .on('leave', function(e) {

            if (e.scrollDirection == 'REVERSE') {
                TweenMax.to(panelID + ' .black-strip', 0.2, {
                    y: Pathways.panelHeight
                }); // scroll down
                animation.stop();

            }
        });

    return scene1;
};
