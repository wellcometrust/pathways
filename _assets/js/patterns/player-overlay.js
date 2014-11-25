Pathways.components.playerOverlay = function(elem) {

    var $element = $(elem),

        defaultPanelOffset = 180,
        fullScreenPanelOffset = 0,

        rootSel = 'body',
        playerSel = '.wellcomePlayer',

        activeClass = 'modal-open',
        overlayFullscreenClass = 'overlay-fullscreen',

        closeTmpl = '<div class="close"></div>',
        overlayTmpl = '<div class="overlay"></div>',
        iframeTmpl = '<iframe/>';


    function getHeightWithOffset(offset) {
        offset = offset || 0;
        return Pathways.panelHeight - offset;
    }

    function getWidthWithOffset(offset) {
        offset = offset || 0;
        return window.innerWidth - offset;
    }


    $element.on('click', function(e) {

        var $this = $(this),
            embedData = $this.data('embed'),
            isFullScreen = false;

        if (embedData) {

            var initHeight = getHeightWithOffset(defaultPanelOffset),
                initWidth = getWidthWithOffset(defaultPanelOffset),

                // Excluding the following line for now to enable player until CORS enabled
                // data-config="/player-config.js"
                playerTmpl = '<div class="wellcomePlayer" data-no-load="true" data-uri="' + embedData + '" data-assetsequenceindex="0" data-assetindex="0" data-zoom="-0.6441,0,2.2881,1.4411" data-config="/service/playerconfig" style="width:' + initWidth + 'px; height:' + initHeight + 'px; background-color: #000"></div>',

                $player,
                $overlay,
                $close;

            function getOffset() {
                if (isFullScreen) {
                    return fullScreenPanelOffset;
                } else {
                    return defaultPanelOffset;
                }
            }

            function resizePlayerToDimensions(width, height) {

                $overlay.css('height', getHeightWithOffset(0));

                $player.css('width', width);
                $player.css('height', height);

                Pathways.Utils.positionCenter($player);
            }

            function resizePlayer() {
                var offset = getOffset();
                resizePlayerToDimensions(getWidthWithOffset(offset), getHeightWithOffset(offset));
            }


            function createOverlay(tmpl, $rootEl, $closeEl) {
                var $el = $(tmpl);
                $el.append($closeEl);
                $rootEl.append($el);
                return $el;
            }

            function createPlayer(tmpl, $rootEl) {
                $el = $(tmpl);
                $rootEl.append($el);
                return $el;
            }

            function initPlayer(sel){
                window.initPlayers($(sel));
            }

            function initOverlay($el, sel) {

                $el.on('click', function() {
                    $(rootSel).removeClass(activeClass);
                    isFullScreen = false;
                    window.embedScriptIncluded = false;

                    setTimeout(function(){
                        $el.remove();
                    }, 1000); // give css transition time
                });

                setTimeout(function() {
                    // prevent scrolling
                    $(rootSel).addClass(activeClass);
                    initPlayer(sel);
                }, 50); // delay before adding class to ensure transition event will fire

            }


            function addDocListeners() {

                $(window).resize(resizePlayer);

                $(document).bind('onToggleFullScreen', function(event, goFullScreen) {

                    if (goFullScreen) {
                        isFullScreen = true;
                        $overlay.addClass(overlayFullscreenClass);
                    } else {
                        isFullScreen = false;
                        $overlay.removeClass(overlayFullscreenClass);
                    }

                    resizePlayer();
                });

                // test currentViewUri event
                //$(document).bind("onCurrentViewUri", function(event, uri) {
                    //console.log('download uri: ' + uri);
                //});
            }

            function init() {
                var $root = $(rootSel);

                $close = $(closeTmpl);
                $overlay = createOverlay(overlayTmpl, $root, $close);
                $player = createPlayer(playerTmpl, $overlay);

                addDocListeners();

                initOverlay($overlay, playerSel);
            }

            init();
            resizePlayer();

            e.preventDefault();
            return false;
        }
    });

};