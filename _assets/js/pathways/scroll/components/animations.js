/**
 * Controls Library panel transitions
 */

// Init Animations
(Pathways.animation = function(w, doc, cjs, $, Mod) {
    "use strict";

    var anim = {};

    return {
        init: function(id, canvas) {

            if (!canvas) return;
            if (!anim[id]) return console.warn('No animation properties with id \'' + id + '\' found');

            function initCanvas() {
                var lib = anim[id].lib;

                var loader = new cjs.LoadQueue(false);
                loader.addEventListener("fileload", handleFileLoad);
                loader.addEventListener("complete", handleComplete);
                loader.loadManifest(lib.properties.manifest);
                anim[id].start = function() {};
                anim[id].stop = function() {};

            }

            function handleFileLoad(evt) {
                var images = anim[id].images;
                if (evt.item.type == "image") {
                    images[evt.item.id] = evt.result;
                }
            }

            function handleComplete() {
                var lib = anim[id].lib,
                    exportRoot = new lib.tree2(),
                    stage = new cjs.Stage(canvas);

                anim[id].stage = stage;

                stage.addChild(exportRoot);
                stage.update();

                cjs.Ticker.setFPS(lib.properties.fps);

                anim[id].start = function() {
                    cjs.Ticker.addEventListener("tick", stage);
                };
                anim[id].stop = function() {
                    cjs.Ticker.removeEventListener("tick", stage);
                };
            }

            if (w.innerWidth >= 768) {
                initCanvas();
            }

            return anim[id];
        },
        getAnimation: function(id) {
            if (anim && anim[id]) return anim[id];
            else return null;
        },
        addAnimation: function(id, def) {
            anim[id] = def;
        }
    };

}(window, document, (createjs || {}), jQuery, Modernizr));



(function(w, scrollCtrl, scrollDurations, mediaCtrl, animationCtrl, utils, $, Tm, Ss) {

    'use strict';

    scrollCtrl.addGlobalPanelScrollFactory(function() {

        return {
            load: function(panelId, panelEl, panelAttrs) {
                var canvas = $(panelEl).find('.panel-animation').get(0), //TODO: Allow for mulitple animations
                    animationId = utils.toCamelCase(panelAttrs.id);
                if (canvas)
                    animationCtrl.init(animationId, canvas);
            },
            getScenes: function(panelId, panelEl, panelAttrs) {
                var animationId = utils.toCamelCase(panelAttrs.id),
                    animation = animationCtrl.getAnimation(animationId);

                if (!animation) return null;

                var scene = new ScrollScene({
                        triggerElement: panelId,
                        duration: Pathways.panelHeight
                    })
                    .on('enter', function(e) {
                        // if (e.scrollDirection == 'FORWARD') {
                        console.log(panelId, animation);
                        animation.start();
                        // }
                    })
                    .on('leave', function(e) {
                        // if (e.scrollDirection == 'REVERSE') {
                        animation.stop();
                        // }
                    });

                return scene;
            },
            unload: function(panelId, panelEl, panelAttrs) {
                var animationId = utils.toCamelCase(panelAttrs.id),
                    animation = animationCtrl.getAnimation(animationId);
                if (animation) animation.stop();
            }
        };
    });

}(window, Pathways.scrollSceneCtrl, Pathways.scrollSceneDurations, Pathways.media.ctrl, Pathways.animation, Pathways.utils, jQuery, TweenMax, ScrollScene));
