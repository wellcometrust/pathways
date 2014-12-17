
Pathways.components.audioPlayer = function(element, data) {
    console.log('initing');

    var self            = this,
        $player         = $(element),
        $progress_bar   = $player.find('.progressed'),
        $time_left      = $player.find('.time-left span'),
        playing         = false,

        src             = $player.data('src'),
        track           = new Audio(src);
        track.loop      = false;

    function secondsToMinutes (seconds) {
        var mins        = Math.floor( seconds / 60 ),
            remainder   = seconds % 60;

        if( remainder < 10 )
            remainder = '0' + remainder;

        return mins + ':' + remainder;
    }

    function onTimeUpdate (e) {
        console.log(e, e.currentTarget, e.currentTarget === this, this.duration, this.currentTime);
        var duration = (this.duration === Infinity || isNaN(this.duration)) ? 600 : this.duration,
            currentTime = this.currentTime,
            remaining = parseInt((duration - currentTime), 10);

        console.log(this, remaining);
        $progress_bar.css('width', (currentTime * (100 / duration) + '%' ));
        $time_left.html( secondsToMinutes(remaining) );
    }

    $player.on('click', '.controls', function() {

        track.addEventListener('timeupdate', onTimeUpdate);

        if( playing ) {
            track.pause();
            track.removeEventListener('timeupdate', onTimeUpdate);
            $(this).removeClass('active');
            playing = false;
        }
        else {
            track.play();

            $(this).addClass('active');
            playing = true;
        }
    });



};
