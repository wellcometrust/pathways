
var Pathways = function() {

}


var panel_height        = window.outerHeight < 750 ? 750 : window.outerHeight,
    after_start         = false,
    
    // Start
    $start              = $('.start'),
    $text               = $start.find('.content').first(),
    unit                = 1 / panel_height,

    // Sequences
    $sequence           = $('.sequence'),
    sequence_top        = 0,
    sequence_height     = 0,
    sequence_triggered  = false,
    sequence_passed     = false,
    panels              = [],
    panel_tops          = [],
    panel_idx           = 0,

    $sequence2          = $('.sequence2'),
    sequence_top2       = 0,
    sequence_height2    = 0,
    sequence_triggered2 = false,
    sequence_passed2    = false,
    panels2             = [],
    panel_tops2         = [],
    panel_idx2          = 0,

    lastScrollY         = 0,
    ticking             = false,

    // Library layer
    state               = 'closed',

    // Event queues
    scrollQueue         = new Array(),
    resizeQueue         = new Array();


var supports_touch = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch),
    controller;


$start.css('height', panel_height);

/**
 * Callback for our scroll event - just
 * keeps track of the last scroll value
 */
function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
}

/**
 * Calls rAF if it's not already
 * been done already
 */
function requestTick() {
    if(!ticking) {
        requestAnimationFrame(parallaxAllTheThings);
        ticking = true;
    }
}


function parallaxAllTheThings(e) {

    /** Start **/

    if( lastScrollY <= 0 )
        lastScrollY = 0;

    if( lastScrollY < (panel_height + 30) )
        $text.css( {'-webkit-transform': 'translate3d(0,'+ (lastScrollY / 2) +'px,0)', opacity: 1 - (lastScrollY * (1 / panel_height)) });
    else
        $text.css('-webkit-transform', 'translate3d(0,0,0)');

    /** Sequences **/

    // Scroll into the sequence
    if( lastScrollY > sequence_top && !sequence_triggered ) {
        $sequence.find('.bg').css({ position: 'fixed', opacity: 0 } );
        $sequence.find('.panel').first().find('.bg').css('opacity', 1);

        sequence_triggered = true;
    }

    // Scroll back before the sequence
    if( sequence_triggered && lastScrollY < sequence_top ) {
        $sequence.find('.bg').css({ position: 'static', display: 'block' } );

        sequence_triggered = false;
    }

    // Keep track of which panel we’re in
    if( sequence_triggered && lastScrollY > (panel_tops[panel_idx] + (panel_height / 4)) ) {
        if( panels[panel_idx+1] ) {
            // fade in the next panel based on scroll distance of the previous panel to the top.
            var unit    = 1 / (panel_height / 4),
                delta   = lastScrollY - (panel_tops[panel_idx] + (panel_height / 4)),
                opacity = unit * delta;

            panels[panel_idx+1].find('.bg').css( 'opacity', opacity );

            if( opacity >= 1 ) {
                opacity = 1;
                panel_idx++;
            }

        }
    }

    // A little simpler going backward. Just check that the scroll is below the previous threshold and if so, drop the panel index back one
    // so it triggers the previous opacity calculations.
    if( panel_idx > 0 ) {
        if( lastScrollY < (panel_tops[panel_idx] + (panel_height / 4)) ) {
            panel_idx--;
        }
    }


    // Reaches the end
    if( sequence_triggered && !sequence_passed && lastScrollY > (sequence_top + sequence_height - panel_height) ) {
        $sequence.find('.bg').css({ position: 'absolute' } );

        sequence_passed = true;
    }

    if( sequence_passed && lastScrollY < (sequence_top + sequence_height - panel_height) ) {
        $sequence.find('.bg').css({ position: 'fixed' } );

        sequence_passed = false;
    }


    /*
        Sequence 2
    */

    if( !sequence_triggered2 && lastScrollY > sequence_top2 ) {
        $sequence2.find('.bg').css({ position: 'fixed', top: 0, bottom: 'auto' } );

        sequence_triggered2 = true;
    }

    // Scroll back before the sequence
    if( sequence_triggered2 && lastScrollY < sequence_top2 ) {
        $sequence2.find('.bg').css({ position: 'absolute' } );

        sequence_triggered2 = false;
    }

    // Reaches the end
    if( sequence_triggered2 && !sequence_passed2 && lastScrollY > (sequence_top2 + sequence_height2 - (panel_height - 30)) ) {
        $sequence2.find('.bg').css({ position: 'absolute', top: 'auto', bottom: 0, height: 'auto' } );

        sequence_passed2 = true;
    }

    if( sequence_passed2 && lastScrollY < (sequence_top2 + sequence_height2 - (panel_height - 30)) ) {
        $sequence2.find('.bg').css({ position: 'fixed', top: 0, bottom: 'auto' } );

        sequence_passed2 = false;
    }

    // Complete the scroll queue
    scrollQueue.forEach(function(func) {
        func();
    });

    // allow further rAFs to be called
    ticking = false;
}


function resizeAllTheThings() {
    panel_height = window.outerHeight < 750 ? 750 : window.outerHeight,

    $('.mesmers-salon').css('height', panel_height);
    $('.panel').css('height', panel_height);

    $sequence.css('height', 'auto');
}

function positionCenter($elm) {
    var width   = $elm.width(),
        height  = $elm.height();

    $elm.css({ position: 'absolute', top: (panel_height / 2) - (height / 2), left: (window.outerWidth / 2) - (width / 2) });
}


function init() {

    // here be dragons.
    if(supports_touch)
        return;

    resizeAllTheThings();

    $('.panel', $sequence).each(function() {
        var $this = $(this);

        panels.push( $this );
        panel_tops.push( $this.offset().top )

        sequence_height += $this.height();
    });

    $('.panel', $sequence2).each(function() {
        var $this = $(this);

        panels2.push( $this );
        panel_tops2.push( $this.offset().top )

        sequence_height2 += $this.height();
    });

    $sequence.css('height', sequence_height);
    sequence_top    = $('.sequence').offset().top;
    sequence_top2   = $('.sequence2').offset().top;

    $sequence2.find('.panel-content').css({ position: 'fixed', opacity: 0 } );
}


resizeQueue.push(resizeAllTheThings);



$(document).ready(function() {

    controller = new ScrollMagic();

    $('.sequence2 .tween').each(function() {
        var tween   = TweenMax.to($(this).find('.panel-content').get(0), 0.5, {opacity: 1});
        var tween2  = TweenMax.to($(this).find('.panel-content').get(0), 0.5, {opacity: 0});

        new ScrollScene({
                    triggerElement: $(this).find('.scroll-content').get(0),
                    duration: 100,
                    offset: 250
                })
                .setTween(tween)
                .addTo(controller);

        new ScrollScene({
                    triggerElement: $(this).find('.scroll-content').get(0),
                    duration: 100,
                    offset: 550
                })
                .setTween(tween2)
                .addTo(controller);
    })

    /**
        Audio
    **/
    var $player     = document.querySelector('.audio-player'),
        playing     = false;

    $('.audio-icon').on('click', function() {
        if( playing ) {
            $player.pause();
            $('.audio-icon').removeClass('active');
            playing = false;
        }
        else {
            $player.play();
            $('.audio-icon').addClass('active');
            playing = true;
        }
    });



    /*
        Crop zoom
    */
    if( $('.crop-zoom').length ) {

        $('.crop-zoom').css({'position': 'fixed', 'opacity': 0, 'z-index': 20});

        var $elm            = $('.crop-zoom'),
            image_top       = $elm.offset().top,
            block_start     = $('.tap-block').offset().top - 200,
            offset          = panel_height / 4,
            image_height    = panel_height,
            inview          = false,
            hidden          = true;

        function onResize() {
            $elm.css({ width: window.outerWidth, height: window.outerHeight });
        }
        
        function onScroll() {

            // Is the area in view?

            if( window.scrollY > block_start && window.scrollY < (block_start + offset) )
                inview = true;
            else
                inview = false;


            // Do things when in view

            if(inview && hidden) {
                $elm.animate({'opacity': 1}, 200);
                $('.tap-target').addClass('animate');
                hidden = false;
            }
            else if( !inview && !hidden ) {
                $('.tap-target').removeClass('animate');
                $elm.animate({'opacity': 0}, 200);
                hidden = true;
            }
        }

        // Tap targets
        $elm.find('.tap-target').each(function() {
            var $target = $(this),
                key     = $target.data('crop'),
                image   = '../_assets/img/mesmer/'+ db[key]['image'],
                text    = db[key]['text'],
                img     = new Image();

            img.src = image;

            var ratio = img.width / img.height;

            // Set up the tap on the target.
            Hammer( $target.get(0) ).on('tap', function(e) {
                e.gesture.preventDefault();

                var $popup,
                    $image_crop,
                    $text,
                    $overlay;

                // create popup in memory
                $popup      = $('<div/>').addClass('popup');
                $image_crop = $(img).addClass('image-crop');
                $text       = $('<div/>').addClass('text').html(text);

                $popup.append( $image_crop );
                $popup.append( $text );

                $overlay = $('<div/>').addClass('overlay').css('height', window.outerHeight );

                $overlay.append($popup);
                $('body').append( $overlay );

                $image_crop.css( { top: ($target.offset().top - window.scrollY) + 10, left: $target.offset().left + 10, height: $target.height() - 10 } );

                $overlay.show();

                var width   = 'auto',
                    height  = 'auto';

                if( window.innerWidth < 900 ) {
                    width = '40%';
                }
                else {
                    height = window.outerHeight - 120;
                }

                $image_crop.get(0).addEventListener('transitionend', function() {
                    $text.css( { top: 40, left: ($image_crop.offset().left + $image_crop.width() + 40) } ).addClass('show');
                });

                $image_crop.addClass('animate');

                $image_crop.css({
                    top:    40,
                    left:   120,
                    width:  width,
                    height: height,
                    opacity: 1
                })

                $overlay.css('background-color', 'rgba(0,0,0,0.8)');

                $overlay.on('click', function() {
                    this.addEventListener('transitionend', function() { $(this).remove() }, false);
                    $(this).css('opacity', 0);
                });

                resizeQueue.push(function() {
                    $overlay.css('height', window.outerHeight );
                    
                    if( window.innerWidth < 900 ) {
                        $image_crop.css('height', 'auto');
                        $image_crop.css('width',  '40%');
                    }
                    else {
                        $image_crop.css('width', 'auto');
                        $image_crop.css('height', window.outerHeight - 60 );
                    }

                    $text.css( { left: ($image_crop.offset().left + $image_crop.width() + 40) } );
                })
            });
        });


        onResize();

        // Events
        scrollQueue.push(onScroll);
        resizeQueue.push(onResize);        
    }

    /*
        Investigates
    */
    $('.investigates').on('click', '.play-video', function() {

        var $this       = $(this),
            $overlay    = $('<div/>').addClass('overlay').css('height', panel_height ),
            $iframe     = $('<iframe/>').attr('src', $this.attr('href'));

        if( $this.data('width') )
            $iframe.attr('width', $this.data('width') );

        if( $this.data('height') )
            $iframe.attr('height', $this.data('height') );

        $overlay.append($iframe);
        $('body').append($overlay);

        $overlay.show().css('background-color', 'rgba(0,0,0,0.8)');
        
        positionCenter($iframe);

        setTimeout(function() {
            $iframe.addClass('animate');
        }, 400);

        $overlay.on('click', function() {
            this.addEventListener('transitionend', function() { $(this).remove() }, false);
            $overlay.css('opacity', 0);
        })

        resizeQueue.push( function() { $overlay.css('height', panel_height )} );

        return false;
    });

    /*
        Library
    */
    $('.library-layer').on('click', '.button', function() {
        if( state == 'closed' ) {
            $(this).addClass('animate');
            $('.library-layer .gap').css('height', 250);
            state = 'open';
        }
        else {
            $(this).removeClass('animate');
            $('.library-layer .gap').css('height', 0);
            state = 'closed';
        }
    });

    $('.gap').on('click', 'a', function(e) {
        var $this = $(this);

        if( $this.data('embed') ) {
            var embed_str   = '<div class="wellcomePlayer" data-uri="'+ $this.data('embed') +'" data-assetsequenceindex="0" data-assetindex="0" data-zoom="-0.6441,0,2.2881,1.4411" data-config="/service/playerconfig" style="width:800px; height:600px; background-color: #000"></div>',
                $embed      = $(embed_str),
                $overlay    = $('<div/>').addClass('overlay').css('height', panel_height ),
                $iframe     = $('<iframe/>').attr('src', $this.attr('href'));

            if( $this.data('width') )
                $iframe.attr('width', $this.data('width') );

            if( $this.data('height') )
                $iframe.attr('height', $this.data('height') );

            $overlay.append($embed);
            $('body').append($overlay);

            $overlay.show().css('background-color', 'rgba(0,0,0,0.8)');
            
            positionCenter($embed);

            $overlay.append( $('<script id="embedWellcomePlayer" src="http://wellcomelibrary.org/spas/player/build/wellcomeplayer/js/embed.js"><\/script>') );

            $overlay.on('click', function() {
                this.addEventListener('transitionend', function() { $(this).remove() }, false);
                $overlay.css('opacity', 0);
                window.embedScriptIncluded = false;
            })

            resizeQueue.push( function() { $overlay.css('height', panel_height ); } );

            e.preventDefault();
            return false; 
        }
    });
});

var tID;


window.addEventListener('scroll', onScroll);
window.addEventListener('load', init);

window.addEventListener('resize', function() {
    clearTimeout(tID);

    tID = setTimeout(function() {
        resizeQueue.forEach(function(func) { func(); });
    }, 300);

});

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

/*
    Sources: library
    types: player, video, audio
*/

var library_layer = {
    '1700 A Guide to Magnetic Cures': {
        source: 'library',
        url:    'http://search.wellcomelibrary.org/iii/encore/record/C__Rb1758773?lang=eng',
        type:   'player'
    }
}