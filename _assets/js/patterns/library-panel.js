(function(exports, w, ga, $) {

    var repOpen = 'l2 open share',
        repClose = 'l2 close share';

    exports.libraryPanel = function(element, data) {

        function closePanel($panel) {
            $panel.css('transform', 'translate(' + ($panel.outerWidth()) + 'px, ' + ($panel.outerHeight() - 60) + 'px)');
            $panel.removeClass('active');
        }

        function openPanel($panel) {
            $panel.css('transform', 'translate(38px, 38px)');
            $panel.addClass('active');
        }

        $(element).on('click', '.handle', function() {
            var $this = $(this);
            var $panel = $this.parent();

            //console.log(gaData);

            if ($panel.hasClass('active')) {
                closePanel($panel);
                ga.setState($this, repClose, repOpen);

            } else {
                openPanel($panel);
                $(window).one('scroll', function() {
                    closePanel($panel);
                    ga.setState($this, repClose, repOpen);
                });
                ga.setState($this, repOpen, repClose);
            }
        });
    };

}(Pathways.components, window, Pathways.components.core.ga, jQuery));
