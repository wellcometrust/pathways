
Pathways.GlobalNavigation = function() {
    var _nav        = _('.global-navigation'),
        _nav_handle = _('.global-navigation .handle');

    _nav_handle.addEventListener('click', function() {
        if( _nav.classList.contains('active') )
            _nav.classList.remove('active');
        else
            _nav.classList.add('active');
    });
}
