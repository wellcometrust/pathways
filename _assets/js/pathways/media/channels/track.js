console.log('include media/channels/track');

(function(exports) {

    function Track(src, config) {
        var self = this;
        self.src = src;
        self.config = config;
    }

    exports.track = {
        Track: Track,
        getTrack: function(src, config) {
            return new Track(src, config);
        }
    };

}(Pathways.media.channels));
