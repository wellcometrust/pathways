/***
    Video
*/
(function(exports, p, sys, vol, $) {

    var panelVideos,
        panels,
        selector = 'video',
        noop = function() {},
        currentLoad = noop,
        currentUnload = noop,
        MIN_LEVEL = 0;

    function volumeChangeHandler(e) {
        if (this.muted == vol.isMuted()) return;
        vol.mute(this.muted);
    }

    function errorHandler(e) {
        console.warn('Video loading error for ', (this.src || this.currentSrc));
    }

    function initPanelVideo(panels, videoSelector, level) {
        var videos = [];

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem;
            var _video = _panel.querySelector(videoSelector);

            if (_video) {

                _video.addEventListener('volumechange', volumeChangeHandler);
                _video.addEventListener('error', errorHandler);

                if (level >= p.MIN_SCROLL_LEVEL) {
                    _video.setAttribute('preload', 'auto');
                } else {
                    _video.setAttribute('preload', 'metadata');
                    _video.controls = true;
                }

                videos.push(_video);
            }

        }

        return videos;

    }

    function updateState(level) {

        if (level >= MIN_LEVEL) {
            currentLoad(level);
        } else {
            currentUnload(level);
        }
    }

    function hideCaptions(videos) {
        var video;
        for (var i = 0, l = videos.length; i < l; i++) {
            video = videos[i];
            if (video) {
                var tracks = video.textTracks;
                if (tracks && tracks.length) {
                    for (var j = 0, m = tracks.length; j < m; j++) {
                        var track = tracks[j];
                        if (track) track.mode = 'hidden';
                    }
                }
            }
        }
    }

    function init(_panels) {
        panels = _panels;
        currentLoad = load;
    }

    function load(level) {
        panelVideos = initPanelVideo(panels, selector, level);
        hideCaptions(panelVideos);
        currentLoad = noop;
    }

    exports.video = {
        init: init,
        updateState: updateState
    };

}(Pathways, Pathways, Pathways.system, Pathways.media.vol, jQuery));
