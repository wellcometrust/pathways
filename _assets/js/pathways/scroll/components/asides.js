 /**
  * Controls Gallery, Letter-gallery and Quiz transitions
  */

 (function(w, scrollCtrl, scrollDurations, mediaCtrl, $, Tm, Ss) {

     'use strict';


     var sidebarComponents = ['gallery', 'letter-gallery', 'quiz'];

     function getConfig(rawConfig) {
         var config = null;
         if (rawConfig) config = JSON.parse(rawConfig);
         return config;
     }

     function getValueFromConfig(rawConfig, name) {
         var config = getConfig(rawConfig);
         return (config && config[name]) || null;
     }

     function findComponent($panel, type) {
         return $panel.find('[data-component="' + type + '"]');
     }

     function getComponentScene($panel, type, getDuration) {
         var $elem = $panel.find('[data-component="' + type + '"]'),
             scene = [];

         if ($elem.length) {
             var offset = getValueFromConfig($elem.attr('data-config'), 'offset_height') || 0;

             scene = new Ss({
                 triggerElement: $panel,
                 triggerHook: 'top',
                 duration: getDuration(offset),
                 offset: offset
             }).on('enter', function(e) {
                 $elem.css({
                     position: 'fixed',
                     display: 'block'
                 });
                 setTimeout(function() {
                     $elem.addClass('active');
                 }, 50);
             }).on('leave', function(e) {
                 $elem.css({
                     position: 'absolute',
                     display: 'none'
                 });
                 setTimeout(function() {
                     $elem.removeClass('active');
                 }, 50);
             });
         }

         return scene;
     }

     function getComponentObjectFactory(componentId) {
         return {
             load: function(panelId, panelEl, panelAttrs) {
                 var $component = findComponent($(panelEl), componentId);
                 if ($component.length) $component.hide();
             },
             getScenes: function(panelId, panelEl, panelAttrs) {
                 return getComponentScene($(panelEl), componentId, scrollDurations.getComponentDuration);
             },
             unload: function(panelId, panelEl, panelAttrs) {
                 var $component = findComponent($(panelEl), componentId);
                 if ($component.length) $component.removeAttr('style');
             }
         };
     }

     sidebarComponents.forEach(function(componentId) {
         scrollCtrl.addGlobalPanelScrollFactory(function() {
             return getComponentObjectFactory(componentId);
         });
     });


 }(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, jQuery, TweenMax, ScrollScene));
