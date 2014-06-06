
function _(str) { return document.querySelector(str); }


function positionCenter($elm) {
    var width   = $elm.width(),
        height  = $elm.height(),

        top     = (window.innerHeight / 2) - (height / 2),
        left    = (window.innerWidth / 2) - (width / 2);

    $elm.css({ position: 'absolute', top: top, left: left });
}


Pathways.LoadScenes = function() {

    var panel_height    = window.innerHeight < 750 ? (750 + 15) : (window.innerHeight + 15),        
        $start          = $('.start'),
        $sequence       = $('.sequence'),
        controller      = new ScrollMagic();


    // Begin!
    $start.css('height', panel_height);

    /**************
        Scenes
    **************/

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
            $bg             = $this.find('.bg-container'),
            $library_panel  = $this.find('.library-panel'),
            $gallery        = $this.find('[data-component="gallery"]'),
            $quizes         = $this.find('[data-component="quiz"]'),
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
                    duration:       panel_height
                })
                .on('enter', function() {
                    $gallery.css({ position: 'fixed', display: 'block' });
                })
                .on('leave', function() {
                    $gallery.css({ position: 'absolute', display: 'none' });
                })
        }

        // Quiz
        if( $quizes.length ) {
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    duration:       panel_height
                })
                .on('enter', function() {
                    $quizes.css({ position: 'fixed', display: 'block' });
                })
                .on('leave', function() {
                    $quizes.css({ position: 'absolute', display: 'none' });
                })
        }

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
    if( _('.tap-block') ) {
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
    if( _('.tree' ) ) {
        $('.black-strip').css({'height': panel_height, '-webkit-transform': 'translate(0,'+panel_height+'px)'});

        scenes[idx++] = new ScrollScene({
                triggerElement: '.tree',
                // triggerHook:    'top',
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
    }




    // Video
    if( _('.tree') ) {
        scenes[idx++] = new ScrollScene({
                triggerElement: '.tree',
                duration:       panel_height
            })
            .on('enter', function(e) {
                if( _('.tree video') )
                    _('.tree video').play();
            })
            .on('leave', function(e) {
                if( _('.tree video') ) {
                    _('.tree video').pause();
                    _('.tree video').currentTime = 0;
                }
            })
    }

    if( _('.news') ) {
        scenes[idx++] = new ScrollScene({
                triggerElement: '.news',
                duration:       panel_height
            })
            .on('enter', function(e) {
                if( _('.news video') )
                    _('.news video').play();
            })
            .on('leave', function(e) {
                if( _('.news video') ) {
                    _('.news video').pause();
                    _('.news video').currentTime = 0;
                }
            })
    }

    // India/boats
    if( _('.india') ) {
        scenes[idx++] = new ScrollScene({
                triggerElement: '.india',
                duration:       panel_height
            })
            .on('enter', function() {
                $('.boats').css('-webkit-transform', 'translate(220px,0)');
            })
    }


    // Airloom specific

    // Video
    if( _('.air-loom-content') ) {
        scenes[idx++] = new ScrollScene({
                triggerElement: '.air-loom-content',
                duration:       panel_height
            })
            .on('enter', function(e) {
                if( _('.air-loom-content video') )
                    _('.air-loom-content video').play();
            })
            .on('leave', function(e) {
                if( _('.air-loom-content video') ) {
                    _('.air-loom-content video').pause();
                    _('.air-loom-content video').currentTime = 0;
                }
            })
    }

    //Elliotson
    if( _('.okey-sisters') ) {
        $('.black-strip').css({'height': panel_height, '-webkit-transform': 'translate(0,'+panel_height+'px)'});

        scenes[idx++] = new ScrollScene({
                triggerElement: '.okey-sisters',
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

    // Svengali
    if( _('.trilby') ) {
        $('.comic-panel').css('opacity', 0);

        $('.comic-panel').each(function() {
            var $this   = $(this),
                tween   = TweenMax.to( $(this), 1, { opacity: 1 } ),
                offset  = $this.data('offset') ? $this.data('offset') : 0;

            scenes[idx++] = new ScrollScene({
                    triggerElement:     $(this),
                    duration:           $(this).height(),
                    offset:             offset
                })
                .setTween(tween);
        })
    }

    // Freud
    if( _('.office') ) {
        $('.black-strip').css({'height': panel_height, '-webkit-transform': 'translate(0,'+panel_height+'px)'});

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

    if( _('.anna-o') ) {

            var $f = $('.anna-o .bg-container img').first();
            // $f.css('transform', 'translate(0, -700px)');

            var positions = [
                { x: -57,   y: -107 },
                { x: 79,    y: 32 },
                { x: 178,   y: 178 },
                { x: -144,  y: 106 },
            ];

            scenes[idx++] = new ScrollScene({
                    triggerElement: '.anna-o',
                    triggerHook:    'top'
                })
                .on('enter', function(e) {
                    if( e.scrollDirection == 'REVERSE' )
                        return;

                    var counter = 0;

                    $('.anna-o .fragmented').each(function() {
                        var $this = $(this);

                        var x = positions[counter].x;
                            y = positions[counter].y;

                        $this.css( { 'transform': 'translate('+ x +'px, '+ y +'px)' } );

                        counter++;
                    })
                })

            $('.anna-o .fragmented').each(function() {
                var tween = TweenMax.to( $(this), 1, { x: 0, y: 0 } );

                scenes[idx++] = new ScrollScene({
                        triggerElement: '.anna-o',
                        triggerHook:    'top',
                        duration:       $('.anna-o').height(),
                        offset:         100,
                    })
                    .setTween(tween);
            });

            // var oceanTween = TweenMax.to( $f, 1, { y: 0 } );
            var oceanTween = TweenMax.to( $f, 1, { y: -750 } );

            scenes[idx++] = new ScrollScene({
                    triggerElement: '.anna-o',
                    triggerHook:    'top',
                    duration:       $('.anna-o').height()
                })
                .setTween(oceanTween);
        }


    scenes.forEach(function(s) {
        s.addTo(controller);
    })
}



var db = {
    'rod': {
        'image': 'rod-crop.jpg',
        'title':'Franz Antoine Mesmer',
        'text': 'Mesmer founded a private society where, for the large sum of 100 livres, he would undertake to teach his healing skills under a strict vow of secrecy. Many distinguished French aristocrats signed up.'
    },
    'woman': {
        'image': 'woman-crop.jpg',
        'title':'A new miracle cure',
        'text': 'Mesmer’s salons were highly charged scenes of mass hysteria and miracle cures (quote). He would often play music on a glass harmonica that sent shivers through the patients’ nerves.'
    },
    'mesmer': {
        'image': 'mesmer-crop.jpg',
        'title':'Animal magnetism the new force in nature',
        'text': 'Mesmer claimed that he had discovered a new force in nature, which he named ‘animal magnetism’: …a universally distributed fluid, so continuous as to admit of no vacuum, incomparably rarefied, and by its nature able to receive, propagate and communicate all motion’'
        
    }
}
