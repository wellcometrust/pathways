/**
 * Controls panel transitions
 */
(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    scrollCtrl.addGlobalPanelScrollFactory(function() {
        return {
            load: function(panelId, panelEl, panelAttrs) {
                $('html').addClass('scroll-active');
            },
            getScenes: function(panelId, panelEl, panelAttrs) {

                var scenes = [],
                    $panel = $(panelEl),
                    $bg = $(panelAttrs.bg),
                    triggerHook = panelAttrs.isFirst ? 'top' : 'middle',
                    $survey = $('.survey'),
                    $bottom = $survey.length ? $survey : $('.fork'),
                    tween = Tm.to($bg, 1, {
                        opacity: 1
                    });

                scenes.push(new Ss({
                        triggerElement: $panel,
                        triggerHook: triggerHook,
                        duration: scrollDurations.getScreenDuration,
                    })
                    .on('start', function(e) {
                        if (e.scrollDirection == 'FORWARD') {
                            $panel.addClass('fixed-active');
                        } else {
                            setTimeout(function() {
                                $panel.removeClass('fixed-active');
                            }, 50);
                        }
                    }));

                if (!panelAttrs.isFirst) {
                    // Panels Opacity transition
                    scenes.push(new Ss({
                            triggerElement: $panel,
                            triggerHook: triggerHook,
                            duration: scrollDurations.getOpacityTranstionDuration
                        })
                        .setTween(tween));
                }

                if ($bottom.length) {
                    scenes.push(new Ss({
                        triggerElement: $bottom,
                        triggerHook: 'bottom'
                    }).on('start', function(e) {
                        // console.log('bottom');
                        if (e.scrollDirection == 'FORWARD') {
                            $panel.removeClass('fixed-active');

                        } else {
                            $panel.addClass('fixed-active');
                            // setTimeout(function() {
                            //     $panel.addClass('fixed-active');
                            // }, 50);
                        }

                    }));
                }


                return scenes;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                console.log('unloading ');
                var $bg = $(panelAttrs.bg);
                $bg.removeAttr('style');

                $('html').removeClass('scroll-active');
            }
        };

    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));
