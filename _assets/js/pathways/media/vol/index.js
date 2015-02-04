(function(exports, view, cookies, utils, $) {

    var model = {
            isMuted: false,
            currentVol: 1
        },
        viewCtrl = view.getViewCtrl(model);

    exports.vol = Object.create(viewCtrl, {

        setStateFromCookies: {
            value: function setStateFromCookies() {
                this.mute(cookies.getCookieOrDefaultValBool('mute'));
            }
        },
        mute: {
            value: function mute(doMute) {
                if (doMute === model.isMuted) return;
                model.isMuted = doMute;
                this.update(doMute);
            }
        },
        update: {
            value: function update(doMute) {
                viewCtrl.update(doMute);
                cookies.setCookieFromBool('mute', doMute);
            }
        },
        enable: {
            value: function enable() {
                viewCtrl.enable();
                viewCtrl.update(model.isMuted);
            }
        },
        isMuted: {
            value: function isMuted() {
                return model.isMuted;
            }
        }
    });

}(Pathways.media, Pathways.core.view, Pathways.cookieManager, Pathways.utils, jQuery));
