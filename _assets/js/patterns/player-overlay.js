var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};

(function(w, doc, mod, overlay, $, utils) {

    mod.playerOverlay = function(elem) {

        var $element = $(elem),

            defaultPanelOffset = 180,
            fullScreenPanelOffset = 0,

            playerSel = '.wellcomePlayer',
            overlayFullscreenClass = 'overlay-fullscreen',
            iframeTmpl = '<iframe/>',

            getHeightWithOffset = utils.getHeightWithOffset,
            getWidthWithOffset = utils.getWidthWithOffset;



        $element.on('click', function(e) {

            var $this = $(this),
                embedData = $this.data('embed'),
                isFullScreen = false;

            if (!embedData) return console.warn('No data provided to video overlay');

            var initHeight = getHeightWithOffset(defaultPanelOffset),
                initWidth = getWidthWithOffset(defaultPanelOffset),

                // Excluding the following attribute for now to enable player until CORS enabled
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

                $player.css('width', width);
                $player.css('height', height);

                utils.positionCenter($player);
            }

            function resizePlayer() {
                var offset = getOffset();
                resizePlayerToDimensions(getWidthWithOffset(offset), getHeightWithOffset(offset));
            }

            function createPlayer(tmpl, $rootEl) {
                $el = $(tmpl);
                $rootEl.append($el);
                return $el;
            }

            function initPlayer(sel) {
                w.initPlayers($(sel));
            }

            function addDocListeners() {

                $(w).resize(resizePlayer);

                $(w).on('onToggleFullScreen', function(event, goFullScreen) {
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

                $overlay = overlay.getOverlay(function() {
                    initPlayer(playerSel);
                }, function() {
                    isFullScreen = false;
                    w.embedScriptIncluded = false;
                });

                $player = createPlayer(playerTmpl, $overlay);

                addDocListeners();
            }

            init();
            resizePlayer();

            e.preventDefault();
            return false;

        });

    };
}(window, document, Pathways.components, Pathways.components.core.overlay, jQuery, Pathways.utils));
