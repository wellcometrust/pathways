
Pathways.Modal = function() {

    $('.modal').on('click', function() {
        var modal = new Modal( $(this) );
        modal.init();
    });

}

function Modal(elm) {

    var self = this,
        $elm = elm,
        $overlay,
        $image_crop,
        $close;

    this.init = function() {
        var img         = new Image(),
            $overlay    = $('<div class="overlay"></div>'),
            $image_crop = $(img).css('opacity', 0),
            $close      = $('<div class="close"></div>');

        img.src = "http://placekitten.com/640/800";

        img.onload = function() {

            var width   = this.width,
                height  = this.height,

                top     = (window.innerHeight / 2) - (height / 2),
                left    = (window.innerWidth / 2) - (width / 2);

            $image_crop.css({ position: 'absolute', top: top, left: left });

            $overlay.append( $image_crop );
            $image_crop.animate({'opacity': 1}, 500);
        }

        $overlay.append( $close );
        $('body').append( $overlay );

        //
        $overlay.css( {
            'height':           window.outerHeight,
            'background-color': 'rgba(0,0,0,0.9)'
        });

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            setTimeout(function() {
                $overlay.remove();
            }, 600);
        });
    }
}
