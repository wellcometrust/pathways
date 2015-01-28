Pathways.scrollSceneCtrl.addSinglePanelScrollFactory('india', function() {
    var $panel,
        $boats,
        ratio = 1050 / 1900,
        boat_ratio = 322 / 1900,
        boat_height = (boat_ratio * window.innerWidth);

    function setBoatStyle(e) {
        boat_height = (boat_ratio * window.innerWidth);
        if ($boats.length) {
            $boats.css({
                bottom: 0,
                height: boat_height
            });
        }
    }

    return {
        load: function(panelId, panelEl, panelAttrs) {
            $panel = $(panelEl);
            $boats = $panel.find('.boats');
            setBoatStyle();
            $(window).on('resize', setBoatStyle);
        },
        getScenes: function(panelId, panelEl, panelAttrs) {
            var $panel = $(panelEl),
                $boats = $boats || $panel.find('.boats');

            var scene1 = new ScrollScene({
                    triggerElement: $panel,
                    triggerHook: 'top',
                    duration: function() {
                        return $panel.outerHeight();
                    }
                })
                .on('enter', function() {
                    $panel.addClass('current-scroll-panel');
                }).on('leave', function() {
                    $panel.removeClass('current-scroll-panel');
                });

            return scene1;
        },
        unload: function() {
            $(window).off('resize', setBoatStyle);
            $boats.removeAttr('style');
        }
    };
});
