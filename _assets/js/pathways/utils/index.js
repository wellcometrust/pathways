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

    function extendClass(base, sub) {
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
            val = [];
        if (i != -1) {
            val = array.splice(i, 1);
        }

        return val.length ? val[0] : void 0;
    }

    function unique(array1, array2) {
        var array3 = [];

        var arr = array1.concat(array2),
            len = arr.length;

        while (len--) {
            var itm = arr[len];
            if (array3.indexOf(itm) === -1) {
                array3.unshift(itm);
            }
        }
        return array3;
    }

    function curry() {
        var fn = this,
            args = Array.prototype.slice.call(arguments);
        return function() {
            return fn.apply(this, args.concat(
                Array.prototype.slice.call(arguments)));
        };
    }

    function getSrc(media) {
        if (!media) return 'no media';
        return media.src || media.currentSrc;
    }



    exports.utils = {
        toCamelCase: toCamelCase,
        toTitleCase: toTitleCase,
        positionCenter: positionCenter,
        extendClass: extendClass,
        removeItemFromArray: removeItemFromArray,
        unique: unique,
        extend: $.extend,
        curry: curry,
        getSrc: getSrc
    };

}(Pathways, Pathways.system, jQuery));
