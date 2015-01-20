console.log('include letter-gallery');

(function(exports, w, getOverlayCtrl, getCarousel, getImageLoader, audioPlayer, utils, $, _Hammer, Mod) {

    function getAudioPlayerTemplate() {
        var $tmpl = $('<div class="audio-player audio-player-gallery">' +
            '<div class="time-left">Time: <span>0:00</span></div>' +
            '<div class="progress-bar">' +
            '<div class="progressed"></div>' +
            '</div>' +
            '<div class="controls"></div>' +
            '</div>');

        return $tmpl;
    }

    function getTemplate() {
        var $tmpl = $('<li><div class="letter-pane clearfix">' +
            '<div class="letter-images">' +
            '<div class="main-image"></div>' +
            '<div class="highlight-image"></div>' +
            '</div>' +
            '<div class="letter-info">' +
            '<div class="audio-player-wrapper clearfix">' +
            '<div class="audio-player"></div>' +
            '<div class="highlight-button"></div>' +
            '</div>' +
            '<div class="letter-text"></div>' +
            '</div>' +
            '</div></li>');

        return $tmpl;
    }

    function getPaneCtrlFac(carousel, overlay, imageLoader) {
        var hiddenClass = 'highlight-hidden',
            activeClass = 'highlight-active';

        function _paneCtrlFactory(data, index, onReady) {

            var $pane,
                ratio = 1,
                width = w.innerWidth;


            function loadPlayer(src, $el) {
                if (!src) return;

                var $player = getAudioPlayerTemplate(),
                    playerCtrl = audioPlayer.getAudioPlayer(src, $player);

                carousel.on('setPaneIndex', function(newIndex) {
                    // console.log('setPaneIndex playerCtrl', index, newIndex);
                    if (index === newIndex) playerCtrl.enable(); //TODO: set to start of track on select
                    else {
                        playerCtrl.disable();
                    }
                });

                overlay.on('close', function() {
                    // console.log('close playerCtrl');
                    playerCtrl.disable();
                });

                $el.replaceWith($player);

            }

            function initHighlightImgDiv(img, $el) {
                $el.append($(img));
                $el.addClass('highlight-hidden');
            }

            function initHighlightButton($btn, $text, $img) {
                $btn.addClass('set-highlight');

                $btn.click(function(e) {
                    // console.log('highlight: ', $img);
                    $btn.toggleClass('unset-highlight');

                    if ($img.hasClass(activeClass)) {
                        $img.removeClass(activeClass);
                        $img.addClass('highlight-hidden');
                        // $text.removeClass('letter-text-highlight-active');
                    } else {
                        $img.removeClass('highlight-hidden');
                        $img.addClass(activeClass);
                        // $text.addClass('letter-text-highlight-active');
                    }
                });

            }

            function linkHighlightAndPlayer($controls, $highlightbtn) {
                $controls.click(function(e) {
                    console.log('highlight: ', $controls.attr('class'));

                });
            }

            function getLetterLengthStyle(text) {
                var type = 'long-letter',
                    length = text.length;
               console.log(length);
                switch (true) {
                    case (length < 400):
                        type = 'short-letter';
                        break;
                    case (length < 900):
                        type = 'medium-letter';
                        break;
                    default:
                        type = 'long-letter';
                }
                return type;
            }

            function updatePaneStyle($panediv, $txtdiv, type) {
                $panediv.addClass(type + '-pane');
                $panediv.find('.letter-images').addClass(type + '-images');
                $panediv.find('.letter-info').addClass(type + '-info');
                $txtdiv.addClass(type + '-text');
            }

            function loadComplete() {
                // console.log('pane', index, 'load complete; ', typeof onReady);
                if (typeof onReady === 'function') onReady.call(null, this);
                onReady = null;
                $pane.find('.letter-pane').show();
            }

            return {
                create: function() {

                    // console.log('create', index, data.audio);
                    $tmpl = getTemplate();

                    $pane = $tmpl;
                    $pane.find('.letter-pane');

                    var $panediv = $pane.find('.letter-pane'),
                        $close = $('.overlay .close'),
                        $txtdiv = $tmpl.find('.letter-text'),
                        $mainimgdiv = $tmpl.find('.main-image'),
                        $highlightimgdiv = $tmpl.find('.highlight-image'),
                        $highlightbtndiv = $tmpl.find('.highlight-button'),
                        $playerdiv = $tmpl.find('.audio-player'),
                        highlightImgSrc,

                        onMainImgLoaded = function(img) {
                            $mainimgdiv.append($(img));
                            if (data.audio) {
                                highlightImgSrc = data.image + '-active';
                                imageLoader.loadImage(highlightImgSrc, onHighlightImgLoaded);
                            } else {
                                loadComplete();
                            }
                        },
                        onHighlightImgLoaded = function(img) {
                            initHighlightImgDiv(img, $highlightimgdiv);
                            initHighlightButton($highlightbtndiv, $txtdiv, $highlightimgdiv);
                            loadComplete();
                        };

                    $panediv.hide();

                    $txtdiv.load(data.textSrc, function(loadedHTML) {
                        updatePaneStyle($panediv, $txtdiv, getLetterLengthStyle($(loadedHTML).text()));
                    });
                    imageLoader.loadImage(data.image, onMainImgLoaded);

                    loadPlayer(data.audio, $playerdiv);
                    linkHighlightAndPlayer($playerdiv.find('.controls'), $highlightbtndiv);

                    $close.addClass('close-carousel-letter-gallery');

                    return this;
                },
                setIndex: function(newIndex) {
                    // console.log('setIndex', index, newIndex);
                    // if (newIndex === index) {
                    //     $pane.css('display', 'block');
                    // } else {
                    //     $pane.css('opacity', 0.4);
                    // }
                    return this;
                },
                resize: function() {
                    // console.log('resize', index);
                    width = w.innerWidth;
                    $pane.width(width);
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

    exports.letterGallery = function(element, data) {
        var $elem = $(element),
            $panel = $elem.closest('.panel'),
            panelId = $panel.attr('id'),
            location = data.location;

        $(element).on('click', function(e) {

            var overlay = getOverlayCtrl(),
                $overlay = overlay.$overlay,
                $div = $('<div class="carousel carousel-letter-gallery"></div>'),
                $loading = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'),
                carousel = getCarousel($div, data),
                imageLoader = getImageLoader(location),
                paneCtrlFactory = getPaneCtrlFac(carousel, overlay, imageLoader);

            carousel.setFactory(paneCtrlFactory);

            $loading.css({
                position: 'absolute',
                top: ((w.innerHeight / 2) - 12),
                left: ((w.innerWidth / 2) - 35)
            });


            $overlay.append($div);
            $overlay.append($loading);

            overlay.on('init', function() {
                carousel.init();
            });

        });

    };


}(Pathways.components, window, Pathways.components.core.overlay.getCtrl, Pathways.components.core.carousel.getCarousel, Pathways.components.core.imageLoader.getImageLoader, Pathways.components.core.audioPlayer, Pathways.utils, jQuery, Hammer, Modernizr));
