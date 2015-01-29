console.log('include main');

function _(str) {
    return document.querySelector(str);
}

Pathways.MIN_COMPONENT_LEVEL = 2;
Pathways.MIN_SCROLL_LEVEL = 4;


/***
    Pathways main
*/
(function(exports, w, _, p, sys, utils, media, vol, video, scrollSceneCtrl, $, undefined) {

    'use strict';

    var doc = w.document,

        minHeight = 550,
        startPanel,
        panels,
        ratioedPanels,

        scenesLoaded = false,
        componentsLoaded = false,

        sceneController,

        panelHeightDecreased = false;


    exports.panelHeight = calcPanelHeight();
    exports.getPanelHeight = function() {
        return exports.panelHeight;
    };




    function getHeightWithOffset(offset) {
        offset = offset || 0;
        return exports.panelHeight - offset;
    }

    function getWidthWithOffset(offset) {
        offset = offset || 0;
        return w.innerWidth - offset;
    }


    function calcPanelHeight() {
        return parseInt((sys.innerHeight < minHeight ? minHeight : sys.innerHeight), 10);
    }





    function initPanel(panel, isFirst, isLast) {

        var $panel = $(panel),
            id = $panel.attr('id'),
            data = $panel.attr('data-config'),
            bg = $panel.find('.bg-container').get(0),
            content = $panel.find('.main-content').get(0),
            contentHeight = $(content).outerHeight(),
            configData = {};


        if (!id) throw new Error('All panels require an id [' + panel + ']');
        if (data) configData = JSON.parse(data);

        var panelOb = {
            id: id,
            elem: panel,
            config: configData,
            bg: bg,
            content: content,
            contentHeight: contentHeight,
            isFirst: isFirst,
            isLast: isLast
        };

        panelOb.getContentHeight = function() {
            return panelOb.contentHeight;
        };

        return panelOb;
    }

    function isRatioPreserved(panel) {
        return panel.config && panel.config.background && panel.config.background.preserve_ratio;
    }

    function initPanels(panelSelector) {
        var $panels = $(panelSelector),
            first = $panels.first().get(0),
            last = $panels.last().get(0),
            isFirst, isLast,
            panels = [];

        $panels.each(function(index, panel) {
            // console.log(panel);
            isFirst = panel === first;
            isLast = panel === last;
            panels.push(initPanel(panel, isFirst, isLast));
        });
        return panels;
    }

    function initRatioedPanels(panels) {
        var rPanels = [];
        for (var i = 0; i < panels.length; i++) {

            if (isRatioPreserved(panels[i])) {
                rPanels.push(panels[i]);
            }
        }
        return rPanels;
    }


    function loadComponents(context, height) {
        var $components = $('[data-component]');

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



    function setElementHeight(el, height) {
        $(el).css('height', parseInt(height, 10) + 'px');
    }

    function unSetElementHeight(el) {
        $(el).css('height', '');
    }

    function translatePanelElem(_el, currentHeight) {

        var newHeight = sys.innerWidth / sys.aspectRatio,
            prefixes = ['-moz-', '-webkit-', ''],
            y = parseInt(((currentHeight - newHeight) / 2), 10);

        if (currentHeight > newHeight) {
            for (var p = 0; p < prefixes.length; p++) {
                _el.style[prefixes[p] + 'transform'] = 'translate(0, ' + y + 'px)';
            }
        }
    }

    function unTranslatePanelElem(_el) {
        var prefixes = ['-moz-', '-webkit-', ''];

        for (var p = 0; p < prefixes.length; p++) {
            _el.style[prefixes[p] + 'transform'] = '';
        }
    }

    function unsizePanels(startPanel, panels) {
        if (startPanel) unSetElementHeight(startPanel);

        var unsizePanel = function(index, child) {
            $(child).removeAttr('style');
        };

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem,
                _bg = panels[i].bg;

            $(_panel).removeAttr('style');
            $(_bg).removeAttr('style');

            //unSetElementHeight(_panel);
            //unSetElementHeight(_bg);

            if (isRatioPreserved(panels[i])) {
                $(_panel).children().each(unsizePanel);
            }
        }
    }

    function getTotalHeight(el) {
        var style = getComputedStyle(el, null),
            margin = parseFloat(style.marginTop) + parseFloat(style.marginBottom);

            // console.log('margin', margin);
        return el.offsetHeight + margin;
    }

    function resizePanel(panel, viewPortHeight, index) {
        var _panel = panel.elem;

        var config = panel.config,
            _bg = panel.bg,
            _content = panel.content,
            // id = $(panel.elem).attr('id'),
            panelHeight = _panel.offsetHeight,
            newPanelHeight;

        if (_content) {
            var $content = $(_content),
                contentHeight = getTotalHeight(_content),
                largerContentHeight;

            // console.log('c, p', id, contentHeight, panelHeight);
            largerContentHeight = parseInt(Math.max(contentHeight, viewPortHeight), 10);
            newPanelHeight = largerContentHeight;

        } else {
            newPanelHeight = viewPortHeight;
        }

        panel.contentHeight = newPanelHeight;
        panel.componentHeight = parseInt((newPanelHeight * 0.75), 10);

        // console.log('p np:', index, panelHeight, newPanelHeight, (newPanelHeight === viewPortHeight));

        // if (panelHeight !== newPanelHeight) {
        //     setElementHeight(_panel, newPanelHeight);
        // }

        if (newPanelHeight === viewPortHeight) {
            // console.log(index, ' setting new height ', newPanelHeight);
            setElementHeight(_panel, newPanelHeight);
        } else {
            unSetElementHeight(_panel);
        }

        if (_bg) setElementHeight(_bg, viewPortHeight);

    }

    function resizePanelChild(index, child) {
        var newHeight = sys.innerWidth / sys.aspectRatio;
        setElementHeight(child, newHeight);
        translatePanelElem(child, exports.panelHeight);
    }

    function resizePanels(startPanel, panels) {

        if (startPanel) setElementHeight(startPanel, exports.panelHeight);

        for (var i = 0; i < panels.length; i++) {
            resizePanel(panels[i], exports.panelHeight, i);

            if (isRatioPreserved(panels[i])) {
                $(panels[i].elem).children().each(resizePanelChild);
            }
        }
    }

    var panelsUnsized = false;

    function resizeCheck() {

        exports.panelHeight = calcPanelHeight();

        if (sys.level < p.MIN_COMPONENT_LEVEL) {
            unsizePanels(startPanel, panels);
            panelsUnsized = true;
        } else if (sys.level >= p.MIN_COMPONENT_LEVEL && sys.level < p.MIN_SCROLL_LEVEL) {
            unsizePanels(startPanel);
            resizePanels(null, ratioedPanels);
            panelsUnsized = false;
        } else if (sys.level >= p.MIN_SCROLL_LEVEL) {
            resizePanels(startPanel, panels);
            panelsUnsized = false;
        }
    }

    function loadCheck() {
        exports.panelHeight = calcPanelHeight();

        // If it's iPad width or larger, load the components
        if (!componentsLoaded) {
            if (sys.level >= p.MIN_COMPONENT_LEVEL) {
                loadComponents(exports.components);
                componentsLoaded = true;
            }
        } else {
            if (sys.level < p.MIN_COMPONENT_LEVEL) {
                // unload components
            }
        }

        if (!scenesLoaded) {
            // If it's a non-touch device, load the scenes.
            if (sys.level >= p.MIN_SCROLL_LEVEL) {

                media.model.init(panels);
                media.ctrl.init();

                vol.enable();
                media.ctrl.playMediaOnGlobalChannel(media.model.globalAudio());

                if (scrollSceneCtrl) {
                    scrollSceneCtrl.init(panels);
                    scrollSceneCtrl.load();

                }

                scenesLoaded = true;
            }
        } else {
            if (sys.level < p.MIN_SCROLL_LEVEL) {

                media.ctrl.disable();
                vol.disable();

                if (scrollSceneCtrl) {
                    scrollSceneCtrl.unload(panels);
                    scrollSceneCtrl.destroy();
                }

                scenesLoaded = false;
            }
        }
    }



    function init(onLoadComplete) {

        startPanel = $('.start').get(0);
        panels = initPanels('.panel');
        ratioedPanels = initRatioedPanels(panels);
        resizeCheck();

        w.addEventListener('resize', function() {
            resizeCheck();
            loadCheck();
        });

        w.addEventListener('load', function() {
            resizeCheck();
            loadCheck();
        });

        // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
        $(function() {
            console.log('doc ready');

            vol.setStateFromCookies();

            vol.addView(vol.views.getMuteButtonView('.mute'));
            vol.addView(vol.views.getGlobalView('video, audio'));

            onLoadComplete();
            resizeCheck();
            loadCheck();

            video.init(panels);


        });
    }

    exports.init = init;

    exports.scrollScenes = {};
    exports.components = {};

    utils.getHeightWithOffset = getHeightWithOffset;
    utils.getWidthWithOffset = getWidthWithOffset;

}(Pathways, this, _, Pathways, Pathways.system, Pathways.utils, Pathways.media, Pathways.media.vol, Pathways.video, Pathways.scrollSceneCtrl, jQuery));
