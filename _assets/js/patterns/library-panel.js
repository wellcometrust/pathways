(function(w, exports, ga, $) {

    var reO = /l2 open share/g,
        reC = /l2 close share/g,
        repO = 'l2 open share',
        repC = 'l2 close share';

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
                ga.toggleActiveGA($this, reC, repO);

            } else {
                openPanel($panel);
                $(window).one('scroll', function() {
                    closePanel($panel);
                    ga.toggleActiveGA($this, reC, repO);
                });
                ga.toggleActiveGA($this, reO, repC);
            }
        });
    };

}(window, Pathways.components, Pathways.components.core.ga, jQuery));
