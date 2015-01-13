console.log('include media/index');

Pathways.media = {};

(function(exports, utils) {

    function MediaAudio(media, config) {
        var self = this;
        self.media = media;
        self.config = config;
    }

    exports.MediaAudio = MediaAudio;
    exports.getMediaAudio = function(media, config) {
        return new MediaAudio(media, config);
    };


}(Pathways.media, Pathways.utils));
