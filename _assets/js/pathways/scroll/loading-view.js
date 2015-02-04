(function(w, d, P) {

    var r, tE, aE, txt,
        lvl = P.MIN_SCROLL_LEVEL,
        rS = 'html',
        tS = '.scroll-down--text',
        aS = '.scroll-down--arrow',
        lS = 'scroll-loading',
        _ = function(el) {
            return d.querySelector(el);
        };

    function removeClass(e, c) {
        e.className = e.className.replace(new RegExp('(?:^|\\s)' + c + '(?!\\S)'), '');
    }
    P.loadingState = {
        init: function() {
            if (P.system.level >= lvl) {
                _(rS).className += ' ' + lS;
            }
        },
        show: function() {
            if (P.system.level >= lvl) {
                console.log('showing loading state');
                tE = _(tS);
                aE = _(aS);
                if (!tE || !aE) return;
                txt = tE.innerHTML;
                tE.innerHTML = 'Loading';
                aE.style.display = 'none';
            }
        },
        hide: function() {
            console.log('calling hide');
            if (P.system.level >= lvl) {
                console.log('   hiding loading state');
                tE = _(tS);
                aE = _(aS);
                if (!tE || !aE) return;
                tE.innerHTML = txt;
                aE.style.display = '';
                removeClass(_(rS), lS);
            }
        }
    };
    P.loadingState.init();

}(window, document, Pathways));
