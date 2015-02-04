/***
    Pathways scrollscene resizing control
*/
(function(exports, w, p, utils, sys, $) {
    'use strict';

    var selector = '[data-component]',
        noop = function() {},
        components = {},
        currentLoad = noop,
        currentUnload = noop;

    function updateState(level) {
        if (level < p.MIN_COMPONENT_LEVEL) {
            currentUnload(level);
        } else {
            currentLoad(level);
        }
    }


    function loadComponents(context) {
        var $components = $(selector);

        $components.each(function(index, component) {

            var $component = $(component),
                handlerName = $component.attr('data-component'),
                id = utils.toCamelCase($component.attr('id')),
                handlerClass = utils.toCamelCase(handlerName),
                method = context[handlerClass],
                data;

            if (typeof method === 'undefined' || method === null) return console.warn('Could not load the necessary component: ' + handlerClass);

            if (id && method[id] && method[id].data) data = method[id].data;
            if (typeof method === 'function') {
                method(component, data);
            } else if (typeof method === 'object') {
                method.onLoad(component, data);
            }
        });
    }

    function firstLoad(level) {
        // w.addEventListener('resize', stateCheck);


        loadComponents(exports.components);

        currentLoad = noop;
        currentUnload = noop;
    }

    function unload(level) {
        // w.removeEventListener('resize', stateCheck);
    }

    function init(_selector) {
        selector = _selector || selector;

        currentLoad = firstLoad;
    }

    function destroy() {
        unload();
    }


    exports.components = {
        init: init,
        destroy: destroy,
        updateState: updateState,
        addComponent: function (name, component) {
            if (components[name]) return console.warn('A component with the name of \''+name+'\' already exists');
            components[name] = component;
        },
        getComponent: function (name) {
            if (!components[name]) return console.warn('No component with the name of \''+name+'\' could be found');
            return components[name];
        },
        addComponentInstanceData: function (id, data) {
            // body...
        }
    };


}(Pathways, window, Pathways, Pathways.utils, Pathways.system, jQuery));
