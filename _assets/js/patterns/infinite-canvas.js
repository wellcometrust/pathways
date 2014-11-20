Pathways.components.infiniteCanvas = function(element, data) {

    $(element).find('.infinite-canvas').each(function() {
        var infiniteCanvas = new InfiniteCanvas(this, data);
        infiniteCanvas.init();
    });

};

function InfiniteCanvas(element, data) {
    var self = this,
        _element = element,
        $element = $(element),

        totalWidth = 0,
        totalHeight = 0,
        totalOffsetX = 0,
        totalOffsetY = 0,

        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;


    this.init = function() {
        var self = this;

        totalWidth = $element.outerWidth();
        totalHeight = $element.outerHeight();

        // center the first text block.
        centerText($('[data-chapter="1"]', $element));

        // prev/next events
        $element.on('click', '.prev, .next', function(e) {
            var $this = $(this),
                $target = $(e.target),
                chapter = $this.parents('.text-panel').data('chapter'),
                $text;

            if ($target.hasClass('prev')) {
                $text = $('[data-chapter="' + (chapter - 1) + '"]', $element);

                if ($text.length) {
                    centerText($text);
                }
            }

            if ($target.hasClass('next')) {
                $text = $('[data-chapter="' + (chapter + 1) + '"]', $element);

                if ($text.length) {
                    centerText($text);
                }
            }

            e.preventDefault();
        });

        window.addEventListener('resize', function() {
            viewportWidth = window.innerWidth,
                viewportHeight = window.innerHeight;
        });

        this.loadImages();
    };

    this.loadImages = function() {
        console.log('running');
        // for now load all the images in the DB
        var images = data,
            length = images.length;

        for (var i = 0; i < length; i++) {
            var $img = $('<img/>').addClass('image-panel');

            $img.attr('src', '/_assets/img/infinite-canvas/infiniteCanvas_' + images[i].id + '.jpg');

            $img.css({
                left: images[i].pos[0],
                top: images[i].pos[1]
            });

            $element.append($img);
        }
    };

    // Try to position the text in the middle of the screen, but also keep the canvas within bounds.
    function centerText($elm) {
        var width = $elm.outerWidth(),
            height = $elm.outerHeight(),
            top = $elm.position().top,
            left = $elm.position().left,

            offsetX = (viewportWidth - width) / 2,
            offsetY = (viewportHeight - height) / 2,

            totalX = (-left + offsetX),
            totalY = (-top + offsetY);

        // Keep within the bounds of the canvas
        if (totalX > 0)
            totalX = 0;

        if (Math.abs(totalX - viewportWidth) > totalWidth) {
            totalX = -(totalWidth - viewportWidth);
        }

        if (totalY > 0)
            totalY = 0;

        if (Math.abs(totalY - viewportHeight) > totalHeight) {
            totalY = -(totalHeight - viewportHeight);
        }

        setContainerOffset(totalX, totalY, true);
        totalOffsetX = totalX;
        totalOffsetY = totalY;
    }

    function setContainerOffset(x, y, animate) {
        $element.removeClass("animate");

        if (animate) {
            $element.addClass("animate");
        }

        if (Modernizr.csstransforms3d)
            $element.css("transform", "translate3d(" + x + "px, " + y + "px ,0)");
        else
            $element.css("transform", "translate(" + x + "px," + y + "px)");
    }

    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch (ev.type) {
            case 'drag':
                setContainerOffset((ev.gesture.deltaX + totalOffsetX), (ev.gesture.deltaY + totalOffsetY));
                break;

            case 'release':
                totalOffsetX += ev.gesture.deltaX;
                totalOffsetY += ev.gesture.deltaY;

                // Drag too far right
                if (totalOffsetX > 0) {
                    setContainerOffset(0, totalOffsetY, true);
                    totalOffsetX = 0;
                }

                // Drag too far left
                if (Math.abs(totalOffsetX - viewportWidth) > totalWidth) {
                    setContainerOffset(-(totalWidth - viewportWidth), totalOffsetY, true);
                    totalOffsetX = -(totalWidth - viewportWidth);
                }

                // Drag too far down
                if (totalOffsetY > 0) {
                    setContainerOffset(totalOffsetX, 0, true);
                    totalOffsetY = 0;
                }

                // Drag too far up
                if (Math.abs(totalOffsetY - viewportHeight) > totalHeight) {
                    setContainerOffset(totalOffsetX, -(totalHeight - viewportHeight), true);
                    totalOffsetY = -(totalHeight - viewportHeight);
                }

                break;
        }
    }

    new Hammer(_element, {}).on("release drag", handleHammer);
}
