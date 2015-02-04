/***
    Pathways component control
*/
Pathways.components = {};

(function(exports) {
    'use strict';

    var componentProto = {
        addData: function addData(id, data) {
            this.data[id] = data;
        },
        getData: function getData(id) {
            return this.data[id];
        }
    };

    function getComponent(method) {
        return Object.create(componentProto, {
            data: {
                value: {}
            },
            load: {
                value: method
            }
        });
    }

    exports.getComponent = getComponent;

}(Pathways.components));

(function(exports, w, p, getComponent, utils, sys, $) {
    'use strict';

    var selector = '[data-component]',
        noop = function() {},
        list = {},
        currentLoad = noop,
        currentUnload = noop;

    function updateState(level) {
        if (level < p.MIN_COMPONENT_LEVEL) {
            currentUnload(level);
        } else {
            currentLoad(level);
        }
    }

    function requestComponent(id) {
        var component = list[id];
        if (typeof component === 'undefined' || component === null) return console.warn('Could not load the requested component: ' + id);
        return component;
    }

    function requestData(component, id) {
        if (!(id && component)) return;
        return component.getData(id);
    }

    function loadComponent(index, el) {
        var $view = $(el),
            componentId = $view.attr('data-component'),
            instanceId = $view.attr('id'),
            component = requestComponent(componentId),
            data;

        if (!component) return;
        data = requestData(component, instanceId);

        component.load(el, data);
    }

    function loadComponents(context) {
        var $views = $(selector);
        $views.each(loadComponent);
    }

    function firstLoad(level) {
        // w.addEventListener('resize', stateCheck);
        loadComponents(list);

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

    function create(name, method) {
        if (list[name]) return console.warn('A component with the name of \'' + name + '\' already exists');
        list[name] = getComponent(method);
    }

    function get(name) {
        if (!list[name]) return console.warn('No component with the name of \'' + name + '\' could be found');
        return list[name];
    }


    exports.init = init;
    exports.destroy = destroy;
    exports.updateState = updateState;
    exports.create = create;
    exports.get = get;



}(Pathways.components, window, Pathways, Pathways.components.getComponent, Pathways.utils, Pathways.system, jQuery));
