Pathways.scrollSceneCtrl.addSinglePanelScrollFactory('duke-of-buckingham', function() {

    var $clip,
        $pence,
        startY = window.scrollY;
        ratio = 1900 / 1050;

    // Keep the clipping mask the correct height in relation to the 'cover' background
    function doResize(e) {
        if ($pence) $pence.css('transform', 'translate(0, ' + (window.scrollY - startY) + 'px)');
        if (!$clip) return;

        if ((window.innerWidth / window.innerHeight) > ratio) {
            var newHeight = window.innerWidth / ratio,
                percent = parseInt(((newHeight / 100) * 88), 10),
                difference = parseInt((newHeight - window.innerHeight), 10);

            $clip.css({
                'height': percent,
                'transform': 'translate(0, ' + -difference + 'px)'
            });
        } else
            $clip.css({
                'height': '88%',
                'transform': 'none'
            });
    }

    return {
        load: function(panelId, panelEl, panel) {
            $clip = $(panelEl).find('.clip');
            $pence = $(panelEl).find('.pence');
        },
        getScenes: function(panelId, panelEl, panel) {
            var $panel = $(panelEl),
                startY,
                coinBoxFx = new Audio('http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-coin-into-box.mp3'),
                coinOnPage = new Audio('http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-coin-onto-screen.mp3'),
                scenes = [],
                initCoinOffset = 380;

            scenes.push(new ScrollScene({
                    triggerElement: panelEl,
                    triggerHook: 'top',
                    duration: panel.getContentDuration,
                })
                .on('enter', function(e) {

                    if (e.scrollDirection == 'FORWARD') {
                        startY = window.scrollY;
                    } else {
                        startY = window.scrollY - (Pathways.viewportHeight - 100);
                    }
                    doResize();
                    window.addEventListener('resize', doResize);
                })
                .on('progress', function(e) {
                    $pence.css('transform', 'translate(0, ' + (window.scrollY - startY) + 'px)');
                }).on('leave', function() {
                    window.removeEventListener('resize', doResize);
                }));

            scenes.push(new ScrollScene({
                    triggerElement: panelEl,
                    triggerHook: 'top',
                    offset: initCoinOffset
                })
                .on('start', function(e) {
                    // console.log('coin in box');
                    Pathways.media.ctrl.playMediaOnFxChannel(coinBoxFx);
                }));

            scenes.push(new ScrollScene({
                    triggerElement: $pence,
                    triggerHook: 0.88,
                    offset: 100
                })
                .on('enter', function(e) {
                    Pathways.media.ctrl.playMediaOnFxChannel(coinOnPage);
                }));

            return scenes;
        },
        unload: function(panelId, panelEl, panel) {
            window.removeEventListener('resize', doResize);
        }
    };
});
