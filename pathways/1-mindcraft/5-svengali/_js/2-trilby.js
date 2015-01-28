Pathways.scrollSceneCtrl.addSinglePanelScrollFactory('trilby', {
    load: function(panelId, panelEl, panelAttrs) {
        $(panelEl).find('.comic-panel').css('opacity', 0);
    },
    getScenes: function(panelId, panelEl, panelAttrs) {
        var scenes = [];
        $(panelEl).find('.comic-panel').each(function() {
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
    unload: function(panelId, panelEl, panelAttrs) {
        $(panelEl).find('.comic-panel').removeAttr('style');
    }
});
