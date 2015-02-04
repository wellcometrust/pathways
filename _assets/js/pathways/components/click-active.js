(function(components, ga, $) {

    var activeClass = 'active';

    components.create('click-active', function(element, data) {

        var $element = $(element),
            targetSel = $element.data('click-active-target') || '.info-box';

        $element.on('click', targetSel, function toggleActive(e) {
            $element.toggleClass(activeClass);
            return false;
        });

    });

}(Pathways.components, Pathways.core.ga, jQuery));
