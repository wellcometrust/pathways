/***
    Pathways scrollscene scrollDurations
*/
(function(exports, w, p, $) {

    'use strict';

    var screenDurationCache = 0,
        componentDurationCache = 0,
        mediaDurationCache = 0,
        lastMediaDurationCache = 0,
        opacityTransitionDurationCache = 0;

    function getScreenDuration() {
        return screenDurationCache;
    }

    function getComponentDuration(offset) {
        return function() {
            var val = componentDurationCache - offset;
            return (val > 0 ? val : 0);
        };
    }

    function getMediaDuration() {
        return mediaDurationCache;
    }

    function getOpacityTranstionDuration() {
        return opacityTransitionDurationCache;
    }

    function updateDuration(e) {
        // total time on screen is panel height
        screenDurationCache = p.panelHeight;
        opacityTransitionDurationCache = parseInt((p.panelHeight / 3), 10);
        // visible time on screen is approx 3/4 actual time with transitions
        componentDurationCache = parseInt((p.panelHeight * 0.75), 10);
        // fork makes last panel sometimes not hit triggerHook, so must be accounted for
        //mediaDurationCache = panel === $lastPanel[0] ? p.panelHeight : p.panelHeight - $('.fork').innerHeight();
        mediaDurationCache = p.panelHeight;
        lastMediaDurationCache = p.panelHeight - $('.fork').innerHeight();
    }

    function init() {
        $(w).on("resize", updateDuration);
        updateDuration();
    }

    function destroy() {
        $(w).off("resize", updateDuration);
    }

    exports.scrollSceneDurations = {
        init: init,
        destroy: destroy,
        getScreenDuration: getScreenDuration,
        getComponentDuration: getComponentDuration,
        getMediaDuration: getMediaDuration,
        getOpacityTranstionDuration: getOpacityTranstionDuration
    };

}(Pathways, window, Pathways, jQuery));


/***
    Pathways scrollscene control
*/
(function(exports, w, p, scrollDurations, $, Sm) {
    'use strict';

    var controller,
        globalFactories = [],
        globalPanelFactories = [],
        panelFactories = {},
        panels,
        defaultMethods = ['load', 'unload', 'getScenes'],
        MIN_LEVEL = p.MIN_SCROLL_LEVEL,
        noop = function() {},
        currentLoad = noop,
        currentUnload = noop,
        currentLevel = -1;

    function getInstance(factory) {
        if (!factory) return;
        var instance;
        // console.log(typeof factory);
        switch (typeof factory) {
            case 'function':
                instance = factory();
                break;
            case 'object':
                instance = factory;
                break;
        }

        if (!instance) return;
        defaultMethods.forEach(function(name) {
            if (!instance[name]) instance[name] = noop;
        });
        return instance;
    }

    function addScrollContentFactory(sceneFactory) {
        var instance = getInstance(sceneFactory);
        if (!instance) return;
        globalFactories.push(instance);
    }

    function addSinglePanelScrollFactory(id, sceneFactory) {
        var instance = getInstance(sceneFactory);
        if (!instance) return;
        panelFactories[id] = (panelFactories[id] || []);
        panelFactories[id].push(instance);
        // console.log(panelFactories[id], instance);
    }

    function addSinglePanelScrollMethod(id, sceneMethod) {
        var instance = getInstance({});
        if (!instance) return;
        instance.getScenes = sceneMethod;
        panelFactories[id] = (panelFactories[id] || []);
        panelFactories[id].push(instance);
        // console.log(panelFactories[id], instance);
    }

    function removeSinglePanelScrollFactory(id, sceneFactory) {
        //TODO: splice factory from array
    }

    function removeSinglePanelScrollMethod(id, sceneMethod) {
        //TODO: splice method from array
    }

    function addGlobalPanelScrollFactory(sceneFactory) {
        var instance = getInstance(sceneFactory);
        if (!instance) return;
        globalPanelFactories.push(instance);
    }

    function addGlobalPanelScrollMethod(sceneMethod) {
        var instance = getInstance({});
        if (!instance) return;
        instance.getScenes = sceneMethod;
        globalPanelFactories.push(instance);
    }

    function removeGlobalPanelScrollFactory(sceneFactory) {
        //TODO: splice factory from array
    }

    function removeGlobalPanelScrollMethod(sceneMethod) {
        //TODO: splice factory from array
    }

    function updateState(level) {
        if (currentLevel === level) return;

        if (level >= MIN_LEVEL) {
            currentLoad();
        } else {
            currentUnload();
        }
        currentLevel = level;
    }

    function init(_panels) {
        panels = _panels;

        currentLoad = load;
        currentUnload = noop;
    }

    function getEm() {
        var args = [].splice.call(arguments, 0);
        return function loadPanelSceneFactory(sceneFactory) {
            // console.log('>', args, arguments);
            sceneFactory.load.apply(sceneFactory, args);
            var sc = sceneFactory.getScenes.apply(sceneFactory, args);
            if (sc) controller.addScene(sc);
        };
    }

    function ungetEm() {
        var args = [].splice.call(arguments, 0);
        return function unloadFactory(sceneFactory) {
            // console.log('unloading factory scene');
            sceneFactory.unload.apply(sceneFactory, args);
        };
    }

    function loadPanelScenes(panel) {
        // console.log('loading ss control scenes');
        var pID = '#' + panel.id,
            pEl = panel.elem,
            pAttrs = panel,
            loadFactory = getEm(pID, pEl, pAttrs);

        globalPanelFactories.forEach(loadFactory);

        if (panelFactories[panel.id]) {
            var facs = panelFactories[panel.id];
            // console.log(facs, loadFactory);
            if (facs && facs.length) facs.forEach(loadFactory);
        }
    }

    function unloadPanelScenes(panel) {
        // console.log('unloading ss control scenes');
        var pID = '#' + panel.id,
            pEl = panel.elem,
            pAttrs = panel,
            unloadFactory = ungetEm(pID, pEl, pAttrs);

        globalPanelFactories.forEach(unloadFactory);

        if (panelFactories[panel.id]) {
            var facs = panelFactories[panel.id];
            if (facs && facs.length) facs.forEach(unloadFactory);
        }
    }

    function load() {
        controller = new Sm({
            // container: '#main',
            // loglevel: 3
        });
        globalFactories.forEach(getEm());
        panels.forEach(loadPanelScenes);
        scrollDurations.init();

        currentLoad = noop;
        currentUnload = unload;
        // console.log('globalFactories.length:', globalFactories.length);
    }

    function unload() {
        controller.destroy(true);
        globalFactories.forEach(ungetEm());
        panels.forEach(unloadPanelScenes);
        scrollDurations.destroy();

        currentLoad = load;
        currentUnload = noop;
        // console.log(controller.info());
    }

    exports.scrollSceneCtrl = {
        addSinglePanelScrollFactory: addSinglePanelScrollFactory,
        addSinglePanelScrollMethod: addSinglePanelScrollMethod,
        addGlobalPanelScrollFactory: addGlobalPanelScrollFactory,
        addGlobalPanelScrollMethod: addGlobalPanelScrollMethod,
        addScrollContentFactory: addScrollContentFactory,
        updateState: updateState,
        init: init
    };


}(Pathways, window, Pathways, Pathways.scrollSceneDurations, jQuery, ScrollMagic));


/***
    Pathways scrollscene resizing control
*/
(function(exports, w, p, sys, scrollSceneCtrl, $) {
    'use strict';

    var panels,
        rootSelector,
        noop = function() {},
        currentLoad = noop,
        currentUnload = noop,
        currentLevel = -1,
        originalLoadingText = '',
        MIN_SCROLL_LEVEL = p.MIN_SCROLL_LEVEL;

    function resizePanels(panels) {
        for (var i = 0; i < panels.length; i++) {
            panels[i].resize(p.panelHeight);
        }
    }

    function unsizePanels(panels) {
        for (var i = 0; i < panels.length; i++) {
            panels[i].unstyle();
        }
    }

    function updateState(level) {
        if (level < MIN_SCROLL_LEVEL) {
            currentUnload(level);
        } else {
            currentLoad(level);
        }
        scrollSceneCtrl.updateState(level);
        currentLevel = level;
    }

    function firstLoad(level) {
        p.loadingState.hide();

        scrollSceneCtrl.init(panels);
        unsize(level);
        resize(level);

        currentLoad = resize;
        currentUnload = unsize;
    }

    function resize(level) {
        resizePanels(panels);
        currentUnload = unsize;
    }

    function unsize(level) {
        unsizePanels(panels);
        currentUnload = noop;
    }

    function unload() {
        currentLevel = -1;
        unsize(0);
        currentLoad = noop;
        currentUnload = noop;
    }

    function init(_rootSelector, _panels) {
        panels = _panels;
        rootSelector = _rootSelector;
        currentLoad = firstLoad;
        currentUnload = unsize;
    }

    function destroy() {
        unload();
    }

    exports.scrollSceneResizeCtrl = {
        init: init,
        destroy: destroy,
        updateState: updateState
    };


}(Pathways, window, Pathways, Pathways.system, Pathways.scrollSceneCtrl, jQuery));
