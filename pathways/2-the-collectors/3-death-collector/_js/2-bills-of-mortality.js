
Pathways.Scene.BillsOfMortality = function() {

    var scene1 = new ScrollScene({
            triggerElement: '#bills-of-mortality',
            triggerHook:    'top',
            duration:       Pathways.panelHeight + 150
        })
        .on('enter', function(e) {
            if( _('#bills-of-mortality video') )
                _('#bills-of-mortality video').play();
        })
        .on('leave', function(e) {
            if( _('#bills-of-mortality video') ) {
                _('#bills-of-mortality video').pause();
                _('#bills-of-mortality video').currentTime = 0;
            }
        });

    return scene1;
};
