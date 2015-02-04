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
            $(this.globalMediaSelector).each(function(i, item) {
                if (item.readyState !== 0) item.pause();
            });
        },
        update: function(isMuted) {
            if (!this.isEnabled) return;
            $(this.globalMediaSelector).each(function(i) {
                this.muted = isMuted;
            });
        },
        disable: function() {
            this.isEnabled = false;
            $(this.globalMediaSelector).each(function(i, item) {
                if (item.readyState !== 0) item.pause();
            });
        }
    };

    exports.getGlobalView = function(globalMediaSelector) {
        return new GlobalMuteView(globalMediaSelector);
    };

}(Pathways.media.vol.views, Pathways.media.vol, jQuery));
