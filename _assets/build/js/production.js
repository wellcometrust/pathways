
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
            $quiz           = $this.find('[data-component="quiz"]'),
            
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
                    duration:       panel_height,
                    offset:         100
                })
                .on('enter', function() {
                    $gallery.css({ position: 'fixed', display: 'block' });
                })
                .on('leave', function() {
                    $gallery.css({ position: 'absolute', display: 'none' });
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
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    duration:       panel_height,
                    offset:         100
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
    if( _('#mesmers-salon') ) {
        scenes[idx++] = new ScrollScene({
                triggerElement: '#mesmers-salon',
                duration:       (panel_height - 100),
                offset:         100
            })
            .on('enter', function(e) {
                _('.crop-zoom').style['position'] = 'fixed';
                TweenMax.to('.crop-zoom', 0.2, { opacity: 1 }); // Fade in
                
                setTimeout(function() {
                    // $('.tap-target').addClass('animate');
                }, 200);
            })
            .on('leave', function(e) {
                TweenMax.to('.crop-zoom', 0.2, { opacity: 0 }); // Fade out
                
                setTimeout(function() {
                    // $('.tap-target').removeClass('animate');
                    _('.crop-zoom').style['position'] = 'absolute';
                }, 200);
            })
    }

    // Tree
    if( _('.tree' ) ) {
        $('.black-strip').css({'height': panel_height, 'transform': 'translate(0,'+panel_height+'px)'});

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




    // Tree
    if( _('.tree') ) {
        var tree_offset = $('.tree').data('offset-height') ? $('.tree').data('offset-height') : 0;

        scenes[idx++] = new ScrollScene({
                triggerElement: '.tree',
                duration:       panel_height + tree_offset + 100
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

    // News
    if( _('.news') ) {
        var news_offset = $('.news').data('offset-height') ? $('.tree').data('offset-height') : 0;

        scenes[idx++] = new ScrollScene({
                triggerElement: '.news',
                duration:       panel_height + news_offset + 100
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

    // Airloom specific

    // Video
    if( _('.air-loom-content') ) {
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

        scenes[idx++] = new ScrollScene({
                triggerElement: '.air-loom-content',
                duration:       panel_height
            })
            .on('enter', function(e) {
                $('.mute').css({ position: 'fixed', display: 'block' });

                if( _('.air-loom-content video') )
                    _('.air-loom-content video').play();
            })
            .on('leave', function(e) {
                $('.mute').css({ position: 'absolute', display: 'none' });

                if( _('.air-loom-content video') ) {
                    _('.air-loom-content video').pause();
                    _('.air-loom-content video').currentTime = 0;
                }
            })
    }

    // Elliotson specific

    //
    if( _('.okey-sisters') ) {
        
        $('.okey-sisters .scroll-content').css({ 'bottom': 'auto', 'top': panel_height });
        $('.thomas-wakley .scroll-content').css({ 'bottom': 'auto', 'top': (panel_height / 3) });

        $('.black-strip').css({'height': panel_height, 'transform': 'translate(0,'+panel_height+'px)'});

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

    // Esdaile

    // India/boats
    if( _('.india') ) {
        //
        var $boats      = $('.boats'),
            ratio       = 1050 / 1900,
            boat_ratio  = 233 / 1900,
            boat_height = (boat_ratio * window.innerWidth);

        $boats.css({ bottom: 'auto', top: (ratio * window.innerWidth) - boat_height - 40, height: boat_height });

        $(window).on('resize', function() {
            boat_height = (boat_ratio * window.innerWidth);
            $boats.css({ bottom: 'auto', top: (ratio * window.innerWidth) - boat_height - 40, height: boat_height });
        })

        scenes[idx++] = new ScrollScene({
                triggerElement: '.india',
                duration:       panel_height
            })
            .on('enter', function() {
                $('.boats').css('transform', 'translate(320px,0)');
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
            var tween = TweenMax.to( $(this), 1, { x: 0, y: 0 } );

            scenes[idx++] = new ScrollScene({
                    triggerElement: '.anna-o',
                    triggerHook:    'top',
                    duration:       $('.anna-o').height(),
                    offset:         50,
                })
                .setTween(tween);
        });

    }

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

(function(window) {

    'use strict';

    var Pathways = function(options) {
        var Pathways        = this,
            panel_height    = window.innerHeight < 750 ? (750 + 15) : (window.innerHeight + 15),

            supports_touch  = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);

        /************************
            Private functions
        *************************/

        var init = function() {

            // Progressive loading. Some things need to happen before window load
            resizeAllTheThings();
            
            window.addEventListener('resize', function() {
                resizeAllTheThings();
            });

            window.addEventListener('load', function() {
                loadComponents();

                if( !supports_touch ) {
                    window.Pathways.LoadScenes();
                    loadVideo();
                }
            })
        }

        var loadComponents = function() {
            var loaded = [];

            $('[data-component]').each(function(){
                var handler = $(this).attr('data-component');

                if ( handler ) {
                    var handlerClass = toTitleCase(handler);

                    // Check the handler exists and it hasn't already been loaded
                    if ( window.Pathways[handlerClass] != null && loaded.indexOf(handlerClass) == -1 ) {
                        window.Pathways[handlerClass](panel_height);
                        loaded.push(handlerClass);
                    }
                    
                    if( window.Pathways[handlerClass] == null )
                        console.warn('Could not load the necessary component: ' + handlerClass);
                }
            });
        }

        var loadVideo = function() {
            $('.bg-container.video').each(function() {
                var $this   = $(this),
                    src     = $this.data('src');

                if( src ) {
                    var video = document.createElement('video');
                    
                    video.src   = src;
                    video.loop  = true;

                    $this.html(video);
                }
            });
        }

        var resizeAllTheThings = function() {
            panel_height = window.innerHeight < 750 ? (750 + 10) : (window.innerHeight + 10);

            // Set the heights of the panels to a minimum of the window height, or the height of the content.
            // Use any offsets set on the panel to increase height where necessary.
            $('.panel').each(function() {
                var $this   = $(this),
                    $bg     = $this.find('.bg-container'),
                    height  = $this.outerHeight(),
                    offset  = (supports_touch || !$this.data('offset-height')) ? 0 : $this.data('offset-height');

                if( height < panel_height || offset ) {
                    $this.css('height', panel_height + offset );
                }

                $bg.css('height', panel_height);
            });
        }

        // Utils
        var toTitleCase = function(str){
            str = str.replace('-',' ').replace('_',' ');
            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
            return str.replace(/\W/g,'');
        }

        /************************
            Public functions
        *************************/

        init();
        return Pathways;
    }

    window.Pathways = Pathways;
})(window);

