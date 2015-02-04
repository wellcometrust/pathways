/**
 * Black-strip positioning
 */

(function(w, p, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    scrollCtrl.addGlobalPanelScrollFactory(function() {
        var selector = '.black-strip',
            $blackStrips = $(selector),
            currY = p.viewportHeight;

        if ($blackStrips.length === 0) return null; //Check for any strips on page; if none, don't create this object

        function resizeBlackStrips(e) {
            currY = (currY === 0) ? 0 : p.viewportHeight;
            $blackStrips.css({
                position: 'fixed',
                'transform': 'translate(0,' + currY + 'px)',
                height: p.viewportHeight
            });
        }

        return {
            load: function() {
                resizeBlackStrips();
                w.addEventListener('resize', resizeBlackStrips);
            },
            getScenes: function(panelId, panelEl, panel) {
                var scenes = [],
                    $strip = $(panelEl).find(selector),
                    inTw = function(e) {
                        Tm.to($strip, 0.5, {
                            y: 0,
                            onComplete: function() {
                                currY = 0;
                            }
                        });
                    },
                    outTw = function(e) {
                        Tm.to($strip, 0.1, {
                            y: p.viewportHeight,
                            onComplete: function() {
                                currY = p.viewportHeight;
                            }
                        });
                    };

                if ($strip.length === 0 || !panel.content) return; // Check for strips in panel; if none, don't return the scene

                scenes.push(new ScrollScene({
                        triggerElement: panel.content,
                        triggerHook: 'bottom',
                        duration: panel.contentHeight
                    })
                    .on('enter', inTw)
                    .on('leave', outTw));

                return scenes;
            },
            unload: function() {
                $blackStrips.removeAttr('style');
                w.removeEventListener('resize', resizeBlackStrips);
            }
        };
    });



}(window, Pathways, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));
