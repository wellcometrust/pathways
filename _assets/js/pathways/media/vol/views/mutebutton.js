console.log('include media/vol/views/mutebtn');
/***
 *   Audio: vol view
 */
(function(exports, vol, $) {

    function getDomElement(muteSelector) {
        var $btn = $(muteSelector);
        removeClickHandlers($btn);
        return $btn;
    }

    function addClickHandler($btn, vol) {
        $btn.on('click', function(e) {
            // active == muted
            if ($(this).hasClass('active')) {
                vol.mute(false);
            } else {
                vol.mute(true);
            }

            e.preventDefault();
            return false;
        });
    }

    function removeClickHandlers($btn) {
        $btn.off('click');
    }

    function MuteButtonView(muteSelector) {
        this.isEnabled = false;
        this.$btn = getDomElement(muteSelector);
    }

    MuteButtonView.prototype = {
        enable: function() {
            this.isEnabled = true;
            addClickHandler(this.$btn, vol);
            this.$btn.show();
        },
        disable: function() {
            this.isEnabled = false;
            removeClickHandlers(this.$btn);
            this.$btn.hide();
        },
        update: function(isMuted) {
            if (!this.isEnabled) return;
            if (isMuted) {
                this.$btn.addClass('active');
            } else {
                this.$btn.removeClass('active');
            }
        }
    };

    exports.MuteButtonView = MuteButtonView;
    exports.getMuteButtonView = function (muteSelector) {
        return new MuteButtonView(muteSelector);
    };

}(Pathways.media.vol.views, Pathways.media.vol, jQuery));
