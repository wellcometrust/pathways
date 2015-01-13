/*
    Carousel pattern initiator followed by the component.
*/
console.log('include gallery');

(function(exports, w, overlay, getCarousel, getImageLoader, utils, $, _Hammer, Mod) {

    var doc = w.document;

    function getPaneCtrlFactory(imageLoader) {
        function _paneCtrlFactory(data, index, onReady) {

            var $pane,
                ratio = 1,
                width = w.innerWidth;

            function onImageLoad(img) {
                ratio = img.naturalHeight / img.naturalWidth;

                updateWidth();
                $pane.append($(img));

                // add potential text
                if (data.text) {
                    var $child = $('<div>' + data.text + '</div>').addClass('text');
                    $pane.append($child);
                }

                if (typeof onReady === 'function') onReady.call(null, this);
            }

            function updateWidth() {
                width = parseInt((w.innerHeight / ratio), 10);
                if (width >= w.innerWidth) width = w.innerWidth;
                $pane.width(width);
            }

            return {
                create: function() {
                    // console.log('create', index);
                    $pane = $('<li/>');
                    imageLoader.loadImage(data.image, onImageLoad);
                    return this;
                },
                setIndex: function(newIndex) {
                    // console.log('setIndex', index, newIndex);
                    if (newIndex === index) {
                        $pane.css('opacity', 1);
                    } else {
                        $pane.css('opacity', 0.4);
                    }
                    return this;
                },
                resize: function() {
                    console.log('resize', index);

                    updateWidth();

                    if (width >= w.innerWidth) {
                        $pane.removeClass('full-height');
                        $pane.addClass('full-width');
                    } else {
                        $pane.removeClass('full-width');
                        $pane.addClass('full-height');
                    }

                    return this;
                },
                getPane: function() {
                    return $pane;
                },
                getWidth: function() {
                    return width;
                }
            };

        }

        return _paneCtrlFactory;
    }

    exports.gallery = function(element, data) {
        var $elem = $(element),
            $panel = $elem.closest('.panel'),
            panelId = $panel.attr('id'),
            location = data.location;

        $(element).on('click', function(e) {

            var $overlay,
                $div = $('<div class="carousel carousel-gallery"></div>'),
                $loading = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'),
                imageLoader = getImageLoader(location),
                paneCtrlFac = getPaneCtrlFactory(imageLoader),
                carousel = getCarousel($div, data, paneCtrlFac);

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


}(Pathways.components, window, Pathways.components.core.overlay, Pathways.components.core.carousel.getCarousel, Pathways.components.core.imageLoader.getImageLoader, Pathways.utils, jQuery, Hammer, Modernizr));
