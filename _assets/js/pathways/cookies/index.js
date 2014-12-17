/****
 *
 * Cookie manager
 */
console.log('include cookies/index');
(function(exports, cookies) {

    var expiry = Infinity,
        path = '/',
        cookieDefs = {
            mute: {
                id: '_wt_pathways_muted',
                set: 'muteOnLoad',
                unset: 'noMuteOnLoad'
            },
        };

    function getCookieDef(id) {
        if (!cookieDefs[id]) console.warn('Pathways Cookie Manager -- no cookie definition found for \'' + id + '\'');
        return cookieDefs[id];
    }

    function getCookieOrDefaultValActual(id) {
        var cookieDef = getCookieDef(id),
            cookieName = cookieDef.id;

        return cookies.hasItem(cookieName) ? cookies.getItem(cookieName) : cookieDef.unset;
    }

    function getCookieOrDefaultValBool(id) {
        var cookieDef = getCookieDef(id),
            cookieRaw = getCookieOrDefaultValActual(id),
            val = (cookieRaw === cookieDef.set);

        return val;
    }

    function setCookieFromBool(id, isTrue) {
        var cookieDef = getCookieDef(id),
            cookieName = cookieDef.id;

        if (cookies.consent === 'agreed') {
            var cookieVal = (isTrue) ? cookieDef.set : cookieDef.unset;
            cookies.setItem(cookieName, cookieVal, expiry, path);
        }
    }

    exports.cookieManager = {
        getCookieOrDefaultValActual: getCookieOrDefaultValActual,
        getCookieOrDefaultValBool: getCookieOrDefaultValBool,
        setCookieFromBool: setCookieFromBool
    };

}(Pathways, docCookies));
