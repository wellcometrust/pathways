/***
 *   Pathways utils
 */
(function(exports, w, sys, $, undefined) {


    function toCamelCase(str) {
        str = str || '';
        return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }

    function toTitleCase(str) {
        str = str || '';
        str = str.replace(/-/g, ' ').replace(/_/g, ' ');
        str = str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
        return str.replace(/\W/g, '');
    }

    function positionCenter($elm) {
        var width = $elm.width(),
            height = $elm.height(),

            top = (sys.innerHeight / 2) - (height / 2),
            left = (sys.innerWidth / 2) - (width / 2);

        $elm.css({
            position: 'absolute',
            top: top,
            left: left
        });
    }

    function getSrc(media) {
        if (!media) return 'no media';
        return media.src || media.currentSrc;
    }



    exports.utils = w.getUtils({
        toCamelCase: toCamelCase,
        toTitleCase: toTitleCase,
        positionCenter: positionCenter,
        getSrc: getSrc
    });

}(Pathways, (window||this), Pathways.system, jQuery));
