
'use strict';

function _(str) { return document.querySelector(str); }

// Global Nav
(function($) {
    var $nav            = $('.global-navigation'),
        $nav_handle     = $nav.find('.handle'),
        state           = 'open',
        navHeight       = $nav.outerHeight(),
        handleHeight    = $nav_handle.outerHeight();

    $nav.on('click', '.handle', function() {
        navHeight = $nav.outerHeight();

        if( state == 'open' ) {
            $nav.css('transform', 'translate(0, '+ -(navHeight - handleHeight) +'px)');
            state = 'closed';
        }
        else {
            $nav.css('transform', 'translate(0, 0)');
            state = 'open';

            // add an event listener on scroll to close the nav if open.
            $(window).one('scroll', function() {
                $nav_handle.trigger('click');
            });
        }
    });

    window.addEventListener('resize', function() {
        navHeight = $nav.outerHeight();
        $nav.css('transform', 'translate(0, '+ -(navHeight - handleHeight) +'px)');
    })

    setTimeout(function() {
        $nav_handle.trigger('click');
    }, 1000);


    /*
        Events
    */

    // put this here for now.
    $('.comic-quote').on('click', '.info-box', function() {
        var $this   = $(this),
            $parent = $this.parent();

        if( $parent.hasClass('active') ) {
            $parent.removeClass('active');
        }
        else {
            $parent.addClass('active');
        }
    });

    // Open links marked with rel="external" in a new window/tab
    $('.library-panel').on('click', '[rel="external"]', function(e) {
        var $this = $(this);

        window.open( $this.attr('href') );

        e.preventDefault();
    });

})($);


var canvas, stage, exportRoot;

// Canvas animations. Forget trying to pause/play on entering exiting the panel. Let it go, man. Just let it go...

function initCanvas() {
    canvas = document.getElementById("canvas");
    images = images||{};

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt) {
    if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {
    exportRoot = new lib.tree2();

    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);
    stage.update();

    createjs.Ticker.setFPS(lib.properties.fps);

    if( Modernizr.touch ) {
        createjs.Ticker.addEventListener("tick", stage);
    }
}

if( window.innerWidth >= 768 ) {
    initCanvas();
}


Pathways.LoadScenes = function() {

    var $sequence       = $('.sequence'),
        controller      = new ScrollMagic();


    $('.black-strip').css({
        position:       'fixed',
        'height':       Pathways.panel_height,
        'transform':    'translate(0,'+Pathways.panel_height+'px)'
    });

    window.addEventListener('resize', function() {
        $('.black-strip').css({
            'height':       Pathways.panel_height,
            'transform':    'translate(0,'+Pathways.panel_height+'px)'
        });
    });

    function parallaxStart() {
        scrollY = window.pageYOffset;

        if( scrollY > Pathways.panel_height ) {
            $content.css('display', 'none');
            return;
        }

        $content.css({
            'display': 'block',
            'opacity':  1 - (unit * scrollY),
            'transform': Modernizr.csstransforms3d ? 'translate3d(0,'+ (scrollY / 2) +'px,0)' : 'translate(0,'+ (scrollY / 2) +'px)'
        });
    }

    function parallaxLady() {
        scrollY2 = window.pageYOffset;

        if( scrollY2 > Pathways.panel_height )
            return;

        $lady.css({
            'transform': Modernizr.csstransforms3d ? 'translate3d(0,'+ (scrollY / 3) +'px,0)' : 'translate(0,'+ (scrollY / 3) +'px)'
        });
    }

    /**************
        Scenes
    **************/

    var scenes  = new Array(),
        idx     = 0;

    // Start panel

    if( _('.start') ) {
        var $start      = $('.start'),
            $content    = $start.find('.content').first(),
            scrollY     = 0,
            unit        = 0.5 / (Pathways.panel_height / 2),
            hidden      = false;

        window.addEventListener('scroll', parallaxStart, false);
    }


    // Svengali
    if( _('.falling-lady') ) {

        var $lady       = $('.falling-lady').first(),
            scrollY2    = 0;

        window.addEventListener('scroll', parallaxLady, false);
    }

    // Mute
    $('.mute').hide();

    $('.mute').on('click', function() {
        var $this   = $(this);

        // active == muted
        if( $this.hasClass('active') ) {
            $this.parents('.panel').find('video').each(function() {
                $(this).get(0).volume = 1;
            });
            $this.parents('.panel').find('audio').each(function() {
                $(this).get(0).volume = 1;
            });
            // $video.volume = 1;
            $this.removeClass('active');
        }
        else {
            $this.parents('.panel').find('video').each(function() {
                $(this).get(0).volume = 0;
            });
            $this.parents('.panel').find('audio').each(function() {
                $(this).get(0).volume = 0;
            });
            // $video.volume = 0;
            $this.addClass('active');
        }
    });

    /**************
        Sequence
     **************/

    if( _('.sequence') ) {
        var $bgs            = $sequence.find('.bg-container'),
            $first_panel    = $sequence.find('.panel').first(),
            $last_panel     = $sequence.find('.panel').last();

        scenes[idx++] = new ScrollScene({
                triggerElement: $sequence,
                triggerHook:    'top',
                duration:       ($sequence.height() - Pathways.panel_height)
            })
            .on('enter', function(e) {
                if( e.scrollDirection == 'FORWARD') {
                    $bgs.css({ position: 'fixed', display: 'none', opacity: 0 } );
                    $first_panel.find('.bg-container').css({ display: 'block', opacity: 1 });
                }
                if( e.scrollDirection == 'REVERSE') {
                    $bgs.css({ position: 'fixed' } );
                }
            })
            .on('leave', function(e) {
                $sequence.find('.bg-container').css({ position: 'absolute', display: 'block' } );
            })
     }

    // Panels & Components

    $('[data-component="gallery"]').hide();
    $('[data-component="quiz"]').hide();

    var panel_total = document.querySelectorAll('.sequence .panel').length,
        panel_count = 0;

    $('.sequence .panel').each(function() {
        var $this           = $(this),
            height          = $this.outerHeight(),
            $bg             = $this.find('.bg-container'),
            $library_panel  = $('[data-panel="'+ $this.attr('id') +'"]').first(),
            $gallery        = $this.find('[data-component="gallery"]'),
            $quiz           = $this.find('[data-component="quiz"]'),
            $mute           = $this.find('.mute'),
            
            tween           = TweenMax.to( $bg, 1, { opacity: 1 });

        panel_count+=1; // for tracking first and last panels (when logic needs to differ because of the lack of cross-fading)

        /*
            I can't entirely explain why we need to set the bg to block on both enter and leave. But it fixes
            a layering issue when loading the page during or after a sequence. SCIENCE!
        */
        // Panels
        scenes[idx++] = new ScrollScene({
                triggerElement: $this,
                duration:       (Pathways.panel_height / 4)
            })
            .on('enter', function() {
                $bg.css('display', 'block');
            })
            .on('leave', function() {
                $bg.css('display', 'block');
            })
            .setTween(tween)

        // Galleries
        // if( $gallery.length ) {
        //     scenes[idx++] = new ScrollScene({
        //             triggerElement: $this,
        //             triggerHook:    'top',
        //             duration:       (height - (height / 4) )
        //         })
        //         .on('enter', function() {
        //             $gallery.css({ position: 'fixed', display: 'block' });
        //             setTimeout(function() { $gallery.addClass('active'); }, 50);
        //         })
        //         .on('leave', function() {
        //             $gallery.css({ position: 'absolute', display: 'none' });
        //             setTimeout(function() { $gallery.removeClass('active'); }, 50);
        //         })
        // }

        // Quiz
        // if( $quiz.length ) {
        //     scenes[idx++] = new ScrollScene({
        //             triggerElement: $this,
        //             triggerHook:    'top',
        //             duration:       Pathways.panel_height
        //         })
        //         .on('enter', function() {
        //             $quiz.css({ position: 'fixed', display: 'block' });
        //             setTimeout(function() { $quiz.addClass('active'); }, 50);
        //         })
        //         .on('leave', function() {
        //             $quiz.css({ position: 'absolute', display: 'none' });
        //             setTimeout(function() { $quiz.removeClass('active'); }, 50);
        //         })
        // }

        // Library panels
        if( $library_panel.length ) {
            $library_panel.css('transform', 'translate('+ ($library_panel.outerWidth()) +'px, '+ ($library_panel.outerHeight() - 60) +'px)');

            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    duration:       (panel_count == panel_total) ? height - (height / 2) : (height - 300),
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

        // Panel specific scene code if it has any
        var panelID         = $this.attr('id'),
            handlerClass    = Pathways.Utils.toTitleCase(panelID);

        // Check the handler exists, then load
        if ( window.Pathways.Scene[handlerClass] != null ) {
            window.Pathways.Scene[handlerClass]();
        }
    });

    scenes.forEach(function(s) {
        s.addTo(controller);
    });

    Pathways.Scenes.forEach(function(s) {
        s.addTo(controller);
    })
}

// Cross fade between panel audio and global audio
Pathways.LoadPanelAudio = function(panel_audio) {
    if( Pathways.globalAudio ) {
        $(Pathways.globalAudio).animate({volume: 0}, 1000);
    }

    // fade in
    $(panel_audio).animate({volume: 1}, 1000);
}

Pathways.UnloadPanelAudio = function(panel_audio) {
    if( Pathways.globalAudio ) {
        $(Pathways.globalAudio).animate({volume: 1}, 1000);
    }

    // fade in
    $(panel_audio).animate({volume: 0}, 1000);
}
