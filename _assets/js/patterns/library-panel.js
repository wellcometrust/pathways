Pathways.components.libraryPanel = function(element, data) {
    var reO = /l2 share open/g,
        reC = /l2 share close/g,
        repO = 'l2 share open',
        repC = 'l2 share close';

    function closePanel($panel) {
        $panel.css('transform', 'translate(' + ($panel.outerWidth()) + 'px, ' + ($panel.outerHeight() - 60) + 'px)');
        $panel.removeClass('active');
    }

    function openPanel($panel) {
        $panel.css('transform', 'translate(38px, 38px)');
        $panel.addClass('active');
    }

    function toggleActiveGA($el, str, re1, re2) {
        var newstr2 = str.replace(re1, re2);
        $el.data('ga', newstr2);
    }

    $(element).on('click', '.handle', function() {
        var $this = $(this);
        var $panel = $this.parent();
        var gaData = $this.data('ga');
        //console.log(gaData);

        if ($panel.hasClass('active')) {
            closePanel($panel);
            toggleActiveGA($this, gaData, reC, repO);

        } else {
            openPanel($panel);
            $(window).one('scroll', function() {
                closePanel($panel);
                toggleActiveGA($this, gaData, reC, repO);
            });
            toggleActiveGA($this, gaData, reO, repC);
        }
    });
};
