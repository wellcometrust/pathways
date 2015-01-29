/**
 * Controls panel transitions
 */
(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    scrollCtrl.addGlobalPanelScrollFactory(function() {
        return {
            load: function(panelId, panelEl, panelAttrs) {
                $('html').addClass('scroll-active');
                $(panelEl).removeClass('fixed-active');
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
                return scenes;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                $('html').removeClass('scroll-active');
                $(panelEl).removeClass('fixed-active');
            }
        };
    });

    Pathways.scrollSceneCtrl.addScrollContentFactory(function() {
        var $panels = $('.panel'),
            $survey = $('.survey'),
            $bottom = $survey.length ? $survey : $('.fork');

        if ($bottom.length === 0) return null;

        return {
            load: function() {
                $panels.removeClass('fixed-active');
            },
            getScenes: function() {
                var scenes = [];

                scenes.push(new Ss({
                    triggerElement: $bottom,
                    triggerHook: 'bottom'
                }).on('start', function(e) {
                    if (e.scrollDirection == 'FORWARD') {
                        $panels.removeClass('fixed-active');
                    } else {
                        $panels.addClass('fixed-active');
                    }
                }));

                return scenes;
            },
            unload: function() {
                $panels.removeClass('fixed-active');
            }
        };
    });


}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));
