(function(components, ga, $) {

    var repOpen = 'l3 open library',
        repClose = 'l3 close library';

    components.create('click-active', function(element, data) {

        var $element = $(element),
            targetSel = $element.data('click-active-target') || '.info-box',
            $target = $(targetSel);

        $element.on('click', targetSel, function toggleActive(e) {
            $element.toggleClass('active');
            return false;
        });

    });

}(Pathways.components, Pathways.core.ga, jQuery));
