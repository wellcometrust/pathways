console.log('include media/vol/index');
(function(exports, utils, jQuery) {

    exports.events = exports.events || {};
    var _splice = Array.prototype.splice;

    function callEach(listeners, args) {

        var len = listeners.length,
            i, listener;

        for (i = 0; i < len; ++i) {
            listener = listeners[i];
            listener.apply(null, args);
        }
    }

    function getCtrlOb(listeners) {
        return {
            enable: function enable() {
                callEach(listeners, 'enable', _splice.call(arguments, 0));
            },
            addListener: function addListener(eName, listener) {
                listeners[eName] = listeners[eName] || [];
                var eListeners = listeners[eName];
                eListeners.push(listener);

                return listener;
            },
            removeListener: function removeListener(eName, listener) {
                utils.removeItemFromArray(listener, listeners[eName]);
            },
            emit: function() {
                var args = _splice.call(arguments, 0);
                var eName = args[0];
                args = _splice.call(args, 1);

                callEach(listeners[eName], args);
            }
        };
    }

    exports.events.getEventListener = function(model) {
        return getCtrlOb([]);
    };

}(Pathways.core, Pathways.utils, jQuery));
