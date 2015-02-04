/**
 * Controls panel transitions
 */
(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    var rootEl = 'html',
        bottomSel = '.survey, .fork',
        scrollActiveClass = 'scroll-active',
        scrollInactiveClass = 'scroll-inactive',
        fixedActiveClass = 'fixed-active';

    scrollCtrl.addGlobalPanelScrollFactory(function() {

        return {
            load: function(panelId, panelEl, panelAttrs) {
                $(rootEl).removeClass(scrollInactiveClass).addClass(scrollActiveClass);
            },
            getScenes: function(panelId, panelEl, panelAttrs) {

                if (panelAttrs.isStart) return null;

                var scenes = [],
                    $panel = $(panelEl),
                    $bg = $(panelAttrs.bg),
                    triggerHook = panelAttrs.isFirst ? 'top' : 'middle',
                    $bottom = $(bottomSel).first(),
                    tween = Tm.to($bg, 1, {
                        opacity: 1
                    });

                if (!panelAttrs.isFirst) {

                    scenes.push(new Ss({
                            triggerElement: $panel,
                            triggerHook: triggerHook,
                            duration: scrollDurations.getOpacityTranstionDuration
                        })
                        .on('start', function(e) {
                            if (e.scrollDirection == 'FORWARD') {
                                $panel.addClass(fixedActiveClass);
                            } else {
                                setTimeout(function() {
                                    $panel.removeClass(fixedActiveClass);
                                }, 50);
                            }
                        }).setTween(tween));

                } else {
                    scenes.push(new Ss({
                            triggerElement: $panel,
                            triggerHook: triggerHook,
                            duration: scrollDurations.getOpacityTranstionDuration
                        })
                        .on('start', function(e) {
                            if (e.scrollDirection == 'FORWARD') {
                                $panel.addClass(fixedActiveClass);
                            } else {
                                setTimeout(function() {
                                    $panel.removeClass(fixedActiveClass);
                                }, 50);
                            }
                        }));
                }

                return scenes;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                $(panelEl).removeClass(fixedActiveClass);
                $(rootEl).addClass(scrollInactiveClass).removeClass(scrollActiveClass);
            }
        };
    });

    Pathways.scrollSceneCtrl.addScrollContentFactory(function() {
        var $panels = $('.panel'),
            $bottom = $(bottomSel).first();

        if ($bottom.length === 0) return null;

        return {
            load: function() {
                $panels.removeClass(fixedActiveClass);
            },
            getScenes: function() {
                var scenes = [];

                scenes.push(new Ss({
                    triggerElement: $bottom,
                    triggerHook: 'bottom'
                }).on('start', function(e) {
                    if (e.scrollDirection == 'FORWARD') {
                        $panels.removeClass(fixedActiveClass);
                    } else {
                        $panels.addClass(fixedActiveClass);
                    }
                }));

                return scenes;
            },
            unload: function() {
                $panels.removeClass(fixedActiveClass);
            }
        };
    });


}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));
