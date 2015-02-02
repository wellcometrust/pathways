// Global Nav
(function(w, $) {
    "use strict";

    var $nav = $('.global-navigation'),
        $nav_handle = $nav.find('.handle'),
        state = 'open',
        navHeight = $nav.outerHeight(),
        handleHeight = $nav_handle.outerHeight();

    $nav.on('click', '.handle', function() {
        navHeight = $nav.outerHeight();

        if (state == 'open') {
            $nav.css('transform', 'translate(0, ' + -(navHeight - handleHeight) + 'px)');
            state = 'closed';
        } else {
            $nav.css('transform', 'translate(0, 0)');
            state = 'open';

            // add an event listener on scroll to close the nav if open.
            $(w).one('scroll', function() {
                $nav_handle.trigger('click');
            });
        }
    });

    w.addEventListener('resize', function() {
        navHeight = $nav.outerHeight();
        $nav.css('transform', 'translate(0, ' + -(navHeight - handleHeight) + 'px)');
    });

    w.setTimeout(function() {
        $nav_handle.trigger('click');
    }, 1000);

}(window, $));




// Init Pathways
(function(w, p, preloader, ga) {

    function onPathwaysLoad() {

        function initScript(d, s, id, a) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.async = 1;
            js.src = a;
            fjs.parentNode.insertBefore(js, fjs);
        }

        w.___gcfg = {
            parsetags: 'onload'
        };

        initScript(document, 'script', 'facebook-jssdk', "//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=1494497634145827&version=v2.0");
        initScript(document, 'script', 'pth-ga-api', "//apis.google.com/js/platform.js");
        initScript(document, 'script', 'pth-pin-api', "//assets.pinterest.com/js/pinit.js");
        initScript(document, 'script', 'pth-twt-api', "//platform.twitter.com/widgets.js");

        p.components.core.ga.init('[data-ga]');

        preloader.init('[data-preload-link]');

    }

    p.init(onPathwaysLoad);

}(window, Pathways, Pathways.preloader, ga));
