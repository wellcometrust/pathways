console.log('include media/vol/views/global');
/***
 *   Audio: global vol view
 */
(function(exports, vol, $) {

    function GlobalMuteView(globalMediaSelector) {
        this.globalMediaSelector = globalMediaSelector;
        this.isEnabled = false;
    }

    GlobalMuteView.prototype = {
        enable: function() {
            this.isEnabled = true;
            $(this.globalMediaSelector).each(function(e) {
                this.pause();
            });
        },
        update: function(isMuted) {
            if (!this.isEnabled) return;
            $(this.globalMediaSelector).each(function(e) {
                this.muted = isMuted;
            });
        },
        disable: function() {
            this.isEnabled = false;
            $(this.globalMediaSelector).each(function(e) {
                this.pause();
            });
        }
    };

    exports.getGlobalView = function(globalMediaSelector) {
        return new GlobalMuteView(globalMediaSelector);
    };

}(Pathways.media.vol.views, Pathways.media.vol, jQuery));
