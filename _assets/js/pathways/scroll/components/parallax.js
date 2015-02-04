// Init parallax ScrollScenes
(function(w, $, p, scrollCtrl, Ss, Tm, Mod) {

    "use strict";

    scrollCtrl.addScrollContentFactory(function() {

        var parallaxSelectors = '[data-scroll-parallax-effect]',
            $start = $('.start'), //TODO: enable parent trigger selection
            $parallaxContent,
            scenes = [];

        function processParallaxes(index, parallax) {
            var $parallax = $(parallax),
                rawconfig = $parallax.find(parallaxSelectors).get(0),
                fallRate = 0.3,
                endOpacity = 0,
                config,
                tween,
                scene;

            if (rawconfig) {
                config = JSON.parse(rawconfig);
                fallRate = isNaN(config.fallRate) ? fallRate : config.fallRate;
                endOpacity = isNaN(config.endOpacity) ? endOpacity : config.endOpacity;
            }

            tween = Tm.to($parallax, 1, {
                opacity: endOpacity,
                y: p.viewportHeight * fallRate
            });

            scene = new Ss({
                    triggerElement: $start,
                    duration: p.viewportHeight,
                    triggerHook: 'top'
                })
                .on('enter', function(e) {
                    $parallax.css({
                        'visibility':'visible'
                    });
                })
                .on('leave', function(e) {
                    if (e.scrollDirection === 'FORWARD')
                        $parallax.css({
                            'visibility':'hidden'
                        });
                })
                .setTween(tween);

            scenes.push(scene);
        }

        return {
            getScenes: function() {
                scenes = [];
                $parallaxContent = $start.find(parallaxSelectors);
                $parallaxContent.each(processParallaxes);
                return scenes;
            },
            unload: function() {
                $parallaxContent = $start.find(parallaxSelectors);
                $parallaxContent.each(function(index, parallax) {
                    $(parallax).removeAttr('style');
                });
            }
        };
    });

}(window, jQuery, Pathways, Pathways.scrollSceneCtrl, ScrollScene, TweenMax, Modernizr));
