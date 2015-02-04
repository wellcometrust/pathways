/**
 * Controls Info panel transitions
 */

(function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

    'use strict';

    scrollCtrl.addGlobalPanelScrollFactory(function() {
        var heightOffset = 60,
            visibleOffset = 0,
            readyClass = 'info-panel-ready';

        return {
            load: function(panelId, panelEl, panel) {
                var $component = $('[data-panel="' + panel.id + '"]').first(),
                    offsetHeight = $component.outerHeight() - heightOffset,
                    offsetWidth = $component.outerWidth(),
                    val = 'translate(' + offsetWidth + 'px, ' + offsetHeight + 'px)';

                if ($component.length) {
                    $component.css({
                        'transform': val
                    });
                }
            },
            getScenes: function(panelId, panelEl, panel) {

                if (panel.isStart) return;

                var $component = $('[data-panel="' + panel.id + '"]').first(),
                    scene = [];

                if ($component.length) {
                    scene = new Ss({
                        triggerElement: panelEl,
                        triggerHook: 'middle',
                        duration: panel.getComponentDuration
                    }).on('enter', function(e) {
                        $component.addClass(readyClass);
                    }).on('leave', function(e) {
                        $component.removeClass(readyClass);
                    });
                }

                return scene;
            },
            unload: function(panelId, panelEl, panel) {
                var $component = $('[data-panel="' + panel.id + '"]').first();
                if ($component.length) $component.removeAttr('style');
            }
        };
    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));
