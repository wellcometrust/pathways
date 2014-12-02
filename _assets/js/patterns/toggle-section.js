(function(w, exports, ga, $) {

    var reO = /l3 open library/g,
        reC = /l3 close library/g,
        repO = 'l3 open library',
        repC = 'l3 close library';

    exports.toggleSection = function(element, data) {

        var $element = $(element),
            targetSel = $element.attr('data-toggle-section-target'),
            $target = $(targetSel),
            $scrollAnchor = $($element.attr('data-toggle-section-anchor')),
            $related = $('[data-toggle-section-target="'+targetSel+'"]'),
            height = $target.height();

        $target.css({
            'height': 0,
            'transition': 'height 0.4s ease'
        });

        $element.on('click', function toggleOpen() {

            if (!$target.hasClass('open')) {
                $target.css('height', height);

                $('html, body').animate({
                    scrollTop: $scrollAnchor.offset().top - 100
                }, 400);
                ga.toggleActiveGA($related, reO, repC);

            } else {
                $target.css('height', 0);
                ga.toggleActiveGA($related, reC, repO);
            }

            $target.toggleClass('open');

            return false;
        });

    };

}(window, Pathways.components, Pathways.components.core.ga, jQuery));
