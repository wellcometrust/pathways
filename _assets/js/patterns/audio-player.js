
Pathways.AudioPlayer = function(elem) {
    var self            = this,
        $player         = $('.audio-player'),
        $progress_bar   = $player.find('.progressed'),
        $time_left      = $player.find('.time-left span'),
        playing         = false;

    var src     = $player.data('src'),
        track   = new Audio(src);

    $player.on('click', '.controls', function() {
        if( playing ) {
            track.pause();
            $(this).removeClass('active');
            playing = false;
        }
        else {
            track.play();
            $(this).addClass('active');
            playing = true;
        }
    });

    track.addEventListener('timeupdate', function () {
        var remaining = parseInt(track.duration - track.currentTime);
        
        $progress_bar.css('width', (track.currentTime * (100 / track.duration) + '%' ));
        $time_left.html( self.secondsToMinutes(remaining) );
    });

    this.secondsToMinutes = function(seconds) {
        var mins        = Math.floor( seconds / 60 ),
            remainder   = seconds % 60;

        if( remainder < 10 )
            remainder = '0' + remainder;

        return mins + '.' + remainder;
    }
}