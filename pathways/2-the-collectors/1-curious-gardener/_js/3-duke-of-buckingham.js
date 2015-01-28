Pathways.scrollScenes.DukeOfBuckingham = function(panelID) {

    var startY,
        coinBoxFx = new Audio('http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-coin-into-box.mp3'),
        coinOnPage = new Audio('http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-coin-onto-screen.mp3'),
        scenes = [],
        difference = 0,
        initCoinOffset = 380;

    scenes.push(new ScrollScene({
            triggerElement: panelID,
            triggerHook: 'top',
            duration: Pathways.panelHeight,
        })
        .on('enter', function(e) {
            if (e.scrollDirection == 'FORWARD') {
                startY = window.scrollY;
            } else {
                startY = window.scrollY - (Pathways.panelHeight - 100);
            }
        })
        .on('progress', function(e) {
            $('.pence').css('transform', 'translate(0, ' + (window.scrollY - startY) + 'px)');
        }));

    scenes.push(new ScrollScene({
            triggerElement: panelID,
            triggerHook: 'top',
            offset: initCoinOffset
        })
        .on('start', function(e) {
            // console.log('coin in box');
            Pathways.media.ctrl.playMediaOnFxChannel(coinBoxFx);
        }));

    scenes.push(new ScrollScene({
            triggerElement: panelID,
            triggerHook: 'top'
        })
        .on('start', function(e) {
            // console.log('coin on page');
            Pathways.media.ctrl.playMediaOnFxChannel(coinOnPage);
        }));


    // Keep the clipping mask the correct height in relation to the 'cover' background.
    var ratio = 1900 / 1050,
        $clip = $('#duke-of-buckingham .clip');

    function resizeClip() {
        if ((window.innerWidth / window.innerHeight) > ratio) {
            var newHeight = window.innerWidth / ratio,
                percent = (newHeight / 100) * 87;
            difference = parseInt((newHeight - window.innerHeight), 10);

            $clip.css({
                'height': percent,
                'transform': 'translate(0, ' + -difference + 'px)'
            });
        } else
            $clip.css('height', '87%');
    }

    resizeClip();

    window.addEventListener('resize', function() {
        resizeClip();
    });

    return scenes;
};
