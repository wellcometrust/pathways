
function _(str) { return document.querySelector(str); }


function positionCenter($elm) {
    var width   = $elm.width(),
        height  = $elm.height(),

        top     = (window.innerHeight / 2) - (height / 2),
        left    = (window.innerWidth / 2) - (width / 2);

    $elm.css({ position: 'absolute', top: top, left: left });
}


Pathways.LoadScenes = function() {

    var panel_height    = window.innerHeight < 550 ? (550 + 10) : (window.innerHeight + 10),
        $sequence       = $('.sequence'),
        controller      = new ScrollMagic();

    /**************
        Scenes
    **************/

    var scenes  = new Array(),
        idx     = 0;

    // Start panel

    if( _('.start') ) {
        var start_tween = TweenMax.to( _('.start .content'), 1, { opacity: 0, y: (panel_height / 3) });

        scenes[idx++] = new ScrollScene({
                triggerElement: '.start',
                duration:       600,
                offset:         (panel_height / 4)
            })
            .setTween(start_tween)
    }


    // Svengali
    if( _('.falling-lady') ) {
        var lady_tween = TweenMax.to( _('.falling-lady'), 5, { y: (panel_height * 2.2) } );

        scenes[idx++] = new ScrollScene({
                triggerElement: '.start',
                duration:       (panel_height * 3),
                offset:         (panel_height / 4)
            })
            .setTween(lady_tween);
    }

    // Mute
    $('.mute').hide();

    $('.mute').on('click', function() {
        var $this   = $(this),
            $video  = $this.parents('.panel').find('video').first().get(0);

        // active == muted
        if( $this.hasClass('active') ) {
            $video.volume = 1;
            $this.removeClass('active');
        }
        else {
            $video.volume = 0;
            $this.addClass('active');
        }
    });

    /**************
        Sequence
     **************/

     if( _('.sequence') ) {
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
     }

    // Panels

    $('[data-component="gallery"]').hide();
    $('[data-component="quiz"]').hide();

    $('.sequence .panel').each(function() {
        var $this           = $(this),
            height          = $this.height(),
            $bg             = $this.find('.bg-container'),
            $library_panel  = $this.find('.library-panel'),
            $gallery        = $this.find('[data-component="gallery"]'),
            $quiz           = $this.find('[data-component="quiz"]'),
            $mute           = $this.find('.mute'),
            
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

        // Galleries
        if( $gallery.length ) {
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    triggerHook:    'top',
                    duration:       (height - 200),
                    offset:         50
                })
                .on('enter', function() {
                    $gallery.css({ position: 'fixed', display: 'block' });
                    setTimeout(function() { $gallery.addClass('active'); }, 50);
                })
                .on('leave', function() {
                    $gallery.css({ position: 'absolute', display: 'none' });
                    setTimeout(function() { $gallery.removeClass('active'); }, 50);
                })
        }

        // Quiz
        if( $quiz.length ) {
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    triggerHook:    'top',
                    duration:       panel_height
                })
                .on('enter', function() {
                    $quiz.css({ position: 'fixed', display: 'block' });
                    setTimeout(function() { $quiz.addClass('active'); }, 50);
                })
                .on('leave', function() {
                    $quiz.css({ position: 'absolute', display: 'none' });
                    setTimeout(function() { $quiz.removeClass('active'); }, 50);
                })
        }

        // Library panels
        if( $library_panel.length ) {
            $library_panel.css('transform', 'translate('+ ($library_panel.outerWidth()) +'px, '+ ($library_panel.outerHeight() - 60) +'px)');

            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    duration:       (height - 200),
                    offset:         100
                })
                .on('enter', function() {
                    $library_panel.css({ position: 'fixed', display: 'block' });
                })
                .on('leave', function() {
                    $library_panel.css({ position: 'absolute', display: 'none' });
                })
        }

        // Mute
        if( $mute.length ) {
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    duration:       (height - 200),
                    offset:         100
                })
                .on('enter', function() {
                    $mute.css({ position: 'fixed', display: 'block' });
                })
                .on('leave', function() {
                    $mute.css({ position: 'absolute', display: 'none' });
                })
        }
    })


    // Mesmer specific

    // Crop zoom
    if( _('#mesmers-salon') ) {

        $('.crop-zoom').css('height',  $('#mesmers-salon .bg-container img').height() );

        window.addEventListener('resize', function() {
            $('.crop-zoom').css('height',  $('#mesmers-salon .bg-container img').height() );
        });

        scenes[idx++] = new ScrollScene({
                triggerElement: '#mesmers-salon',
                duration:       (panel_height - 100),
                offset:         100
            })
            .on('enter', function(e) {
                _('.crop-zoom').style['position'] = 'fixed';
                TweenMax.to('.crop-zoom', 0.2, { opacity: 1 }); // Fade in                
            })
            .on('leave', function(e) {
                TweenMax.to('.crop-zoom', 0.2, { opacity: 0 }); // Fade out
                
                setTimeout(function() {
                    _('.crop-zoom').style['position'] = 'absolute';
                }, 200);
            })
    }

    // Tree
    if( _('#magnetised-trees' ) ) {
        var tree_offset = $('#magnetised-trees').data('offset-height') ? $('#magnetised-trees').data('offset-height') : 0;
        $('.black-strip').css({'height': panel_height, 'transform': 'translate(0,'+panel_height+'px)'});

        scenes[idx++] = new ScrollScene({
                triggerElement: '#magnetised-trees',
                duration:       panel_height
            })
            .on('enter', function(e) {
                if( e.scrollDirection == 'FORWARD' )
                    TweenMax.to('.black-strip', .4, { y: 0 }); // Scroll up
            })
            .on('leave', function(e) {
                if( e.scrollDirection == 'REVERSE' )
                    TweenMax.to('.black-strip', .2, { y: panel_height }); // scroll down
            })

        scenes[idx++] = new ScrollScene({
                triggerElement: '#magnetised-trees',
                duration:       panel_height + tree_offset + 100
            })
            .on('enter', function(e) {
                if( _('#magnetised-trees video') )
                    _('#magnetised-trees video').play();
            })
            .on('leave', function(e) {
                if( _('#magnetised-trees video') ) {
                    _('#magnetised-trees video').pause();
                    _('#magnetised-trees video').currentTime = 0;
                }
            })
    }


    // News
    if( _('#satirised') ) {
        var news_offset = $('#satirised').data('offset-height') ? $('#satirised').data('offset-height') : 0;

        scenes[idx++] = new ScrollScene({
                triggerElement: '#satirised',
                duration:       panel_height + news_offset + 100
            })
            .on('enter', function(e) {
                if( _('#satirised video') )
                    _('#satirised video').play();
            })
            .on('leave', function(e) {
                if( _('#satirised video') ) {
                    _('#satirised video').pause();
                    _('#satirised video').currentTime = 0;
                }
            })
    }

    if( _('#committee-investigates') ) {
        // var news_offset = $('.news').data('offset-height') ? $('.tree').data('offset-height') : 0;

        scenes[idx++] = new ScrollScene({
                triggerElement: '#committee-investigates',
                duration:       panel_height + 100
            })
            .on('enter', function(e) {
                if( _('#committee-investigates video') )
                    _('#committee-investigates video').play();
            })
            .on('leave', function(e) {
                if( _('#committee-investigates video') ) {
                    _('#committee-investigates video').pause();
                    _('#committee-investigates video').currentTime = 0;
                }
            })
    }

    // Airloom specific

    // Video
    if( _('#airloom') ) {

        scenes[idx++] = new ScrollScene({
                triggerElement: '#airloom',
                duration:       panel_height
            })
            .on('enter', function(e) {
                if( _('#airloom video') )
                    _('#airloom video').play();
            })
            .on('leave', function(e) {
                if( _('#airloom video') ) {
                    _('#airloom video').pause();
                    _('#airloom video').currentTime = 0;
                }
            })
    }

    // Elliotson specific

    //
    if( _('#okey-sisters') ) {
        
        $('#okey-sisters .scroll-content').css({ 'bottom': 'auto', 'top': panel_height });
        $('#thomas-wakley .scroll-content').css({ 'bottom': 'auto', 'top': (panel_height / 3) });

        $('.black-strip').css({'height': panel_height, 'transform': 'translate(0,'+panel_height+'px)'});

        scenes[idx++] = new ScrollScene({
                triggerElement: '#okey-sisters',
                triggerHook:    'top',
                duration:       panel_height
            })
            .on('enter', function(e) {
                if( e.scrollDirection == 'FORWARD' )
                    TweenMax.to('.black-strip', .5, { y: 0 }); // Scroll up
            })
            .on('leave', function(e) {
                if( e.scrollDirection == 'REVERSE' )
                    TweenMax.to('.black-strip', .2, { y: panel_height }); // scroll down
            })
    }

    // Esdaile

    // India/boats
    if( _('#india') ) {
        //
        var $boats      = $('#india .boats'),
            ratio       = 1050 / 1900,
            boat_ratio  = 322 / 1900,
            boat_height = (boat_ratio * window.innerWidth);

        // $boats.css({ bottom: 'auto', top: (ratio * window.innerWidth) - boat_height - 40, height: boat_height });
        $boats.css({ bottom: 0, height: boat_height });

        $(window).on('resize', function() {
            boat_height = (boat_ratio * window.innerWidth);
            // $boats.css({ bottom: 'auto', top: (ratio * window.innerWidth) - boat_height - 40, height: boat_height });
            $boats.css({ height: boat_height });
        })

        scenes[idx++] = new ScrollScene({
                triggerElement: '#india',
                duration:       panel_height
            })
            .on('enter', function() {
                $boats.css('transform', 'translate(320px,0)');
            })
    }

    if( _('#surgery-under-hypnosis') ) {
        // var news_offset = $('.news').data('offset-height') ? $('.tree').data('offset-height') : 0;

        scenes[idx++] = new ScrollScene({
                triggerElement: '#surgery-under-hypnosis',
                duration:       panel_height + 100
            })
            .on('enter', function(e) {
                if( _('#surgery-under-hypnosis video') )
                    _('#surgery-under-hypnosis video').play();
            })
            .on('leave', function(e) {
                if( _('#surgery-under-hypnosis video') ) {
                    _('#surgery-under-hypnosis video').pause();
                    _('#surgery-under-hypnosis video').currentTime = 0;
                }
            })
    }

    if( _('#self-hypnosis') ) {
        // var news_offset = $('.news').data('offset-height') ? $('.tree').data('offset-height') : 0;

        scenes[idx++] = new ScrollScene({
                triggerElement: '#self-hypnosis',
                duration:       panel_height + 100
            })
            .on('enter', function(e) {
                if( _('#self-hypnosis video') )
                    _('#self-hypnosis video').play();
            })
            .on('leave', function(e) {
                if( _('#self-hypnosis video') ) {
                    _('#self-hypnosis video').pause();
                    _('#self-hypnosis video').currentTime = 0;
                }
            })
    }


    // Svengali

    //
    if( _('.trilby') ) {
        $('.comic-panel').css('opacity', 0);

        $('.comic-panel').each(function() {
            var $this   = $(this),
                tween   = TweenMax.to( $this, 1, { opacity: 1 } ),
                offset  = $this.data('offset') ? $this.data('offset') : 0;

            scenes[idx++] = new ScrollScene({
                    triggerElement:     $this,
                    duration:           200,
                    offset:             offset
                })
                .setTween(tween);
        })
    }

    // Freud

    //
    if( _('.anna-o') ) {

        var positions = [
            { x: -57,   y: -107 },
            { x: 79,    y: 32 },
            { x: 178,   y: 178 },
            { x: -144,  y: 106 },
        ];

        var counter = 0;

        $('.anna-o .fragmented').each(function() {
            var $this = $(this);

            var x = positions[counter].x;
                y = positions[counter].y;

            $this.css( { 'transform': 'translate('+ x +'px, '+ y +'px)' } );

            counter++;
        })

        $('.anna-o .fragmented').each(function() {
            var tween = TweenMax.to( $(this), 1, { x: 0, y: -3 } );

            scenes[idx++] = new ScrollScene({
                    triggerElement: '.anna-o',
                    triggerHook:    'top',
                    duration:       $('.anna-o').height() - 420,
                    offset:         50,
                })
                .setTween(tween);
        });

    }

    //
    if( _('#anna-o-video') ) {

        scenes[idx++] = new ScrollScene({
                triggerElement: '#anna-o-video',
                duration:       panel_height + 100
            })
            .on('enter', function(e) {
                if( _('#anna-o-video video') )
                    _('#anna-o-video video').play();
            })
            .on('leave', function(e) {
                if( _('#anna-o-video video') ) {
                    _('#anna-o-video video').pause();
                    _('#anna-o-video video').currentTime = 0;
                }
            })
    }

    //
    if( _('.office') ) {
        $('.black-strip').css({'height': panel_height, 'transform': 'translate(0,'+panel_height+'px)'});

        scenes[idx++] = new ScrollScene({
                triggerElement: '.office',
                duration:       panel_height
            })
            .on('enter', function(e) {
                if( e.scrollDirection == 'FORWARD' )
                    TweenMax.to('.black-strip', .5, { y: 0 }); // Scroll up
            })
            .on('leave', function(e) {
                if( e.scrollDirection == 'REVERSE' )
                    TweenMax.to('.black-strip', .2, { y: panel_height }); // scroll down
            })
    }

    //
    if( _('.office-2') ) {

        scenes[idx++] = new ScrollScene({
                triggerElement: '.office-2',
            })
            .on('enter', function() {
                $('.office-2').addClass('active');
            })
    }


    scenes.forEach(function(s) {
        s.addTo(controller);
    })
}
