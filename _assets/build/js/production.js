(function(window) {

    'use strict';

    var Pathways = function(options) {
        var Pathways        = this,
            orientation     = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
            panel_height    = window.innerHeight < 550 ? (550 + 10) : (window.innerHeight + 10),

            supports_touch  = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);

        /************************
            Private functions
        *************************/

        var init = function() {

            // Progressive loading. Some things need to happen before window load
            if( !supports_touch || window.innerWidth > 1000 ) {
                resizeAllTheThings();

                window.addEventListener('resize', function() {
                    resizeAllTheThings();
                });
            }

            window.addEventListener('resize', function() {
                resizeSomeThings();
            });

            // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
            window.addEventListener('load', function() {

                // If it's a non-touch device, load the scenes.
                if( !supports_touch ) {
                    window.Pathways.LoadScenes();
                }

                // If it's iPad width or larger, load the components
                if( window.innerWidth > 720 ) {
                    loadComponents();
                }

                // For things that need resizing all the time, even on touch devices.
                resizeSomeThings();

                configurePanels();

                loadVideo();
            })
        }

        var configurePanels = function() {
            var _panels = document.querySelectorAll('[data-config]'),
                length  = _panels.length;

            for (var i = 0; i < length; i++) {
                var data    = _panels[i].getAttribute('data-config'),
                    ob2     = JSON.parse(data);

                console.log( ob2 );
            };
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
                    sources = $this.data('src').replace(/\s+/g, ' ').split(' ');

                // If it's a touch device and the video is not marked as content, bail.
                if( supports_touch && !$this.hasClass('content') )
                    return;

                if( sources && sources.length ) {
                    var video = document.createElement('video');
                    
                    sources.forEach(function(e) {
                        var source = document.createElement('source');
                        source.src = e;

                        video.appendChild(source);
                    });
                    
                    video.loop  = true;

                    if( supports_touch ) {
                        video.controls  = true;
                        video.preload   = 'none';
                    }

                    $this.html(video);
                }
            });
        }

        var resizeSomeThings = function() {
            if( supports_touch ) {
                return;
            }
            
            $('.preserve-ratio').each(function() {
                var $this           = $(this),
                    $img            = $this.find('img').first(),
                    // panel_height    = $this.parent().outerHeight(),
                    img_height      = $img.outerHeight();

                $img.css('transform', 'translate(0, '+ ( (panel_height - img_height) / 2 ) +'px)');
            });
        }

        var resizeAllTheThings = function() {
            panel_height = window.innerHeight < 550 ? (550 + 10) : (window.innerHeight + 10);

            $('.start').css('height', panel_height);

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
            str = str.replace(/-/g,' ').replace(/_/g,' ');
            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
            return str.replace(/\W/g,'');
        }

        /************************
            Public functions
        *************************/

        init();
        return Pathways;
    }

    Pathways.Utils = (function(){
        return {
            toTitleCase: function(str){
                str = str.replace(/-/g,' ').replace(/_/g,' ');
                str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
                return str.replace(/\W/g,'');
            }
        }
    })();

    Pathways.Scene  = {};
    Pathways.Scenes = [];

    window.Pathways = Pathways;
})(window);



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

$('.library-panel').on('click', '[rel="external"]', function(e) {
    var $this = $(this);

    window.open( $this.attr('href') );

    e.preventDefault();
});


Pathways.LoadScenes = function() {

    var panel_height    = window.innerHeight < 550 ? (550 + 10) : (window.innerHeight + 10),
        $sequence       = $('.sequence'),
        controller      = new ScrollMagic();


    $('.black-strip').css({
        position:       'fixed',
        'height':       panel_height,
        'transform':    'translate(0,'+panel_height+'px)'
    });

    window.addEventListener('resize', function() {
        $('.black-strip').css({
            'height': window.innerHeight < 550 ? (550 + 10) : (window.innerHeight + 10),
        });
    });

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

        function parallaxStart() {
            scrollY = window.pageYOffset;

            if( scrollY > panel_height )
                return;

            if( scrollY > 0 ) {
                $content.css({
                    'opacity':  1 - (unit * scrollY),
                    'transform': Modernizr.csstransforms3d ? 'translate3d(0,'+ (scrollY / 2) +'px,0)' : 'translate(0,'+ (scrollY / 2) +'px)'
                });
            }
        }
    }


    // Svengali
    if( _('.falling-lady') ) {

        var $lady       = $('.falling-lady').first(),
            scrollY2    = 0;

        window.addEventListener('scroll', parallaxLady, false);

        function parallaxLady() {
            scrollY2 = window.pageYOffset;

            if( scrollY2 > panel_height )
                return;

            if( scrollY2 > 0 ) {
                $lady.css({
                    'transform': Modernizr.csstransforms3d ? 'translate3d(0,'+ (scrollY / 3) +'px,0)' : 'translate(0,'+ (scrollY / 3) +'px)'
                });
            }
        }
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

    // Panels

    $('[data-component="gallery"]').hide();
    $('[data-component="quiz"]').hide();

    $('.sequence .panel').each(function() {
        var $this           = $(this),
            height          = $this.height(),
            $bg             = $this.find('.bg-container'),
            // $library_panel  = $this.find('.library-panel'),
            $library_panel  = $('[data-panel="'+ $this.attr('id') +'"]').first(),
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


Pathways.AudioPlayer = function() {
    var self            = this,
        $player         = $('.audio-player'),
        $progress_bar   = $player.find('.progressed'),
        $time_left      = $player.find('.time-left span'),
        playing         = false;

    var src     = $player.data('src'),
        track   = new Audio(src);

    $player.on('click', '.controls', function() {
        if( playing ) {
            track.pause();
            $(this).removeClass('active');
            playing = false;
        }
        else {
            track.play();
            $(this).addClass('active');
            playing = true;
        }
    });

    track.addEventListener('timeupdate', function () {
        var remaining = parseInt(track.duration - track.currentTime);
        
        $progress_bar.css('width', (track.currentTime * (100 / track.duration) + '%' ));
        $time_left.html( self.secondsToMinutes(remaining) );
    });

    this.secondsToMinutes = function(seconds) {
        var mins        = Math.floor( seconds / 60 ),
            remainder   = seconds % 60;

        if( remainder < 10 )
            remainder = '0' + remainder;

        return mins + '.' + remainder;
    }
}
/*
    Carousel pattern initiator followed by the component.
*/

Pathways.Gallery = function() {

    $('body').on('click', '[data-component="gallery"]', function(e) {

        var $overlay    = $('<div class="overlay"></div>'),
            $close      = $('<div class="close"></div>');

        $overlay.css('height', window.innerHeight );

        $('body').append( $overlay );

        $overlay.show();
        $overlay.css('background-color', 'rgba(0,0,0,0.8)');

        setTimeout(function() {
            // Load the carousel
            var $div = $('<div class="carousel"></div>');
            $overlay.append($div);

            var carousel = new Carousel(".carousel");
            carousel.init();

            $overlay.append( $close );
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

    });

}

function Carousel(element)
{
    var self            = this,
        _element        = document.querySelector(element),
        element         = $(element),
        $prev           = null,
        $next           = null,

        container       = null,
        panes           = null,

        widths          = [],
        heights         = [],
        ratios          = [],

        pane_width      = 0,
        pane_count      = 0,
        current_pane    = 0,
        total_offset    = (window.innerWidth / 2);


    /**
     * initial
     */
    this.init = function() {
        // Load the images, run the rest of the logic after all the images have loaded via anonymous callback function.
        loadImages(function() {

            // reset
            container   = $(">ul", element);
            panes       = $(">ul>li", element);
            pane_count  = panes.length;

            loadNavigation();

            $(_element).find('ul').css( 'transform', 'translate('+ (total_offset - (widths[0] / 2)) +'px,0)');
            setPaneDimensions();

            panes.css('opacity', 0.4);
            panes.first().css('opacity', 1);
        });

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
        })
    };

    var loadImages = function(callback) {
        var ul              = document.createElement('ul'),
            totalImages     = imageDB.images.length,
            imagesLoaded    = 0;

        ul.style['height'] = window.innerHeight + 'px';

        imageDB.images.forEach(function(obj) {
            var li  = document.createElement('li'),
                img = new Image();

            img.src = '/_assets/img/' + imageDB.location + obj.image + '.jpg';
            img.style['height'] = '100%';
            li.style['height']  = '100%';

            li.appendChild(img);

            if( obj.text ) {
                var span = document.createElement('span'),
                    txt = document.createTextNode(obj.text);

                span.classList.add('text');
                span.appendChild(txt);
                li.appendChild(span);
            }

            ul.appendChild(li);

            img.onload = function(elm) {
                imagesLoaded++;

                console.log(imagesLoaded, totalImages);

                if( imagesLoaded == totalImages ) {
                    // resize the panes/container
                    var _panes      = _element.querySelectorAll('li'),
                        totalWidth  = 0;

                    for(var i = 0; i < _panes.length; i++) {
                        var w = parseInt( window.getComputedStyle(_panes[i]).width ),
                            h = parseInt( window.getComputedStyle(_panes[i]).height );
                        
                        widths.push(w);
                        heights.push(h);
                        ratios.push( (w / h) );

                        _panes[i].style['width'] = w + 'px';

                        totalWidth += w;
                    }
                    ul.style['width'] = totalWidth + 'px';

                    console.log(totalWidth);

                    callback.call();
                }
            }
        });

        _element.appendChild(ul);

        container = $(ul);
    }

    var loadNavigation = function() {
        $prev   = $('<div/>'),
        $next   = $('<div/>');

        $prev.addClass('prev disabled');
        $next.addClass('next');

        $prev.css({
            'left':     0,
            'height':   window.innerHeight + 'px',
        });

        $next.css({
            'right':    0,
            'height':   window.innerHeight + 'px',
        });

        element.append($prev);
        element.append($next);

        new Hammer($prev[0]).on("tap", function() {
           self.prev(); 
        });

        new Hammer($next[0]).on("tap", function() {
           self.next(); 
        });
    }

    /**
     * set the pane dimensions and scale the container
     */
    function setPaneDimensions() {
        var $ul         = element.find('ul'),
            total_width = 0;

        widths  = [];
        heights = [];
        
        for (var i = 0; i < panes.length; i++) {
            var newHeight = window.innerHeight,
                newWidth  = ratios[i] * window.innerHeight;

            // panes[i].style['height']    = newHeight + 'px';
            panes[i].style['width']     = newWidth + 'px';

            widths.push(newWidth);
            heights.push(newHeight);

            total_width += newWidth;
        };
        
        container.width(total_width);
        total_offset = (window.innerWidth / 2);

        pane_width = parseInt(total_width / panes.length);

        // Heights
        $ul.css('height', window.innerHeight);
        container.css('height', window.innerHeight);

        $prev.height( window.innerHeight );
        $next.height( window.innerHeight );

        self.showPane(current_pane, false);
    };


    /**
     * show pane by index
     */
    this.showPane = function(index, animate) {
        var offset  = 0,
            count   = 0;

        // between the bounds
        index           = Math.max(0, Math.min(index, pane_count-1));
        current_pane    = index;

        for (var i = 0; i < index; i++) {
            offset -= widths[i];
        };

        offset += (total_offset - (widths[index] / 2));

        panes.css('opacity', 0.4);
        panes.get(current_pane).style['opacity'] = 1;

        setContainerOffset(offset, animate);

        if( index > 0 )
            $prev.removeClass('disabled');
        else {
            $prev.addClass('disabled');
        }

        if( index >= (pane_count - 1) )
            $next.addClass('disabled');
        else {
            $next.removeClass('disabled');
        }
    };

    function setContainerOffset(percent, animate) {
        container.removeClass("animate");

        if(animate) {
            container.addClass("animate");
        }

        container.css("transform", "translate3d("+ percent +"px,0,0)");
    }

    this.next = function() { return this.showPane(current_pane+1, true); };
    this.prev = function() { return this.showPane(current_pane-1, true); };


    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch(ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                var pane_offset = 0,
                    count       = 0;

                for (var i = 0; i < current_pane; i++) {
                    pane_offset -= widths[i];
                };

                pane_offset += (total_offset - (widths[current_pane] / 2));

                var drag_offset = ((100/440)*ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                if((current_pane == 0 && ev.gesture.direction == "right") ||
                    (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
                    drag_offset *= .4;
                }

                setContainerOffset(ev.gesture.deltaX + pane_offset);
                break;

            case 'swipeleft':
                self.next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                self.prev();
                ev.gesture.stopDetect();
                break;

            case 'release':
                // more then 30% moved, navigate
                if(Math.abs(ev.gesture.deltaX) > ( (pane_width / 10) * 3 )) {
                    if(ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                }
                else {
                    self.showPane(current_pane, true);
                }
                break;
        }
    }

    new Hammer(element[0], { drag_lock_to_axis: true }).on("release dragleft dragright swipeleft swiperight", handleHammer);
}


Pathways.CropZoom = function(panel_height) {

    var $elm    = $('.crop-zoom'),
        url     = '/_assets/img/mesmer/';
    
    $elm.css({
        position:   'absolute',
        opacity:    Modernizr.touch ? 1 : 0,
        width:      window.innerWidth,
        'z-index':  10
    });

    window.addEventListener('resize', function() {
        $elm.css( { 'width': window.innerWidth } );
    })

    // Tap targets
    $elm.find('.tap-target').each(function() {
        var $target     = $(this),
            key         = $target.data('crop');

        if( !db[key] ) {
            console.warn('No related info was found for this tap target');
            return;
        }

        var image       = url + db[key]['image'],
            title       = db[key]['title']      ? db[key]['title']      : '',
            text        = db[key]['text']       ? db[key]['text']       : '',
            position    = db[key]['position']   ? db[key]['position']   : '',
            img         = new Image(),
            content;

        img.src = image;

        // Create the text content
        content = title != '' ? '<h2>'+title+'</h2>' : '';
        content += '<p>'+ text + '</p>';

        // Set up the tap on the target.
        Hammer( $target.get(0) ).on('tap', function(e) {
            e.gesture.preventDefault();

            var $overlay    = $('<div class="overlay"></div>'),
                $popup      = $('<div class="popup"></div>'),
                $image_crop = $(img).addClass('image-crop'),
                $text       = $('<div class="text"></div>'),
                $close      = $('<div class="close"></div>');

            // Add in the elements
            $text.html(content);
            $popup.append( $image_crop );
            $popup.append( $text );

            $overlay.append($popup);
            $overlay.append( $close );
            $('body').append($overlay);

            $overlay.css('height', window.outerHeight );

            $overlay.css('background-color', 'rgba(0,0,0,0.9)');

            // Set an event so that after the image transitions in, show the text
            $image_crop.get(0).addEventListener('transitionend', function() {
                $text.css( { top: (window.innerHeight - $text.outerHeight() - 15) } );

                if( position == 'right' )
                    $text.css('right', 40);
                else
                    $text.css('left', 40);

                $text.addClass('show');
            });

            $image_crop.css( { top: 0, left: 0, 'transform': 'translate(0, '+(panel_height / 4)+'px)', opacity: 0 } );

            // Animate in the text
            setTimeout(function() {
                $image_crop.addClass('animate');
                $image_crop.css({ 'transform': 'translate(0, 0)', opacity: 1 });
            }, 50);

            $image_crop.on('click', function() {
                $overlay.get(0).addEventListener('transitionend', function() { $(this).remove() }, false);
                $overlay.css('opacity', 0);
            });

            $close.on('click', function() {
                console.log('wibble');
                $overlay.get(0).addEventListener('transitionend', function() { $(this).remove() }, false);
                $overlay.css('opacity', 0);
            });

            window.addEventListener('resize', function() {
                $overlay.css('height', window.innerHeight );
                $text.css( { top: (window.innerHeight - $text.outerHeight() - 15) } );
            })
        });
    });

}


Pathways.LibraryLayer = function(panel_height) {

    var $gap    = $('.library-layer .gap'),
        height  = $gap.height(),
        state   = 'closed';

    $gap.css({ 'height': 0, 'transition': 'height 0.4s ease' });
    $('.library-layer .button').html('open');

    $('.library-layer').on('click', '.bar', function() {
        if( state == 'closed' ) {
            $('.library-layer .gap').css('height', height);
            state = 'open';

            // scroll to the top of the library layer
            $('html, body').animate({
                scrollTop: ($gap.offset().top - 100)
            }, 500)
        }
        else {
            $('.library-layer .gap').css('height', 0);
            state = 'closed';
        }

        return false;
    });

    $gap.on('click', 'a', function(e) {
        var $this           = $(this),
            playerWidth     = (window.innerWidth - 180),
            playerHeight    = (window.innerHeight - 180);

        if( $this.data('embed') ) {
            var embed_str   = '<div class="wellcomePlayer" data-uri="'+ $this.data('embed') +'" data-assetsequenceindex="0" data-assetindex="0" data-zoom="-0.6441,0,2.2881,1.4411" data-config="/service/playerconfig" style="width:'+playerWidth+'px; height:'+playerHeight+'px; background-color: #000"></div>',
                $embed      = $(embed_str),
                $overlay    = $('<div class="overlay"></div>'),
                $close      = $('<div class="close"></div>');
                $iframe     = $('<iframe/>').attr('src', $this.attr('href'));

            $iframe.attr('width', playerWidth );
            $iframe.attr('height', playerHeight );

            $overlay.css('height', panel_height );

            $('body').append($overlay);

            $overlay.show();
            $overlay.css('background-color', 'rgba(0,0,0,0.8)');

            setTimeout(function() {
                positionCenter($embed);
                $overlay.append($embed);

                $overlay.append( $('<script id="embedWellcomePlayer" src="http://wellcomelibrary.org/spas/player/build/wellcomeplayer/js/embed.js"><\/script>') );
                $overlay.append( $close );
            }, 800);

            $overlay.on('click', function() {
                this.addEventListener('transitionend', function() { $(this).remove() }, false);
                $overlay.css('opacity', 0);
                window.embedScriptIncluded = false;
            })

            window.addEventListener('resize', function() {
                playerWidth     = (window.innerWidth - 180),
                playerHeight    = (window.innerHeight - 180);

                $overlay.css('height', window.innerHeight );

                $iframe.css('width', playerWidth );
                $iframe.css('height', playerHeight );

                $embed.css('width', playerWidth );
                $embed.css('height', playerHeight );
            });

            e.preventDefault();
            return false; 
        }
    });

}


Pathways.LibraryPanel = function() {
    $('.library-panel').on('click', '.handle', function() {
        var $panel = $(this).parent();

        if( $panel.hasClass('active') ) {
            $panel.css('transform', 'translate('+ ($panel.outerWidth()) +'px, '+ ($panel.outerHeight() - 60) +'px)');
            $panel.removeClass('active');
        }
        else {
            $panel.css('transform', 'translate(38px, 38px)');
            $panel.addClass('active');
        }
    })
}


Pathways.Quiz = function() {

    $('body').on('click', '[data-component="quiz"]', function(e) {
        // setup overlay
        var $overlay    = $('<div class="overlay"></div>'),
            $close      = $('<div class="close"></div>');

        $overlay.css('height', window.innerHeight );

        // append overlay
        $('body').append( $overlay );

        $overlay.show();
        $overlay.css('background-color', 'rgba(0,0,0,0.9)');

        // append and initialize quiz
        setTimeout(function() {
            var $code           = $( _('#template-quiz').innerHTML ),
                $content        = $('<div class="content"></div>'),
                $quizContainer  = $('<div class="quiz"></div>');

            $content.append( $code );
            $quizContainer.append( $content );
            $overlay.append( $quizContainer );

            positionCenter($quizContainer);

            var quiz = new Quiz($quizContainer);

            $overlay.append( $close );
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

        $(window).on('resize', function() {
            $overlay.css('height', window.innerHeight);
        });

    });
}

function Quiz(element) {
    var $quiz           = $(element),
        started         = false,
        paused          = false,
        level           = 1,
        questions       = quiz_db['questions'],
        answers         = quiz_db['questions'][level]['answers'],
        totalQuestions  = questions.length,
        score           = 0,

        timerWait       = 5, // in seconds
        timerLength     = 5, // in seconds

        $remaining  = $quiz.find('.remaining'),
        $score      = $quiz.find('.score span'),

        $timer      = $('<div/>').addClass('timer').css('display', 'none'),
        timerID;


    this.init = function() {
        var self = this;

        console.log('init');

        $quiz.on('click', '.quiz-start .button', function() {
            self.start();
        });
    }

    this.start = function() {
        console.log('starting');

        var self = this;

        $quiz.find('.quiz-start').hide();
        $quiz.find('.status-bar').show();
        $quiz.find('.quiz-playground').show();

        // Add the timer
        $quiz.append($timer);

        // Load the level
        this.loadLevel();

        // set up the click events
        $quiz.on('click', 'li', function(e) {
            if( !paused )
                self.validate(e);
        });
    }

    this.getCurrentQuestion = function() {
        return questions[(level-1)];
    }

    this.loadLevel = function(l) {
        // image
        var self        = this,
            question    = this.getCurrentQuestion(),
            $image      = $('<img/>').attr('src', question['image']),
            str         = '<ul>';

        $quiz.find('.image').html($image);

        // question
        $quiz.find('.question').html(question['title']);

        // answers
        for (var i = 0; i < question['answers'].length; i++) {
            str += '<li>' + question['answers'][i] + '</li>';
        }

        str += '</ul>';

        $quiz.find('.answers').html(str);

        this.updateScore();
        this.updateQuestionsRemaining();

        // Wait for timerWait seconds then start a timerLength countdown
        setTimeout(function() {
            self.startTimer();
        }, (timerWait * 1000));
    }

    this.validate = function(e) {
        var self        = this,
            question    = this.getCurrentQuestion(),
            correct     = false;

        this.stopTimer();

        if( $quiz.find('li').index($(e.currentTarget)) == (question['correct'] - 1) )
            correct = true;

        if( correct ) {
            paused = true;
            this.showCorrect($(e.currentTarget));
            score++;
            this.updateScore();
        }
        else
            this.showError($(e.currentTarget));

        setTimeout(function() {
            paused = false;
            self.stopTimer();
            self.nextQuestion($(e.currentTarget));
        }, 2000)
    }

    this.nextQuestion = function($elm) {
        level++;

        if( level <= questions.length )
            this.loadLevel();
        else
            this.finishGame();
    }

    this.showCorrect = function($elm) {
        $elm.addClass('correct');
    }

    this.showError = function($elm) {
        $elm.addClass('wrong');
    }

    this.revealAnswers = function() {
        var self        = this,
            question    = this.getCurrentQuestion(),
            count       = 1;

        $quiz.find('.answers li').each(function() {
            if(count == question['correct'])
                self.showCorrect($(this));
            else
                self.showError($(this));

            count++;
        })
    }

    this.updateScore = function() {
        $score.html(score);
    }

    this.updateQuestionsRemaining = function() {
        $remaining.html('<em>'+level+'</em> of <span>'+totalQuestions+'</span>');
    }

    this.startTimer = function() {
        var self    = this,
            counter = timerLength;

        clearInterval(timerID);

        var elm = $quiz.find('.quiz-playground .image');

        var diff = $quiz.find('.quiz-playground .image').offset().top - $quiz.find('.quiz-playground').offset().top;

        $timer.css({
            top:        (diff + elm.outerHeight() / 2) - ($timer.height() / 2),
            left:       (elm.outerWidth() / 2) - ($timer.width() / 2)
        })
        .html(counter);

        $timer.fadeIn(100);

        timerID = setInterval(function() {
            if(counter > 1) {
                $timer.html(--counter);
            }
            else {
                $timer.html('<span style="color:red">'+ (--counter) + '</span>');

                paused = true;
                self.stopTimer();
                self.revealAnswers();

                setTimeout(function() {
                    paused = false;
                    $timer.fadeOut(100);
                    self.nextQuestion();
                }, 2000);
            }
        }, 1000);
    }

    this.stopTimer = function() {
        clearInterval(timerID);
        $timer.fadeOut(100);
    }


    this.finishGame = function() {
        var self            = this,
            $quiz_finish    = $quiz.find('.quiz-finish');

        this.stopTimer();
        $timer.css('display', 'none');

        $quiz_finish.find('.quiz-finish--score').html('<span>'+score+'</span> out of ' + totalQuestions);
        
        $quiz.find('.quiz-playground').hide();
        $quiz_finish.show();

        $quiz_finish.on('click', '.play-again', function() {
            self.restart();
        });
    }

    this.restart = function() {
        score = 0;
        level = 1;

        this.start();
    }

    this.init();
}


var quiz_db = {
    'title': 'The Esdaile Game',
    'questions' : [
         {
            'image':    'http://placekitten.com/500/295',
            'title':    'Estimate the weight of the tumour',
            'answers':  ['0.5kg', '1kg', '2kg', '5kg'],
            'correct':  1
         },
         {
            'image':    'http://placekitten.com/600/300',
            'title':    'How long did it take to remove?',
            'answers':  ['5 minutes', '30 minutes', '2 hours', '4 hours'],
            'correct':  4
         },
    ]
}


Pathways.Scene.MesmersSalon = function(panel_height) {

    var scene = new ScrollScene({
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

    Pathways.Scenes.push(scene);
}

Pathways.Scene.MagnetisedTrees = function(panel_height) {
    
    // var tree_offset = $('#magnetised-trees').data('offset-height') ? $('#magnetised-trees').data('offset-height') : 0;
    
    var scene1 = new ScrollScene({
            triggerElement: '#magnetised-trees',
            duration:       panel_height
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to('#magnetised-trees .black-strip', .4, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to('#magnetised-trees .black-strip', .2, { y: panel_height }); // scroll down
        });

    Pathways.Scenes.push(scene1);

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
        createjs.Ticker.addEventListener("tick", stage);
    }

    init();
}

Pathways.Scene.Satirised = function(panel_height) {
    var news_offset = $('#satirised').data('offset-height') ? $('#satirised').data('offset-height') : 0;

    var scene = new ScrollScene({
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
        });

    Pathways.Scenes.push(scene);
}

Pathways.Scene.CommitteeInvestigates = function(panel_height) {
    var scene = new ScrollScene({
                triggerElement: '#committee-investigates',
                duration:       panel_height + 100
            })
            .on('enter', function(e) {
                var ci_vid = _('#committee-investigates video');
                ci_vid.play();

                // ci_vid.addEventListener('canplay', function() {
                // });
            })
            .on('leave', function(e) {
                var ci_vid = _('#committee-investigates video');
                ci_vid.pause();
                ci_vid.currentTime = 0;
            });

    Pathways.Scenes.push(scene);
}

Pathways.Scene.Airloom = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#airloom',
            duration:       panel_height
        })
        .on('enter', function(e) {
            if( _('#airloom video') ) {
                _('#airloom video').currentTime = 0.4;
                _('#airloom video').play();
            }
        })
        .on('leave', function(e) {
            if( _('#airloom video') ) {
                _('#airloom video').pause();
                _('#airloom video').currentTime = 0;
            }
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.OkeySisters = function(panel_height) {

    $('#okey-sisters .main-content, #okey-sisters .secondary-content').css({ 'bottom': 'auto', 'top': panel_height });
    $('#thomas-wakley .main-content').css({ 'bottom': 'auto', 'top': (panel_height / 3) });

    var scene = new ScrollScene({
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

    Pathways.Scenes.push(scene);
}

Pathways.Scene.GonadMan = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#gonad-man',
            triggerHook:    'top'
        })
        .on('enter', function() {
            $('#gonad-man').addClass('active');
        });

    Pathways.Scenes.push(scene);
}

Pathways.Scene.India = function(panel_height) {

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
    });

    var scene = new ScrollScene({
            triggerElement: '#india',
            duration:       panel_height
        })
        .on('enter', function() {
            $boats.css('transform', 'translate(320px,0)');
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.SurgeryUnderHypnosis = function(panel_height) {

    var scene = new ScrollScene({
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

    Pathways.Scenes.push(scene);
}

Pathways.Scene.SelfHypnosis = function(panel_height) {

    var scene = new ScrollScene({
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

    Pathways.Scenes.push(scene);
}

Pathways.Scene.Trilby = function(panel_height) {

    $('.comic-panel').css('opacity', 0);

    $('.comic-panel').each(function() {
        var $this   = $(this),
            tween   = TweenMax.to( $this, 1, { opacity: 1 } ),
            offset  = $this.data('offset') ? $this.data('offset') : 0;

        var scene = new ScrollScene({
                triggerElement:     $this,
                duration:           200,
                offset:             offset
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);
    });
    
}

Pathways.Scene.AnnaO = function(panel_height) {

    var positions = [
        { x: -57,   y: -107 },
        { x: 79,    y: 32 },
        { x: 178,   y: 178 },
        { x: -144,  y: 106 },
    ];

    var counter = 0;

    $('#anna-o .fragmented').each(function() {
        var $this = $(this);

        var x = positions[counter].x;
            y = positions[counter].y;

        if( Modernizr.csstransforms3d )
            $this.css( { 'transform': 'translate3d('+ x +'px, '+ y +'px, 0)' } );
        else
            $this.css( { 'transform': 'translate('+ x +'px, '+ y +'px)' } );

        counter++;
    })

    $('#anna-o .fragmented').each(function() {
        var tween = TweenMax.to( $(this), 1, { x: 0, y: -3 } );

        var scene = new ScrollScene({
                triggerElement: '#anna-o',
                triggerHook:    'top',
                duration:       $('#anna-o').height() - 420,
                offset:         50,
            })
            .setTween(tween);

        Pathways.Scenes.push(scene);
    });

}

Pathways.Scene.AnnaOVideo = function(panel_height) {

    var scene = new ScrollScene({
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

    Pathways.Scenes.push(scene);
}

Pathways.Scene.Office = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#office',
            duration:       panel_height
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to('#office .black-strip', .5, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to('#office .black-strip', .2, { y: panel_height }); // scroll down
        })

    Pathways.Scenes.push(scene);
}

Pathways.Scene.Office2 = function(panel_height) {

    var scene = new ScrollScene({
            triggerElement: '#office-2',
        })
        .on('enter', function() {
            $('#office-2').addClass('active');
        })

    Pathways.Scenes.push(scene);
}