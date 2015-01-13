// Global Nav
(function(w, $) {
    "use strict";

    var $nav = $('.global-navigation'),
        $nav_handle = $nav.find('.handle'),
        state = 'open',
        navHeight = $nav.outerHeight(),
        handleHeight = $nav_handle.outerHeight();

    $nav.on('click', '.handle', function() {
        navHeight = $nav.outerHeight();

        if (state == 'open') {
            $nav.css('transform', 'translate(0, ' + -(navHeight - handleHeight) + 'px)');
            state = 'closed';
        } else {
            $nav.css('transform', 'translate(0, 0)');
            state = 'open';

            // add an event listener on scroll to close the nav if open.
            $(w).one('scroll', function() {
                $nav_handle.trigger('click');
            });
        }
    });

    w.addEventListener('resize', function() {
        navHeight = $nav.outerHeight();
        $nav.css('transform', 'translate(0, ' + -(navHeight - handleHeight) + 'px)');
    });

    w.setTimeout(function() {
        $nav_handle.trigger('click');
    }, 1000);


    /*
        Events
    */

    // put this here for now.
    $('.comic-quote').on('click', '.info-box', function() {
        var $this = $(this),
            $parent = $this.parent();

        if ($parent.hasClass('active')) {
            $parent.removeClass('active');
        } else {
            $parent.addClass('active');
        }
    });



}(window, $));




// Init Animations
(Pathways.initAnimation = function(w, doc, anim, cjs, Mod) {
    "use strict";

    return function(id) {
        var canvas = doc.getElementById(id),
            a = anim[id];

        if (!canvas) return;
        if (!a) return console.warn('No animation properties with id \'' + id + '\' found');

        function initCanvas() {
            var lib = a.lib;

            var loader = new cjs.LoadQueue(false);
            loader.addEventListener("fileload", handleFileLoad);
            loader.addEventListener("complete", handleComplete);
            loader.loadManifest(lib.properties.manifest);
            a.start = function() {};
            a.stop = function() {};

        }

        function handleFileLoad(evt) {
            var images = a.images;
            if (evt.item.type == "image") {
                images[evt.item.id] = evt.result;
            }
        }

        function handleComplete() {
            var lib = a.lib,
                exportRoot = new lib.tree2(),
                stage = new cjs.Stage(canvas);

            a.stage = stage;

            stage.addChild(exportRoot);
            stage.update();

            cjs.Ticker.setFPS(lib.properties.fps);

            a.start = function() {
                cjs.Ticker.addEventListener("tick", stage);
            };
            a.stop = function() {
                cjs.Ticker.removeEventListener("tick", stage);
            };


        }

        if (w.innerWidth >= 768) {
            initCanvas();
        }
    };


}(window, document, animations, createjs, Modernizr));





// Init Global ScrollScenes
(function(w, $, p, Sm, Ss, Mod, Tm) {

    "use strict";

    var $parallaxContent = $('.start').find('.content').first();
    var $parallaxLady = $('.start').find('.falling-lady').first();

    function parallaxContentLoad() {
        var scrollY = w.pageYOffset,
            unit = 0.5 / (p.panelHeight / 2);

        if ($parallaxContent) {
            if (scrollY > p.panelHeight) {
                $parallaxContent.removeAttr('style');
                return;
            }

            $parallaxContent.css({
                'display': 'block',
                'opacity': 1 - (unit * scrollY),
                'transform': Mod.csstransforms3d ? 'translate3d(0,' + (scrollY / 2) + 'px,0)' : 'translate(0,' + (scrollY / 2) + 'px)'
            });
        }
    }

    function parallaxContentUnload() {
        $parallaxContent.removeAttr('style');
        w.removeEventListener('scroll', parallaxContentLoad);
    }

    function parallaxLadyLoad() {
        var scrollY = w.pageYOffset,
            $parallaxLady = $('.falling-lady').first();

        if ($parallaxLady) {
            if (scrollY > p.panelHeight)
                return;

            $parallaxLady.css({
                'transform': Mod.csstransforms3d ? 'translate3d(0,' + (scrollY * 0.7) + 'px,0)' : 'translate(0,' + (scrollY * 0.7) + 'px)'
            });
        }
    }

    function parallaxLadyUnload() {
        $parallaxLady.removeAttr('style');
        w.removeEventListener('scroll', parallaxLadyLoad);
    }

    function onScrollUnload() {

        if ($parallaxContent) {
            parallaxContentUnload();
        }

        if ($parallaxLady) {
            parallaxLadyUnload();
        }
    }


    function onScrollLoad() {

        var $sequence = $('.sequence'),
            controller = new Sm({
                //refreshInterval: 500
            }),
            $blackStrip = $('.black-strip');

        function resizeBlackStrip(e) {
            $blackStrip.css({
                position: 'fixed',
                'height': p.panelHeight,
                'transform': 'translate(0,' + p.panelHeight + 'px)'
            });
        }

        if ($blackStrip.length) {
            resizeBlackStrip();
            w.addEventListener('resize', resizeBlackStrip);
        }

        function getValueFromConfig(rawConfig, name) {
            var config;
            if (rawConfig) config = JSON.parse(rawConfig);
            return (config && config[name]) || null;
        }



        /**************
            Scenes
        **************/

        var scenes = [],
            idx = 0;

        // Start panel

        if ($parallaxContent) {
            w.addEventListener('scroll', parallaxContentLoad, false);
        }


        // Svengali
        if ($parallaxLady) {
            w.addEventListener('scroll', parallaxLadyLoad, false);
        }


        /**************
            Sequence
         **************/

        if ($sequence.length) {
            var $bgs = $sequence.find('.bg-container'),
                $first_panel = $sequence.find('.panel').first(),
                $last_panel = $sequence.find('.panel').last();

            scenes[idx++] = new Ss({
                    triggerElement: $sequence,
                    triggerHook: 'top',
                    duration: function() {
                        return ($sequence.height() - p.panelHeight);
                    }
                })
                .on('enter', function(e) {
                    $bgs.css({
                        display: 'block'
                    }); // To fix layering when reloading
                    if (e.scrollDirection == 'FORWARD') {
                        $bgs.css({
                            position: 'fixed',
                            display: 'none',
                            opacity: 0
                        });
                        $first_panel.find('.bg-container').css({
                            display: 'block',
                            opacity: 1
                        });
                    }
                    if (e.scrollDirection == 'REVERSE') {
                        $bgs.css({
                            position: 'fixed'
                        });
                    }
                })
                .on('leave', function(e) {
                    $bgs.css({
                        position: 'absolute',
                        display: 'block'
                    });
                });
        }

        // Panels & Components

        $('[data-component="gallery"]').hide();
        $('[data-component="letter-gallery"]').hide();
        $('[data-component="quiz"]').hide();

        var $panels = $('.sequence .panel'),
            panel_total = $panels.length,
            panel_count = 0;

        $panels.each(function() {
            var $this = $(this),
                panelID = $this.attr('id'),
                $bg = $this.find('.bg-container'),
                $library_panel = $('[data-panel="' + panelID + '"]').first(),
                $gallery = $this.find('[data-component="gallery"]'),
                $letterGallery = $this.find('[data-component="letter-gallery"]'),
                $quiz = $this.find('[data-component="quiz"]'),
                $panelAudio = $this.find('[data-audio="panel"]'),
                $fxAudio = $this.find('[data-audio="fx"]'),
                $panelVideo = $this.find('[data-video="panel"]'),
                $slidingPanels = $this.find('.sliding-panel'),

                tween = Tm.to($bg, 1, {
                    opacity: 1
                });

            panel_count += 1; // for tracking first and last panels (when logic needs to differ because of the lack of cross-fading)

            function getMediaDuration() {
                return $this.outerHeight();
            }

            function getTweenDuration() {
                return p.panelHeight / 4;
            }

            function getComponentDuration(offset) {
                return function() {
                    var val = ($this.outerHeight() * 0.75) - offset;
                    return (val > 0 ? val : 0);
                };
            }

            function getLibPanelDuration() {
                var h = $this.outerHeight(),
                    val = parseInt((panel_count == panel_total) ? (h * 0.75) : (h - 300), 10);

                return (val > 0 ? val : 0);
            }

            function getPinDuration() {
                return parseInt($this.outerHeight() + (p.panelHeight * 0.75), 10);
            }

            // Controls layering
            scenes[idx++] = new Ss({
                    triggerElement: $this,
                    triggerHook: 'bottom',
                    duration: getPinDuration
                })
                .on('enter', function() {
                    $bg.css('display', 'block');
                })
                .on('leave', function() {
                    $bg.css('display', 'none');
                });

            // Panels Opacity transition
            scenes[idx++] = new Ss({
                    triggerElement: $this,
                    duration: getTweenDuration
                })
                .setTween(tween);

            // Galleries
            if ($gallery.length) {
                var g_offset = getValueFromConfig($gallery.attr('data-config'), 'offset_height') || 0;
                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        triggerHook: 'top',
                        duration: getComponentDuration(g_offset),
                        offset: g_offset
                    })
                    .on('enter', function() {
                        $gallery.css({
                            position: 'fixed',
                            display: 'block'
                        });
                        setTimeout(function() {
                            $gallery.addClass('active');
                        }, 50);
                    })
                    .on('leave', function() {
                        $gallery.css({
                            position: 'absolute',
                            display: 'none'
                        });
                        setTimeout(function() {
                            $gallery.removeClass('active');
                        }, 50);
                    });
            }

            // Letter Galleries
            if ($letterGallery.length) {
                var lg_offset = getValueFromConfig($letterGallery.attr('data-config'), 'offset_height') || 0;
                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        triggerHook: 'top',
                        duration: getComponentDuration(lg_offset),
                        offset: lg_offset
                    })
                    .on('enter', function() {
                        $letterGallery.css({
                            position: 'fixed',
                            display: 'block'
                        });
                        setTimeout(function() {
                            $letterGallery.addClass('active');
                        }, 50);
                    })
                    .on('leave', function() {
                        $letterGallery.css({
                            position: 'absolute',
                            display: 'none'
                        });
                        setTimeout(function() {
                            $letterGallery.removeClass('active');
                        }, 50);
                    });
            }

            // Quiz
            if ($quiz.length) {
                var q_offset = getValueFromConfig($quiz.attr('data-config'), 'offset_height') || 0;
                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        triggerHook: 'top',
                        duration: getComponentDuration(q_offset),
                        offset: q_offset
                    })
                    .on('enter', function() {
                        $quiz.css({
                            position: 'fixed',
                            display: 'block'
                        });
                        setTimeout(function() {
                            $quiz.addClass('active');
                        }, 50);
                    })
                    .on('leave', function() {
                        $quiz.css({
                            position: 'absolute',
                            display: 'none'
                        });
                        setTimeout(function() {
                            $quiz.removeClass('active');
                        }, 50);
                    });
            }

            // Library panels
            if ($library_panel.length) {
                $library_panel.css('transform', 'translate(' + ($library_panel.outerWidth()) + 'px, ' + ($library_panel.outerHeight() - 60) + 'px)');

                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        duration: getLibPanelDuration,
                        offset: 100
                    })
                    .on('enter', function() {
                        $library_panel.css({
                            position: 'fixed',
                            display: 'block'
                        });
                    })
                    .on('leave', function() {
                        $library_panel.css({
                            position: 'absolute',
                            display: 'none'
                        });
                    });
            }



            // Audio & Video
            //
            //
            function getPlay(channelID) {
                return function playMedia(index, media) {
                    var config = $(media).attr('data-config') ? $(media).attr('data-config') : null;
                    p.media.ctrl.playMediaOnChannel(media, channelID, config);
                };
            }

            function getStop(channelID) {
                return function stopMedia(index, media) {
                    var config = $(media).attr('data-config') ? $(media).attr('data-config') : null;
                    p.media.ctrl.stopMediaOnChannel(media, channelID, config);
                };
            }

            if ($panelVideo.length || $panelAudio.length || $fxAudio.length) {

                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        duration: getMediaDuration
                    })
                    .on('enter', function() {
                        $panelVideo.each(getPlay('video'));
                        $panelAudio.each(getPlay('panel'));
                        $fxAudio.each(getPlay('fx'));
                    })
                    .on('leave', function() {
                        $panelVideo.each(getStop('video'));
                        $panelAudio.each(getStop('panel'));
                        p.media.ctrl.stopFxChannel();
                    });
            }



            //Sliding panels
            //
            if ($slidingPanels.length) {
                var slideStart = $this.find('.sliding-panels').data('sliding-offset'),
                    offset = slideStart ? slideStart : 0;


                $slidingPanels.css({
                    'opacity': 0
                });

                var translations = [-100, 100],
                    defaultFxAudioSrc = 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-paper-slide.mp3';


                $slidingPanels.each(function(index) {
                    var $this = $(this);

                    $this.css('transform', 'translate(' + translations[((index + offset) % 2)] + 'px,0)');

                    var tween = TweenMax.to($this, 1, {
                            x: 0,
                            opacity: 1
                        }),
                        fxAudioSrc = $this.data('fx') || defaultFxAudioSrc,
                        fxAudio = new Audio(fxAudioSrc);

                    scenes[idx++] = new Ss({
                            triggerElement: $this,
                            duration: 200,
                            offset: offset
                        })
                        .on('enter', function(e) {
                            if (e.scrollDirection === 'FORWARD') {
                                console.log('playing:', fxAudioSrc);
                                if (fxAudio) p.media.ctrl.playMediaOnFxChannel(fxAudio);
                            } else if (e.scrollDirection == 'REVERSE') {
                                if (fxAudio) p.media.ctrl.playMediaOnFxChannel(fxAudio);
                            }
                        })
                        .on('leave', function(e) {
                            // if (e.scrollDirection == 'REVERSE') {
                            //     console.log('ss', idx, 'leave');
                            //     if (fxAudio) p.media.ctrl.playMediaOnFxChannel(fxAudio);
                            // }
                        })
                        .setTween(tween);
                });

            }

            // Panel specific scene code if it has any
            var handlerClass = p.utils.toTitleCase(panelID),
                animationClass = p.utils.toCamelCase(panelID),
                animation = animations[animationClass],
                panelMethod = p.scrollScenes[handlerClass],
                panelScene, fn;

            // Check the handler exists, then load
            if (typeof panelMethod !== 'undefined') {
                panelScene = panelMethod('#' + panelID, animation);
                if (panelScene) {
                    controller.addScene(panelScene);
                }

            }
        });

        controller.addScene(scenes);

        return controller;
    }

    function onPathwaysLoad() {

        if (animations.magnetisedTrees) {
            p.initAnimation('magnetisedTrees');
        }


        function initScript(d, s, id, a) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.async = 1;
            js.src = a;
            fjs.parentNode.insertBefore(js, fjs);
        }

        w.___gcfg = {
            parsetags: 'onload'
        };

        initScript(document, 'script', 'facebook-jssdk', "//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=1494497634145827&version=v2.0");
        initScript(document, 'script', 'pth-ga-api', "//apis.google.com/js/platform.js");
        initScript(document, 'script', 'pth-pin-api', "//assets.pinterest.com/js/pinit.js");
        initScript(document, 'script', 'pth-twt-api', "//platform.twitter.com/widgets.js");
    }

    p.init(onPathwaysLoad, onScrollLoad, onScrollUnload);

}(window, jQuery, Pathways, ScrollMagic, ScrollScene, Modernizr, TweenMax));

// Init global ga tracking
(function(ga, $) {

    ga.init('[data-ga]');

}(Pathways.components.core.ga, jQuery));
