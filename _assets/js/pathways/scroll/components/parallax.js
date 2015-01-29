// Init parallax ScrollScenes
(function(w, $, p, scrollCtrl, Sc, Tm, Mod) {

    "use strict";

    scrollCtrl.addScrollContentFactory(function() {

        var parallaxSelectors = '[data-scroll-parallax-effect]',
            $start = $('.start'),
            $parallaxContent,
            scenes = [];

        function processParallaxes(index, parallax) {
            var $parallax = $(parallax),
                rawconfig = $parallax.find(parallaxSelectors).get(0),
                fallRate = 0.3,
                endOpacity = 0,
                config;

            if (rawconfig) {
                config = JSON.parse(rawconfig);
                fallRate = isNaN(config.fallRate) ? fallRate : config.fallRate;
                endOpacity = isNaN(config.endOpacity) ? endOpacity : config.endOpacity;
            }

            var tween = Tm.to($parallax, 1, {
                opacity: endOpacity,
                y: p.panelHeight * fallRate
            });

            var scene = new Sc({
                    triggerElement: $start,
                    duration: p.panelHeight,
                    triggerHook: 'top'
                })
                .on('enter', function(e) {
                    $parallax.css({
                        'display': 'block'
                    });
                })
                .on('leave', function(e) {
                    if (e.scrollDirection === 'FORWARD')
                        $parallax.css({
                            'display': 'none'
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
            }
        };
    });

}(window, jQuery, Pathways, Pathways.scrollSceneCtrl, ScrollScene, TweenMax, Modernizr));
