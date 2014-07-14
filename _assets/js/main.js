
function _(str) { return document.querySelector(str); }


function positionCenter($elm) {
    var width   = $elm.width(),
        height  = $elm.height(),

        top     = (window.innerHeight / 2) - (height / 2),
        left    = (window.innerWidth / 2) - (width / 2);

    $elm.css({ position: 'absolute', top: top, left: left });
}


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
        }
    });

    window.addEventListener('resize', function() {
        navHeight = $nav.outerHeight();
        $nav.css('transform', 'translate(0, '+ -(navHeight - handleHeight) +'px)');
    })

    setTimeout(function() {
        $nav_handle.trigger('click');
    }, 1000);
})($);


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


if( window.innerWidth >= 720 ) {

    // Begin the tree animation. Forget trying to pause/play on entering exiting the panel. Let it go, man. Just let it go...
    var canvas, stage, exportRoot;

    function init() {
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

    init();
}

if( window.innerWidth >= 768 ) {
    var aspect_ratio    = 1900 / 1050,
        new_height      = window.innerWidth / aspect_ratio,
        p_height        = Modernizr.touch ? 550 : window.innerHeight ;

    function positionCrop() {
        new_height = window.innerWidth / aspect_ratio;
        $('.crop-zoom').css({
            'height':       new_height,
            'transform':    'translate(0, '+ ( (p_height - new_height) / 2 ) +'px)'
        });
    }

    positionCrop();
    window.addEventListener('resize', positionCrop);
}


Pathways.LoadScenes = function() {

    var panel_height    = window.innerHeight < 550 ? 550 : window.innerHeight,
        $sequence       = $('.sequence'),
        controller      = new ScrollMagic();


    $('.black-strip').css({
        position:       'fixed',
        'height':       panel_height,
        'transform':    'translate(0,'+panel_height+'px)'
    });

    window.addEventListener('resize', function() {
        $('.black-strip').css({
            'height': window.innerHeight < 550 ? 550 : window.innerHeight,
        });
    });

    function parallaxStart() {
        scrollY = window.pageYOffset;

        if( scrollY > panel_height )
            return;

        $content.css({
            'opacity':  1 - (unit * scrollY),
            'transform': Modernizr.csstransforms3d ? 'translate3d(0,'+ (scrollY / 2) +'px,0)' : 'translate(0,'+ (scrollY / 2) +'px)'
        });
    }

    function parallaxLady() {
        scrollY2 = window.pageYOffset;

        if( scrollY2 > panel_height )
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
            unit        = 1 / (panel_height / 2);

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
        var $bgs            = $sequence.find('.bg-container'),
            $first_panel    = $sequence.find('.panel').first(),
            $last_panel     = $sequence.find('.panel').last();

        scenes[idx++] = new ScrollScene({
                triggerElement: $sequence,
                triggerHook:    'top',
                duration:       ($sequence.height() - panel_height)
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

    $('.sequence .panel').each(function() {
        var $this           = $(this),
            height          = $this.outerHeight(),
            $bg             = $this.find('.bg-container'),
            $library_panel  = $('[data-panel="'+ $this.attr('id') +'"]').first(),
            $gallery        = $this.find('[data-component="gallery"]'),
            $quiz           = $this.find('[data-component="quiz"]'),
            $mute           = $this.find('.mute'),
            
            tween           = TweenMax.to( $bg, 1, { opacity: 1 });

        /*
            I can't entirely explain why we need to set the bg to block on both enter and leave. But it fixes
            a layering issue when loading the page during or after a sequence. SCIENCE!
        */
        // Panels
        scenes[idx++] = new ScrollScene({
                triggerElement: $this,
                duration:       (panel_height / 4)
            })
            .on('enter', function() {
                $bg.css('display', 'block');
            })
            .on('leave', function() {
                $bg.css('display', 'block');
            })
            .setTween(tween)

        // Galleries
        if( $gallery.length ) {
            scenes[idx++] = new ScrollScene({
                    triggerElement: $this,
                    triggerHook:    'top',
                    duration:       (height - (height / 4) )
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

    $('[data-scene]').each(function(){
        var handler = $(this).attr('data-scene');

        if ( handler ) {
            var handlerClass = Pathways.Utils.toTitleCase(handler);

            // Check the handler exists and it hasn't already been loaded
            if ( window.Pathways.Scene[handlerClass] != null ) {
                window.Pathways.Scene[handlerClass](panel_height);
            }
            
            if( window.Pathways.Scene[handlerClass] == null )
                console.warn('Could not load the necessary scene: ' + handlerClass);
        }
    });

    scenes.forEach(function(s) {
        s.addTo(controller);
    });

    Pathways.Scenes.forEach(function(s) {
        s.addTo(controller);
    })
}
