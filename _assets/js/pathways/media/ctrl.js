(function(exports, p, model, vol, channelCtrl, $) {

    var noop = function() {},
        currentLoad = noop,
        currentUnload = noop,
        panels,
        MIN_LEVEL = p.MIN_SCROLL_LEVEL;

    function updateState(level) {
        if (level < MIN_LEVEL) {
            currentUnload(level);
        } else {
            currentLoad(level);
        }
    }

    function load(level) {
        console.log('enabling media');
        vol.enable();
        channelCtrl.playMediaOnGlobalChannel(model.globalAudio());
        currentUnload = unload;
        currentLoad = noop;
    }

    function unload(level) {
        console.log('disabling media');
        vol.disable();
        currentUnload = noop;
        currentLoad = load;
    }

    function firstLoad(level) {
        channelCtrl.init();
        model.init(panels);
        vol.setStateFromCookies();

        vol.addView(vol.views.getMuteButtonView('.mute'));
        vol.addView(vol.views.getGlobalView('video, audio'));

        currentLoad = load;
        updateState(level);
    }

    function init(_panels) {
        panels = _panels;
        currentLoad = firstLoad;
    }

    exports.ctrl = $.extend({}, channelCtrl, {
        init: init,
        enable: load,
        disable: unload,
        updateState: updateState
    });


}(Pathways.media, Pathways, Pathways.media.model, Pathways.media.vol, Pathways.media.channels.ctrl, jQuery));
