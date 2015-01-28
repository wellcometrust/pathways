/**
 * Controls Info panel transitions
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    scrollCtrl.addGlobalPanelScrollFactory(function() {
        var heightOffset = 60,
            visibleOffset = 100;

        return {
            load: function(panelId, panelEl, panelAttrs) {
                var $component = $('[data-panel="' + panelAttrs.id + '"]').first(),
                    offsetHeight = $component.outerHeight() - heightOffset,
                    offsetWidth = $component.outerWidth(),
                    val = 'translate(' + offsetWidth + 'px, ' + offsetHeight + 'px)';

                if ($component.length) {
                    $component.css({
                        'transform': val
                    });
                }
            },
            getScenes: function(panelId, panelEl, panelAttrs) {
                var $component = $('[data-panel="' + panelAttrs.id + '"]').first(),
                    scene = [];

                if ($component.length) {
                    scene = new Ss({
                        triggerElement: panelEl,
                        triggerHook: 'top',
                        duration: scrollDurations.getComponentDuration(visibleOffset),
                        offset: visibleOffset
                    }).on('enter', function(e) {
                        $component.addClass('info-panel-ready');
                    }).on('leave', function(e) {
                        $component.removeClass('info-panel-ready');
                    });
                }

                return scene;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                var $component = $('[data-panel="' + panelAttrs.id + '"]').first();
                if ($component.length) $component.removeAttr('style');
            }
        };
    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));
