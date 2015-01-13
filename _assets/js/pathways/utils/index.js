/***
 *   Pathways utils
 */
console.log('include utils/index');
(function(exports, sys, $, undefined) {

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

    function extend(base, sub) {
        // Avoid instantiating the base class just to setup inheritance
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
        // for a polyfill
        // Also, do a recursive merge of two prototypes, so we don't overwrite
        // the existing prototype, but still maintain the inheritance chain
        // Thanks to @ccnokes
        var origProto = sub.prototype;
        sub.prototype = Object.create(base.prototype);
        for (var key in origProto) {
            sub.prototype[key] = origProto[key];
        }
        // Remember the constructor property was set wrong, let's fix it
        sub.prototype.constructor = sub;
        // In ECMAScript5+ (all modern browsers), you can make the constructor property
        // non-enumerable if you define it like this instead
        Object.defineProperty(sub.prototype, 'constructor', {
            enumerable: false,
            value: sub
        });
    }

    function removeItemFromArray(item, array) {
        var i = array.indexOf(item),
            val = [null];
        if (i != -1) {
            val = array.splice(i, 1);
        }

        return val[0];
    }


    exports.utils = {
        toCamelCase: toCamelCase,
        toTitleCase: toTitleCase,
        positionCenter: positionCenter,
        extend: extend,
        removeItemFromArray: removeItemFromArray
    };

}(Pathways, Pathways.system, jQuery));
