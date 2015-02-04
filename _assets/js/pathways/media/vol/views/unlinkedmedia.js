/***
 *   Audio: vol view
 */
(function(exports, vol, utils, $) {

    function LinkedMediaView(media) {
        this.media = media;
    }
    LinkedMediaView.prototype = {
        update: function(isMuted) {
            this.media.muted = isMuted;
        }
    };

    exports.LinkedMediaView = LinkedMediaView;
    exports.getLinkedMediaView = function (src) {
        return new LinkedMediaView(src);
    };

}(Pathways.media.vol.views, Pathways.media.vol, Pathways.utils, jQuery));
