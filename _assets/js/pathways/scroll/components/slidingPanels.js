/**
 * Sliding panels controls
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';


    scrollCtrl.addGlobalPanelScrollFactory(function() {
        var heightOffset = 60;
        var translations = [-100, 100],
            defaultFxAudioSrc = 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio/01-fx-paper-slide.mp3',
            $root,
            $components,
            offset = 0;

        return {
            load: function(panelId, panelEl, panelAttrs) {
                $root = $(panelEl).find('.sliding-panels');
                $components = $root.find('.sliding-panel');
                offset = $root.data('sliding-offset') || 0;

                $components.each(function(index) {
                    var val = 'translate(' + translations[((index + offset) % 2)] + 'px,0)';

                    $(this).css({
                        'opacity': 0,
                        'transform': val,
                    });
                });

            },
            getScenes: function(panelId, panelEl, panelAttrs) {
                var idx = 0,
                    scenes = [],
                    // offset = slideStart,
                    tween;

                $components = $components || $(panelEl).find('.sliding-panel');
                $components.each(function(index) {
                    var $this = $(this),
                        fxAudioSrc = $this.data('fx') || defaultFxAudioSrc,
                        fxAudio = new Audio(fxAudioSrc),
                        translateVal = translations[((index + offset) % 2)],
                        val = 'translate(' + translations[((index + offset) % 2)] + 'px,0)';

                    // $this.css('transform', val);
                    // $this.css('-webkit-transform', val);

                    tween = Tm.to($this, 1, {
                        x: 0,
                        opacity: 1
                    });

                    scenes[idx++] = new Ss({
                            triggerElement: $this,
                            duration: 200,
                            offset: offset
                        })
                        .on('enter', function(e) {
                            if (e.scrollDirection === 'FORWARD') {
                                // console.log('playing:', fxAudioSrc);
                                if (fxAudio) mediaCtrl.playMediaOnFxChannel(fxAudio);
                            } else if (e.scrollDirection == 'REVERSE') {
                                if (fxAudio) mediaCtrl.playMediaOnFxChannel(fxAudio);
                            }
                        })
                        .on('leave', function(e) {
                            //if (fxAudio) mediaCtrl.stopMediaOnFxChannel(fxAudio);
                        })
                        .setTween(tween);
                });


                return scenes;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                var $components = $components || $(panelEl).find('.sliding-panel');
                if ($components.length) $components.removeAttr('style');
            }
        };
    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));
