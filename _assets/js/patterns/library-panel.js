Pathways.components.libraryPanel = function(element, data) {

    function closePanel($panel) {
        $panel.css('transform', 'translate(' + ($panel.outerWidth()) + 'px, ' + ($panel.outerHeight() - 60) + 'px)');
        $panel.removeClass('active');
    }

    function openPanel($panel) {
        $panel.css('transform', 'translate(38px, 38px)');
        $panel.addClass('active');
    }

    $(element).on('click', '.handle', function() {
        var $panel = $(this).parent();

        if ($panel.hasClass('active')) {
            closePanel($panel);
        } else {
            openPanel($panel);

            $(window).one('scroll', function() {
                closePanel($panel);
            });
        }
    });
};
