(function(doc, loc, docCookies, exports) {

    var cookieName = 'cookieconsent_wt_pathways',
        _cookieWarningID = '#cookieconsent',
        acceptID = 'cookies-accept',
        rejectID = 'cookies-reject',
        numDays = 365,
        _onComplete = noop;

    function noop(value) {}

    function accept(e) {
        setState(true);
        hideWarning();
        e.preventDefault();
        return false;
    }

    function reject(e) {
        setState(false);
        hideWarning();
        e.preventDefault();
        return false;
    }

    function setState(value) {
        docCookies.setItem(cookieName, value, numDays, '/');
        _onComplete(value);
        _onComplete = noop;
    }

    function setClickHandlers() {
        doc.getElementById(acceptID).onclick = accept;
        doc.getElementById(rejectID).onclick = reject;
    }

    function displayWarning() {
        var element = doc.querySelector(_cookieWarningID);
        element.setAttribute('class', 'visible');
    }

    function hideWarning() {
        var element = doc.querySelector(_cookieWarningID);
        element.setAttribute('class', 'hidden');
    }


    exports.checkConsent = function(onComplete, cookieWarningID) {
        _cookieWarningID = cookieWarningID || _cookieWarningID;
        _onComplete = onComplete || _onComplete;

        var element = doc.querySelector(_cookieWarningID),
            cookiesAccepted = docCookies.getItem(cookieName);

        if (element && (cookiesAccepted === null || typeof cookiesAccepted === 'undefined')) {
            displayWarning();
            setClickHandlers();
            return;
        }

        setState(cookiesAccepted);
        hideWarning();
    };

}(document, location, docCookies, docCookies));

docCookies.checkConsent(function(value) {
    console.log('cookies allowed?: ', value);
    docCookies.consent = value;
});
