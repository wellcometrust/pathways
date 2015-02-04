(function(components, w, ga, $) {

    var repOpen = 'l2 open share',
        repClose = 'l2 close share',
        visibleClass = 'info-panel-open';

    components.create('info-panel', function(element, data) {

        function closePanel($panel) {
            $panel.removeClass(visibleClass);
        }

        function openPanel($panel) {
            $panel.addClass(visibleClass);
        }

        $(element).on('click', '.handle', function() {
            var $this = $(this);
            var $panel = $this.parent();

            //console.log(gaData);

            if ($panel.hasClass(visibleClass)) {
                closePanel($panel);
                ga.setState($this, repClose, repOpen);

            } else {
                openPanel($panel);
                $(w).one('scroll', function() {
                    closePanel($panel);
                    ga.setState($this, repClose, repOpen);
                });
                ga.setState($this, repOpen, repClose);
            }
        });
    });

}(Pathways.components, window, Pathways.core.ga, jQuery));
