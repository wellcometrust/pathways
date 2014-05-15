
Pathways.LibraryPanel = function() {
    $('.library-panel').on('click', '.handle', function() {
        var $panel = $(this).parent();

        if( $panel.hasClass('active') )
            $panel.removeClass('active');
        else
            $panel.addClass('active');
    })
}
