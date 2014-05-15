
Pathways.GlobalNavigation = function() {
    var $nav_container  = document.querySelector('.global-navigation .container'),
        $nav_handle     = document.querySelector('.global-navigation .handle');

    $nav_handle.addEventListener('click', function() {
        if( $nav_container.classList.contains('active') )
            $nav_container.classList.remove('active');
        else
            $nav_container.classList.add('active');
    });
}
