// Init parallax ScrollScenes
(function(w, $, p, scrollCtrl, Sc, Tm, Mod) {

    "use strict";

    scrollCtrl.addScrollContentFactory(function() {

        var $start = $('.start'),
            $parallaxContent,
            scenes = [];

        function processParallaxes(index, parallax) {
            var $parallax = $(parallax),
                rawconfig = $parallax.data('parallax-effect'),
                fallRate = 0.3,
                fadeRate = 0.5,
                config;

            if (rawconfig) {
                config = JSON.parse(rawconfig);
                fallRate = isNaN(config.fallRate) ? fallRate : config.fallRate;
                fadeRate = isNaN(config.fadeRate) ? fadeRate : config.fadeRate;
            }

            var tween = Tm.to($parallax, 1, {
                opacity: 0,
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
                $parallaxContent = $start.find('[data-parallax-effect]');
                $parallaxContent.each(processParallaxes);
                return scenes;
            }
        };
    });

}(window, jQuery, Pathways, Pathways.scrollSceneCtrl, ScrollScene, TweenMax, Modernizr));
