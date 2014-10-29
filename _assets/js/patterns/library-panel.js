
Pathways.LibraryPanel = function() {
    $('.library-panel').on('click', '.handle', function() {
        var $self   = $(this),
            $panel  = $self.parent();

        if( $panel.hasClass('active') ) {
            $panel.css('transform', 'translate('+ ($panel.outerWidth()) +'px, '+ ($panel.outerHeight() - 60) +'px)');
            $panel.removeClass('active');
        }
        else {
            $panel.css('transform', 'translate(38px, 38px)');
            $panel.addClass('active');

            $(window).one('scroll', function() {
                $self.trigger('click');
            });
        }
    })
}
