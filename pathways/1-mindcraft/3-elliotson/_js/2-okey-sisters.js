Pathways.scrollScenes.OkeySisters = function(panelID) {

    $('#okey-sisters .main-content, #okey-sisters .secondary-content').css({
        'bottom': 'auto',
        'top': Pathways.panelHeight
    });
    $('#thomas-wakley .main-content').css({
        'bottom': 'auto',
        'top': parseInt((Pathways.panelHeight / 3),10)
    });

    var $panel = $(panelID),
        height = $panel.outerHeight();

    var scene = new ScrollScene({
            triggerElement: panelID,
            triggerHook: 'top',
            duration: Pathways.panelHeight
        })
        .on('enter', function(e) {
            if (e.scrollDirection == 'FORWARD')
                TweenMax.to('.black-strip', 0.5, {
                    y: 0
                }); // Scroll up
        })
        .on('leave', function(e) {
            if (e.scrollDirection == 'REVERSE')
                TweenMax.to('.black-strip', 0.2, {
                    y: Pathways.panelHeight
                }); // scroll down
        });


    return scene;
};


Pathways.components.gallery.hypnotisedWomen = {
    data: {
        location: '_assets/galleries/hypnotised-women/',
        images: [{
            image: 'L0000476',
            text: '1/6: Most images of mesmerism and hypnotism show men treating women in manipulative or exploitative ways.'
        }, {
            image: 'L0034228',
            text: '2/6: A corrupt old man tries to seduce a woman by urging her to take a hypnotic draught.'
        }, {
            image: 'L0034922',
            text: '3/6: A mesmeric physician taking advantage of his female patient.'
        }, {
            image: 'V0006760',
            text: '4/6: Jean-Martin Charcot demonstrates hysteria in a hypnotised subject at the Salpêtrière hospital in Paris, 1888.'
        }, {
            image: 'V0011793',
            text: '5/6: An exotic doctor magnetises a young woman; her husband looks on.'
        }, {
            image: 'V0016621',
            text: '6/6: A female patient being hypnotised in front of a group of four men.'
        }, ]
    }
};
