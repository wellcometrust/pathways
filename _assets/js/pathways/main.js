/***
    Pathways main
*/
(function(exports, w, p, sys, utils, getPanel, components, media, vol, video, scrollSceneResizeCtrl, preloader, $, undefined) {

    'use strict';

    var doc = w.document || {},

        minHeight = 550,
        startPanel,
        panels,

        scenesLoaded = false,
        componentsLoaded = false,

        sceneController,

        panelHeightDecreased = false;


    exports.panelHeight = calcPanelHeight();
    exports.getPanelHeight = function() {
        return exports.panelHeight;
    };


    function calcPanelHeight() {
        return parseInt((sys.innerHeight < minHeight ? minHeight : sys.innerHeight), 10);
    }


    function initPanels(panelSelector, startPanelSelector) {
        var $panels = $(panelSelector),
            first = $panels.first().get(0),
            last = $panels.last().get(0),
            startPanel = $(startPanelSelector).get(0),
            isFirst, isLast,
            panels = [];

        $panels.each(function(index, panel) {
            // console.log(panel);
            isFirst = panel === first;
            isLast = panel === last;
            panels.push(getPanel(panel, isFirst, isLast, false));
        });

        if (startPanel) panels.push(getPanel(startPanel, false, false, true));

        return panels;
    }

    function updateState() {
        exports.panelHeight = calcPanelHeight();
        var level = sys.level;

        media.ctrl.updateState(level);
        scrollSceneResizeCtrl.updateState(level);
        components.updateState(level);
        video.updateState(level);
    }

    function init(onLoadComplete) {

        if (window !== window.top) return console.log('Not initialising Pathways as called within iFrame');

        startPanel = $('.start').get(0);
        panels = initPanels('.panel', '.start');

        w.addEventListener('resize', function() {
            updateState();
        });

        $(function() {
            console.log('doc ready');

            updateState();

            onLoadComplete();

            preloader.load(3000); // set a four second delay before preloading the next page(s)

        });

        scrollSceneResizeCtrl.init('html', panels);
        components.init('[data-component]', panels);
        media.ctrl.init(panels);
        video.init(panels);
    }

    exports.init = init;

}(Pathways, this, Pathways, Pathways.system, Pathways.utils, Pathways.panel.getPanel, Pathways.components, Pathways.media, Pathways.media.vol, Pathways.video, Pathways.scrollSceneResizeCtrl, Pathways.preloader, jQuery));
