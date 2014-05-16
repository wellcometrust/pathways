
Pathways.AudioPlayer = function() {
    var _player     = _('.audio-player'),
        playing     = false;

    $('.audio-icon').on('click', function() {
        if( playing ) {
            _player.pause();
            $('.audio-icon').removeClass('active');
            playing = false;
        }
        else {
            _player.play();
            $('.audio-icon').addClass('active');
            playing = true;
        }
    });
}