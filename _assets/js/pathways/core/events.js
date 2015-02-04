(function(exports, utils, jQuery) {

    exports.events = exports.events || {};
    var _splice = Array.prototype.splice;

    function callEach(listeners, args) {

        var len = listeners.length,
            i, listener;

        for (i = 0; i < len; ++i) {
            listener = listeners[i];
            if (typeof listener === 'function') listener.apply(null, args);
        }
    }

    function getCtrlOb(listeners) {
        return {
            on: function addListener(eName, listener) {
                if (!listeners) return console.warn('EventListener must be instantiated first');
                listeners[eName] = listeners[eName] || [];
                var eListeners = listeners[eName];
                eListeners.push(listener);
                return listener;
            },
            off: function removeListener(eName, listener) {
                utils.removeItemFromArray(listener, listeners[eName]);
            },
            emit: function() {
                var args = _splice.call(arguments, 0);
                var eName = args[0],
                eListeners = listeners[eName];
                if (!eListeners) return;

                args = _splice.call(args, 1);

                callEach(eListeners, args);
            }
        };
    }

    exports.events.getEventListener = function(model) {
        return getCtrlOb([]);
    };

}(Pathways.core, Pathways.utils, jQuery));
