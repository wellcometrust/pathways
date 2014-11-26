
Pathways.scrollScenes.BritishMuseum = function() {

    var scene = new ScrollScene({
            triggerElement: '#british-museum',
            triggerHook:    'top'
        })
        .on('enter', function(e) {
            $('#british-museum').addClass('active');
        });

    return scene;
};
