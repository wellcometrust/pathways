
Pathways.Scene.DukeOfBuckingham = function(panelID) {

    var startY;

    var scene = new ScrollScene({
            triggerElement: panelID,
            triggerHook:    'top',
            duration:       Pathways.panelHeight,
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                startY = window.scrollY;
            else
                startY = window.scrollY - (Pathways.panelHeight - 100);
        })
        .on('progress', function(e) {
            $('.pence').css('transform', 'translate(0, '+ (window.scrollY - startY) +'px)');
        });

    // Keep the clipping mask the correct height in relation to the 'cover' background.
    var ratio = 1900 / 1050,
        $clip = $('#duke-of-buckingham .clip');

    function resizeClip() {
        if( (window.innerWidth / window.innerHeight) > ratio ) {
            var newHeight   = window.innerWidth / ratio,
                percent     = (newHeight / 100) * 87,
                difference  = newHeight - window.innerHeight;

            // console.log(newHeight, window.innerHeight, difference);

            $clip.css( { 'height': percent, 'transform': 'translate(0, '+ -difference +'px)' } );
        }
        else
            $clip.css('height', '87%');
    }

    resizeClip();

    window.addEventListener('resize', function() {
        resizeClip();
    });

    return scene;
};
