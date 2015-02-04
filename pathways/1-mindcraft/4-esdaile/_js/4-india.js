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
        unload: function() {
            $(window).off('resize', setBoatStyle);
            $boats.removeAttr('style');
        }
    };
});
