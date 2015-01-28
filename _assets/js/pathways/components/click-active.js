(function(w, exports, ga, $) {

    var repOpen = 'l3 open library',
        repClose = 'l3 close library';

    exports.clickActive = function(element, data) {

        var $element = $(element),
            targetSel = $element.data('click-active-target') || '.info-box',
            $target = $(targetSel);

        $element.on('click', targetSel, function toggleActive(e) {
            $element.toggleClass('active');
            return false;
        });

    };

}(window, Pathways.components, Pathways.components.core.ga, jQuery));
