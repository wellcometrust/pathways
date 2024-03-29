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
                    scene,
                    tween = Tm.to($bg, 1, {
                        opacity: 1
                    });


                scene = new Ss({
                        triggerElement: $panel,
                        triggerHook: triggerHook,
                        duration: scrollDurations.getOpacityTransitionDuration
                    })
                    .on('start', function(e) {
                        if (e.scrollDirection == 'FORWARD') {
                            $panel.addClass(fixedActiveClass);
                        } else {
                            $panel.removeClass(fixedActiveClass);
                            // setTimeout(function() {
                            //     $panel.removeClass(fixedActiveClass);
                            // }, 50);
                        }
                    });

                if (!panelAttrs.isFirst) {
                    scene.setTween(tween);
                }

                scenes.push(scene);
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
