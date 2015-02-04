(function(exports, utils, jQuery) {

    exports.view = exports.view || {};
    var _splice = Array.prototype.splice;

    function callEach(views, method, args) {

        var len = views.length,
            i, view;

        for (i = 0; i < len; ++i) {
            view = views[i];
            if (view[method]) view[method].apply(view, args);
        }
    }

    function getCtrlOb(views) {
        return {
            update: function update() {
                callEach(views, 'update', _splice.call(arguments, 0));
            },
            disable : function disable() {
                callEach(views, 'disable', _splice.call(arguments, 0));
            },
            enable: function enable() {
                callEach(views, 'enable', _splice.call(arguments, 0));
            },
            addView: function addView(view) {
                if (view.update) {
                    views.push(view);
                } else {
                    console.warn('[Pathways CtrlWithViews] view must have update method');
                }
                return view;
            },
            removeView: function removeView(view) {
                utils.removeItemFromArray(view, views);
            }
        };
    }

    exports.view.getViewCtrl = function(model) {
        return getCtrlOb([]);
    };

}(Pathways.core, Pathways.utils, jQuery));
