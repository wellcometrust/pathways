(function(w, d, P) {

    var r, tE, aE, txt,
        lvl = P.MIN_SCROLL_LEVEL,
        rS = 'html',
        tS = '.scroll-down--text',
        aS = '.scroll-down--arrow',
        lS = 'scroll-loading';

    function _(el) {
        return d.querySelector(el);
    }

    function rm(e, c) {
        e.className = e.className.replace(new RegExp('(?:^|\\s)' + c + '(?!\\S)'), '');
    }
    P.loadingState = {
        init: function() {
            if (P.system.level >= lvl) {
                _(rS).className += ' ' + lS;
            }
        },
        show: function() {
            tE = _(tS);
            aE = _(aS);
            if (!tE || !aE) return;
            txt = tE.innerHTML;
            if (P.system.level >= lvl) {
                tE.innerHTML = 'Loading';
                aE.style.display = 'none';
            }
        },
        hide: function() {
            tE = _(tS);
            aE = _(aS);
            if (!tE || !aE) return;
            if (txt) tE.innerHTML = txt;
            aE.style.display = '';
            rm(_(rS), lS);
        }
    };
    P.loadingState.init();

}(window, document, Pathways));
