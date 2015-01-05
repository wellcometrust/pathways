
console.log('include letter-gallery');

(function(exports, w, overlay, getCarousel, audioPlayer, utils, $, _Hammer, Mod) {

    function getAudioPlayerView() {
        var $progress = $('<div class="progress-bar">')
            .append('<div class="progressed">'),

            $timeLeft = $('<div>Time left <span>0:00</span></div>').addClass('time-left'),

            $controls = $('<div class="controls"></div>'),

            $player = $('<div>').addClass('audio-player audio-player-gallery')
            .append($timeLeft)
            .append($progress)
            .append($controls);

        return $player;
    }

    function getPaneView(img, data) {
        var $li = $('<li/>'),
            $img = $(img);

        $li.append($img);

        var $player = getAudioPlayerView(),
            audio = new Audio(data.audio);

        var playerCtrl = audioPlayer.getPlayerCtrl(audio),
            playerView = audioPlayer.getPlayerView($player, playerCtrl);

        playerCtrl.addView(playerView);
        playerCtrl.enable();


        // add potential text
        if (data.text) {
            var $child = $('<div>' + data.text + '</div>').addClass('text');
            $li.append($child);
        }

        $li.append($player);

        return $li;
    }

    exports.letterGallery = function(element, data) {
        var $elem = $(element),
            $panel = $elem.closest('.panel'),
            panelId = $panel.attr('id');

        $(element).on('click', function(e) {

            var $overlay,
                $div = $('<div class="carousel"></div>'),
                $loading = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
                carousel = getCarousel($div, data, getPaneView);

            $loading.css({
                position: 'absolute',
                top: ((w.innerHeight / 2) - 12),
                left: ((w.innerWidth / 2) - 35)
            });

            $overlay = overlay.getOverlay(function() {
                carousel.init();
            });

            $overlay.append($loading);
            $overlay.append($div);

        });

    };


}(Pathways.components, window, Pathways.components.core.overlay, Pathways.components.core.carousel.getCarousel, Pathways.components.core.audioPlayer, Pathways.utils, jQuery, Hammer, Modernizr));
