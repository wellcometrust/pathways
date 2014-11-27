(function(doc, loc, docCookies, exports) {

    var cookieName = '_wt_pathways_cookieconsent',
        _cookieWarningID = '#cookieconsent',
        acceptID = 'cookies-accept',
        rejectID = 'cookies-reject',
        expiry = Infinity,
        _onComplete = noop;

    function noop(value) {}

    function accept(e) {
        setState('agreed');
        hideWarning();
        e.preventDefault();
        return false;
    }

    function reject(e) {
        setState('not_agreed');
        hideWarning();
        e.preventDefault();
        return false;
    }

    function callComplete(value) {
        _onComplete(value);
        _onComplete = noop;
    }

    function setState(value) {
        docCookies.setItem(cookieName, value, expiry, '/');
        callComplete(value);
    }

    function setClickHandlers() {
        doc.getElementById(acceptID).onclick = accept;
        //doc.getElementById(rejectID).onclick = reject;
    }

    function displayWarning() {
        var element = doc.querySelector(_cookieWarningID);
        if (element) element.setAttribute('class', 'visible');
    }

    function hideWarning() {
        var element = doc.querySelector(_cookieWarningID);
        if (element) element.setAttribute('class', 'hidden');
    }


    exports.checkConsent = function(onComplete, cookieWarningID) {
        _cookieWarningID = cookieWarningID || _cookieWarningID;
        _onComplete = onComplete || _onComplete;

        var element = doc.querySelector(_cookieWarningID),
            cookieConsentExists = docCookies.hasItem(cookieName),
            cookieConsentState = cookieConsentExists ? docCookies.getItem(cookieName) : 'undeclared';

        if (element) {
            if (!cookieConsentExists || cookieConsentState !== 'agreed') {
                displayWarning();
                setClickHandlers();
            } else {
                hideWarning();
                callComplete(cookieConsentState);
            }
        } else {
            callComplete(cookieConsentState);
        }
    };

    exports.cookieConsentName = cookieName;

}(document, location, docCookies, docCookies));

docCookies.checkConsent(function(value) {
    //console.log('cookies allowed?: ', value);
    docCookies.consent = value;
});
