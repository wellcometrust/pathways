(function(exports, $) {

    function getTotalHeight(el) {
        var style = getComputedStyle(el, null),
            margin = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        return el.offsetHeight + margin;
    }

    function setElementHeight(el, height) {
        $(el).css('height', parseInt(height, 10) + 'px');
    }

    function unSetElementHeight(el) {
        $(el).css('height', '');
    }

    function unStyleElement(el) {
        $(el).removeAttr('style');
    }

    function initPanel(panelEl, isFirst, isLast, isStart) {

        var $panel = $(panelEl),
            id = $panel.attr('id'),
            data = $panel.attr('data-config'),
            bg = $panel.find('.bg-container').get(0),
            content = $panel.find('.main-content, .content').get(0),
            $bottom = $('.survey, .fork'),
            bottomHeight = 0,
            configData = {};

        if (!id && !isStart) throw new Error('All panels require an id [' + panelEl + ']');
        if (data) configData = JSON.parse(data);

        var panel = {
            id: id,
            elem: panelEl,
            config: configData,
            bg: bg,
            content: content,
            isFirst: isFirst,
            isLast: isLast,
            isStart: isStart
        };

        panel.unsetHeight = function() {
            unSetElementHeight(panel.elem);
        };

        panel.unsetBackgroundHeight = function() {
            unSetElementHeight(panel.bg);
        };

        panel.setViewportHeight = function(viewPortHeight) {
            var newHeight, contentDuration, componentDuration;

            if (panel.content) {
                newHeight = parseInt(Math.max(getTotalHeight(panel.content), viewPortHeight), 10);
            } else {
                newHeight = viewPortHeight;
            }

            if (newHeight === viewPortHeight) {
                setElementHeight(panel.elem, newHeight);
            }

            if (!panel.isStart) {
                if (panel.bg) setElementHeight(panel.bg, viewPortHeight);
            } else {
                if (panel.bg) setElementHeight(panel.bg, newHeight);
            }

            bottomHeight = 0;
            if ($bottom) {
                $bottom.each(function() {
                    bottomHeight += $(this).outerHeight();
                });
            }

            contentDuration = (!panel.isLast) ? newHeight : newHeight - bottomHeight;
            componentDuration = parseInt((contentDuration * 0.75), 10);

            panel.contentHeight = newHeight;
            panel.contentDuration = contentDuration;
            panel.componentDuration = componentDuration;

            return newHeight;
        };

        panel.getContentHeight = function getContentHeight() {
            return panel.contentHeight;
        };
        panel.getComponentDuration = function getComponentDuration() {
            return panel.componentDuration;
        };
        panel.getMediaDuration = function getMediaDuration() {
            return panel.contentDuration;
        };
        panel.getContentDuration = function getContentDuration() {
            return panel.contentDuration;
        };

        panel.resize = function resize(height) {
            unSetElementHeight(panel.elem);
            panel.setViewportHeight(height);
        };

        panel.unsize = function unsize(height) {
            unSetElementHeight(panel.elem);
            unSetElementHeight(panel.bg);
        };

        panel.unstyle = function unstyle() {
            unStyleElement(panel.elem);
            unStyleElement(panel.bg);
        };

        panel.resize(exports.viewportHeight);

        return panel;
    }

    exports.panel = {
        getPanel: function getPanel(el, isFirst, isLast, isStart) {
            return initPanel(el, isFirst, isLast, isStart);
        }
    };

}(Pathways, jQuery));
