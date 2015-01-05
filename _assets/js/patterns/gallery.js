/*
    Carousel pattern initiator followed by the component.
*/
console.log('include gallery');

(function(exports, w, overlay, getCarousel, utils, $, _Hammer, Mod) {

    var doc = w.document;

    function getPaneView(img, data) {
        var $li = $('<li/>'),
            $img = $(img);

        $li.append($img);

        // add potential text
        if (data.text) {
            var $child = $('<div>' + data.text + '</div>').addClass('text');
            $li.append($child);
        }

        return $li;
    }

    exports.gallery = function(element, data) {
        var $elem = $(element),
            $panel = $elem.closest('.panel'),
            panelId = $panel.attr('id');

        $(element).on('click', function(e) {

            var $overlay,
                $div = $('<div class="carousel"></div>'),
                $loading = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'),
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


}(Pathways.components, window, Pathways.components.core.overlay, Pathways.components.core.carousel.getCarousel, Pathways.utils, jQuery, Hammer, Modernizr));
