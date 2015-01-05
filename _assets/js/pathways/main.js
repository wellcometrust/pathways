console.log('include main');

function _(str) {
    return document.querySelector(str);
}

Pathways.MIN_COMPONENT_LEVEL = 2;
Pathways.MIN_SCROLL_LEVEL = 4;

/***
    Pathways main
*/
(function(exports, w, _, sys, utils, media, vol, video, $, undefined) {

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


    exports.panelHeight = calcPanelHeight(minHeight);
    exports.getPanelHeight = function() {
        return this.panelHeight;
    };




    function getHeightWithOffset(offset) {
        offset = offset || 0;
        return exports.panelHeight - offset;
    }

    function getWidthWithOffset(offset) {
        offset = offset || 0;
        return w.innerWidth - offset;
    }


    function calcPanelHeight(oldHeight) {
        var newHeight = sys.innerHeight < minHeight ? minHeight : sys.innerHeight;

        if (oldHeight > newHeight) {
            panelHeightDecreased = true;
        } else {
            panelHeightDecreased = false;
        }


        return newHeight;
    }





    function initPanel(panel) {

        var $panel = $(panel),
            data = $panel.attr('data-config'),
            bg = $panel.find('.bg-container').get(0),
            configData = {};

        if (data) configData = JSON.parse(data);

        return {
            elem: panel,
            config: configData,
            bg: bg
        };
    }

    function isRatioPreserved(panel) {
        return panel.config && panel.config.background && panel.config.background.preserve_ratio;
    }

    function initPanels(panelSelector) {
        var $panels = $(panelSelector),
            panels = [];

        $panels.each(function(index, panel) {
            panels.push(initPanel(panel));
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

            method(component, data);
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

    function unsizePanels(panels) {
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

    function resizePanel(panel, panelHeight) {
        var _panel = panel.elem;

        unSetElementHeight(_panel);

        var config = panel.config,
            _bg = panel.bg,

            currentHeight = _panel.offsetHeight,
            offset = config ? ((sys.supportsTouch || !config.offset_height) ? 0 : config.offset_height) : 0,
            largerHeight = currentHeight < panelHeight ? panelHeight : currentHeight;

        if (largerHeight !== currentHeight || offset) {
            setElementHeight(_panel, (largerHeight + offset));
        }

        if (_bg) setElementHeight(_bg, panelHeight);
    }

    function resizePanelChild(index, child) {
        var newHeight = sys.innerWidth / sys.aspectRatio;
        setElementHeight(child, newHeight);
        translatePanelElem(child, exports.panelHeight);
    }

    function resizePanels(startPanel, panels) {

        if (startPanel) setElementHeight(startPanel, exports.panelHeight);

        for (var i = 0; i < panels.length; i++) {
            resizePanel(panels[i], exports.panelHeight);

            if (isRatioPreserved(panels[i])) {
                $(panels[i].elem).children().each(resizePanelChild);
            }
        }
    }

    function removeScrollSceneStyling() {

        if (startPanel) $(startPanel).removeAttr('style');
        $('.comic-panel').removeAttr('style');

        for (var i = 0; i < panels.length; i++) {
            var panel = panels[i],
                $bg = $(panel.bg),
                $panel = $(panel.elem),
                panelID = $panel.attr('id'),
                $libraryPanel = $panel.find('[data-panel="' + panelID + '"]').first(),
                $gallery = $panel.find('[data-component="gallery"]'),
                $quiz = $panel.find('[data-component="quiz"]'),
                $slidingPanels = $panel.find('.sliding-panel');

            if ($bg.length) $bg.removeAttr('style');
            if ($libraryPanel.length) $libraryPanel.removeAttr('style');
            if ($gallery.length) $gallery.removeAttr('style');
            if ($quiz.length) $quiz.removeAttr('style');
            if ($slidingPanels.length) $slidingPanels.removeAttr('style');

        }
    }

    var panelsUnsized = false;

    function resizeCheck() {
        if (sys.level < exports.MIN_COMPONENT_LEVEL) {
            unsizePanels(panels);
            panelsUnsized = true;
        } else if (sys.level >= exports.MIN_COMPONENT_LEVEL && sys.level < exports.MIN_SCROLL_LEVEL) {
            resizePanels(null, ratioedPanels);
            panelsUnsized = false;
        } else if (sys.level >= exports.MIN_SCROLL_LEVEL) {
            resizePanels(startPanel, panels);
            panelsUnsized = false;
        }
    }

    function loadCheck(onScrollLoad, onScrollUnload) {
        exports.panelHeight = calcPanelHeight(exports.panelHeight);

        // If it's iPad width or larger, load the components
        if (!componentsLoaded) {
            if (sys.level >= exports.MIN_COMPONENT_LEVEL) {
                loadComponents(exports.components);
                componentsLoaded = true;
            }
        } else {
            if (sys.level < exports.MIN_COMPONENT_LEVEL) {
                // unload components
            }
        }

        if (!scenesLoaded) {
            // If it's a non-touch device, load the scenes.
            if (sys.level >= exports.MIN_SCROLL_LEVEL) {
                sceneController = onScrollLoad();

                media.model.init(panels);
                media.ctrl.init();


                vol.enable();
                media.ctrl.playMediaOnGlobalChannel(media.model.globalAudio());

                scenesLoaded = true;
            }
        } else {
            if (sys.level < exports.MIN_SCROLL_LEVEL) {
                sceneController.destroy(true);
                removeScrollSceneStyling();
                onScrollUnload();

                media.ctrl.disable();
                vol.disable();

                scenesLoaded = false;
            }
        }
    }



    function init(onLoadComplete, onScrollLoad, onScrollUnload) {

        startPanel = $('.start').get(0);
        panels = initPanels('.panel');
        ratioedPanels = initRatioedPanels(panels);
        resizeCheck();

        w.addEventListener('resize', function() {
            resizeCheck();
            loadCheck(onScrollLoad, onScrollUnload);
        });

        // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
        $(function() {
            console.log('doc ready');

            vol.setStateFromCookies();

            vol.addView(vol.views.getMuteButtonView('.mute'));
            vol.addView(vol.views.getGlobalView('video, audio'));

            onLoadComplete();
            resizeCheck();
            loadCheck(onScrollLoad, onScrollUnload);

            video.init(panels);


        });
    }

    exports.init = init;

    exports.scrollScenes = {};
    exports.components = {};

    utils.getHeightWithOffset = getHeightWithOffset;
    utils.getWidthWithOffset = getWidthWithOffset;

}(Pathways, this, _, Pathways.system, Pathways.utils, Pathways.media, Pathways.media.vol, Pathways.video, jQuery));
