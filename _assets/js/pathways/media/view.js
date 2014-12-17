console.log('include media/view');
/***
 *   Audio: mute view
 */
(function(exports, ctrl, $) {

    var $muteButton;

    function create(muteSelector) {
        var $btn = $(muteSelector);
        $btn.css('display', 'block');
        $btn.off('click');
        $btn.on('click', function(e) {
            // active == muted
            if ($(this).hasClass('active')) {
                ctrl.mute(false);
            } else {
                ctrl.mute(true);
            }

            update();

            e.preventDefault();
            return false;
        });

        return $btn;
    }

    function init() {
        $muteButton = create('.mute');
        update();
    }

    function update() {
        if (ctrl.isMuted()) {
            $muteButton.addClass('active');
        } else {
            $muteButton.removeClass('active');
        }
    }

    function hide() {
        $muteButton.hide();
    }

    exports.view = {
        init: init,
        hide: hide,
        update: update
    };

}(Pathways.media, Pathways.media.ctrl, jQuery));
