
Pathways.InfiniteCanvas = function() {
    
    $('.infinite-canvas').each(function() {
        var infiniteCanvas = new InfiniteCanvas( this );
        infiniteCanvas.init();
    })
}

function InfiniteCanvas(element) {
    var self            = this,
        _element        = element,
        $element        = $(element),

        totalWidth      = 0,
        totalHeight     = 0,
        totalOffsetX    = 0,
        totalOffsetY    = 0,

        viewportWidth   = window.innerWidth,
        viewportHeight  = window.innerHeight;


    this.init = function() {
        totalWidth  = $element.outerWidth();
        totalHeight = $element.outerHeight();

        // center the canvas
        totalOffsetX = (viewportWidth - totalWidth) / 2;
        totalOffsetY = (viewportHeight - totalHeight) / 2;

        setContainerOffset( totalOffsetX, totalOffsetY );
    }

    function setContainerOffset(x, y, animate) {
        $element.removeClass("animate");

        if(animate) {
            $element.addClass("animate");
        }

        if( Modernizr.csstransforms3d )
            $element.css("transform", "translate3d("+ x +"px, "+ y +"px ,0)");
        else
            $element.css("transform", "translate("+ x +"px,"+ y +"px)");
    }

    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch(ev.type) {
            case 'dragright':
            case 'dragleft':
                setContainerOffset( (ev.gesture.deltaX + totalOffsetX), (ev.gesture.deltaY + totalOffsetY) );
                break;

            case 'release':
                totalOffsetX += ev.gesture.deltaX;
                totalOffsetY += ev.gesture.deltaY;

                console.log( (totalOffsetX - viewportWidth), totalWidth );

                // Drag too far right
                if( totalOffsetX > 0 ) {
                    setContainerOffset(0, totalOffsetY, true);
                    totalOffsetX = 0;
                }

                // Drag too far left
                if( Math.abs(totalOffsetX - viewportWidth) > totalWidth ) {
                    setContainerOffset(-(totalWidth - viewportWidth), totalOffsetY, true);
                    totalOffsetX = -(totalWidth - viewportWidth);
                }

                // Drag too far down
                if( totalOffsetY > 0 ) {
                    setContainerOffset(totalOffsetX, 0, true);
                    totalOffsetY = 0;
                }

                // Drag too far up
                if( (totalOffsetX - viewportHeight) > totalHeight ) {
                    setContainerOffset(totalOffsetX, -(totalHeight - viewportHeight), true);
                    totalOffsetY = -(totalHeight - viewportHeight);
                }


                break;
        }
    }

    new Hammer(_element, {}).on("release dragleft dragright", handleHammer);
}