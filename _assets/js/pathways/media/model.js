console.log('include media/model');
(function(exports, $) {

    var globalAudio,
        panelTracks,
        isMuted = false;


    function initPanelAudio(panels, selector) {

        var tracks = [];

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem;
            var _track = _panel.querySelector(selector);
            if (_track) {
                tracks.push(tracks);
            }
        }

        return tracks;
    }

    function initGlobalAudio(selector) {
        var audio = $(selector).get(0);
        return audio;
    }

    function init(panels) {
        globalAudio = initGlobalAudio('[data-audio="global"]');
        panelTracks = initPanelAudio(panels, '[data-audio="panel"]');
    }

    exports.model = {
        init: init,
        getIsMuted: function() {
            return isMuted;
        },
        setMuted: function(value) {
            isMuted = value;
        },
        globalAudio: function() {
            return globalAudio;
        },
        panelTracks: function() {
            return panelTracks;
        }
    };

}(Pathways.media, jQuery));
