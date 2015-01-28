/**
 * Black-strip positioning
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';


    scrollCtrl.addGlobalPanelScrollFactory(function() {
        var $blackStrips = $('.black-strip'),
        currY = Pathways.panelHeight;

        if ($blackStrips.length === 0) return; //Check for any strips on page; if none, don't create this object

        function resizeBlackStrips(e) {
            currY = (currY === 0) ? 0 : Pathways.panelHeight;
            $blackStrips.css({
                position: 'fixed',
                'transform': 'translate(0,' + currY + 'px)',
                height: Pathways.panelHeight
            });
        }

        return {
            load: function() {
                resizeBlackStrips();
                w.addEventListener('resize', resizeBlackStrips);
            },
            getScenes: function(panelId, panelEl, panel) {
                var scenes = [],
                    $strip = $(panelEl).find('.black-strip'),
                    inTw = function(e) {
                        Tm.to($strip, 0.5, {
                            y: 0,
                            onComplete: function(){
                                currY = 0;
                            }
                        });
                    },
                    outTw = function(e) {
                        Tm.to($strip, 0.2, {
                            y: Pathways.panelHeight,
                            onComplete: function(){
                                currY = Pathways.panelHeight;
                            }
                        });
                    };

                if ($strip.length === 0 || !panel.content) return; // Check for strips in panel; if none, don't return the scene

                scenes.push(new ScrollScene({
                        triggerElement: panel.content,
                        triggerHook: 'bottom',
                        duration: panel.content.offsetHeight + Pathways.panelHeight
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



}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));