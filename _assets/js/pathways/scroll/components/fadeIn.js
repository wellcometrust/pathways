Pathways.scrollSceneCtrl.addScrollContentFactory(function() {
    var scrollFadeSelector = '[data-scroll-fadeIn]';

    if ($(scrollFadeSelector).length === 0) return null;

    return {
        load: function() {
            $(scrollFadeSelector).css('opacity', 0);
        },
        getScenes: function() {
            var scenes = [];
            $(scrollFadeSelector).each(function() {
                var $this = $(this),
                    tween = TweenMax.to($this, 1, {
                        opacity: 1
                    }),
                    offset = $this.data('offset') ? $this.data('offset') : 0;

                var scene = new ScrollScene({
                        triggerElement: $this,
                        duration: 200,
                        offset: offset
                    })
                    .setTween(tween);

                scenes.push(scene);
            });

            return scenes;
        },
        unload: function() {
            $(scrollFadeSelector).removeAttr('style');
        }
    };
});
