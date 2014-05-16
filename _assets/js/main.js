
function _(str) { return document.querySelector(str); }


var panel_height        = window.innerHeight < 750 ? (750 + 15) : (window.innerHeight + 15),
    
    // Start
    $start              = $('.start'),

    // Sequences
    $sequence           = $('.sequence'),

    // Event queues
    resizeQueue         = new Array(),

    controller;


function resizeAllTheThings() {
    panel_height = window.innerHeight < 750 ? (750 + 15) : (window.innerHeight + 15);

    // Set the heights of the panels to a minimum of the window height, or the height of the content.
    // Use any offsets set on the panel to increase height where necessary.
    $('.panel').each(function() {
        var $this   = $(this),
            height  = $this.height();

        if( height < panel_height )
            $this.css('height', panel_height + ( $this.data('offset-height') ? $this.data('offset-height') : 0 ) );
    });
}

function positionCenter($elm) {
    var width   = $elm.width(),
        height  = $elm.height();

    $elm.css({ position: 'absolute', top: (panel_height / 2) - (height / 2), left: (window.innerHeight / 2) - (width / 2) });
}


resizeQueue.push(resizeAllTheThings);

window.addEventListener('resize', function() {
    resizeQueue.forEach(function(func) { func(); });
});

Pathways.LoadScenes = function() {

    $start.css('height', panel_height);

    resizeAllTheThings();

    /**************
        Scenes
    **************/

    controller = new ScrollMagic();

    var scenes  = new Array(),
        idx     = 0;

    // Start panel

    var start_tween = TweenMax.to( _('.start .content'), 1, { opacity: 0, y: (panel_height / 3) });

    scenes[idx++] = new ScrollScene({
            triggerElement: '.start',
            duration:       600,
            offset:         (panel_height / 4)
        })
        .setTween(start_tween)


    /**************
        Sequence
     **************/

    scenes[idx++] = new ScrollScene({
            triggerElement: $sequence,
            triggerHook:    'top',
            duration:       ($sequence.height() - panel_height)
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD') {
                $sequence.find('.bg-container').css({ position: 'fixed', display: 'none', opacity: 0 } );
                $sequence.find('.panel').first().addClass('active');
                $sequence.find('.panel').first().find('.bg-container').css({ display: 'block', opacity: 1 });
            }
            if( e.scrollDirection == 'REVERSE') {
                $sequence.find('.bg-container').css({ position: 'fixed' } );
                $sequence.find('.panel').last().addClass('active');
            }
        })
        .on('leave', function(e) {
            $sequence.find('.bg-container').css({ position: 'absolute', display: 'block' } );
        })

    // Panels

    $('.sequence .panel').each(function() {
        var $this           = $(this),
            $bg             = $this.find('.bg-container'),
            $library_panel  = $this.find('.library-panel'),
            tween           = TweenMax.to( $bg, 1, { opacity: 1 });

        // Panels
        scenes[idx++] = new ScrollScene({
                triggerElement: $this,
                duration:       (panel_height / 4)
            })
            .on('enter', function() {
                $bg.css('display', 'block');
            })
            .setTween(tween)

        // Library panels
        if( $library_panel.length ) {
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    duration:       panel_height
                })
                .on('enter', function() {
                    $library_panel.css({ position: 'fixed', display: 'block' });
                })
                .on('leave', function() {
                    $library_panel.css({ position: 'absolute', display: 'none' });
                })
        }
    })


    // Mesmer specific

    // Crop zoom
    if( $('.tap-block').length ) {
        scenes[idx++] = new ScrollScene({
                triggerElement: '.tap-block',
                duration:       panel_height
            })
            .on('enter', function(e) {
                _('.crop-zoom').style['position'] = 'fixed';
                TweenMax.to('.crop-zoom', 0.2, { opacity: 1 }); // Fade in
                setTimeout(function() {
                    $('.tap-target').addClass('animate');
                }, 200);
            })
            .on('leave', function(e) {
                TweenMax.to('.crop-zoom', 0.2, { opacity: 0 }); // Fade out
                setTimeout(function() {
                    $('.tap-target').removeClass('animate');
                    _('.crop-zoom').style['position'] = 'absolute';
                }, 200);
            })
    }

    // Tree
    if( $('.tree').length ) {
        $('.black-strip').css({'height': panel_height, '-webkit-transform': 'translate(0,'+panel_height+'px)'});

        scenes[idx++] = new ScrollScene({
                triggerElement: '.tree',
                triggerHook:    'top',
                duration:       panel_height
            })
            .on('enter', function(e) {
                if( e.scrollDirection == 'FORWARD' )
                    TweenMax.to('.black-strip', 1, { y: 0 }); // Scroll up
            })
            .on('leave', function(e) {
                if( e.scrollDirection == 'REVERSE' )
                    TweenMax.to('.black-strip', 1, { y: panel_height }); // scroll down
            })
    }

    // Video
    if( $('.news').length ) {
        scenes[idx++] = new ScrollScene({
                triggerElement: '.news',
                duration:       panel_height
            })
            .on('enter', function(e) {
                _('.news-video').play();
            })
            .on('leave', function(e) {
                _('.news-video').pause();
                _('.news-video').currentTime = 0;
            })
    }

    // India/boats
    if( $('.india').length ) {
        scenes[idx++] = new ScrollScene({
                triggerElement: '.india',
                duration:       panel_height
            })
            .on('enter', function() {
                $('.boats').css('-webkit-transform', 'translate(60px,0)');
            })
    }


    // Airloom specific

    // Video
    if( $('.air-loom-content').length ) {
        scenes[idx++] = new ScrollScene({
                triggerElement: '.air-loom-content',
                duration:       panel_height
            })
            .on('enter', function(e) {
                _('.air-loom-video').play();
            })
            .on('leave', function(e) {
                _('.air-loom-video').pause();
                _('.air-loom-video').currentTime = 0;
            })
    }


    scenes.forEach(function(s) {
        s.addTo(controller);
    })
}



var db = {
    'rod': {
        'image': 'rod-crop.jpg',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    'woman': {
        'image': 'woman-crop.jpg',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    'mesmer': {
        'image': 'mesmer-crop.jpg',
        'text': 'Mesmer claimed that he had discovered a new force in nature, which he named ‘animal magnetism’: …a universally distributed fluid, so continuous as to admit of no vacuum, incomparably rarefied, and by its nature able to receive, propagate and communicate all motion’'
    }
}
