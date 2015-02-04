/**
 * Controls panel media auto play and stop
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    function getConfig(rawConfig) {
        var config = null;
        if (rawConfig) config = JSON.parse(rawConfig);
        return config;
    }

    function getPlay(channelID) {
        return function playMedia(index, media) {
            var config = getConfig($(media).attr('data-config'));
            mediaCtrl.playMediaOnChannel(media, channelID, config);
        };
    }

    function getStop(channelID) {
        return function stopMedia(index, media) {
            var config = getConfig($(media).attr('data-config'));
            mediaCtrl.stopMediaOnChannel(media, channelID, config);
        };
    }

    scrollCtrl.addGlobalPanelScrollFactory(function() {

        return {
            load: function(panelId, panelEl, panel) {

            },
            getScenes: function(panelId, panelEl, panel) {
                var $panel = $(panelId),
                    $panelAudio = $panel.find('[data-audio="panel"]'),
                    $panelVideo = $panel.find('[data-video="panel"]'),
                    $fxAudio = $panel.find('[data-audio="fx"]'),
                    scene = [];

                if ($panelVideo.length || $panelAudio.length || $fxAudio.length) {

                    scene = new Ss({
                            triggerElement: panelEl,
                            duration: panel.getMediaDuration
                        })
                        .on('enter', function() {
                            $panelVideo.each(getPlay('video'));
                            $panelAudio.each(getPlay('panel'));
                            $fxAudio.each(getPlay('fx'));
                        })
                        .on('leave', function() {
                            $panelVideo.each(getStop('video'));
                            $panelAudio.each(getStop('panel'));
                            mediaCtrl.stopFxChannel({
                                noFade: true
                            });
                        });
                }
                return scene;
            },
            unload: function(panelId, panelEl, panel) {

            }
        };
    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));
