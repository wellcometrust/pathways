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
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;
        });

        this.loadImages();
    };

    this.loadImages = function() {

        var length = data.length,
            items = [],
            $item, $img, $box, $txt;

        for (var i = 0; i < length; i++) {

            $item = $('<div/>').addClass('image-panel');

            $img = $('<img/>');
            $img.attr('src', '/_assets/img/infinite-canvas/infiniteCanvas_' + data[i].id + '.jpg');

            $svg = $('<svg class="info-box" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 70px; height: 70px;">'+
                        '<circle class="outer" cx="50%" cy="50%" r="30" fill="rgb(92,184,178)"></circle>'+
                        '<circle class="inner" cx="50%" cy="50%" r="20" fill="#fff"></circle>'+
                    '</svg>');

            $box = $('<div/>').addClass('text');
            $txt = $('<p/>').text(data[i].text);

            $box.append($txt);

            $item.append($img)
                .append($box)
                .append($svg)
                .css({
                    left: data[i].pos[0],
                    top: data[i].pos[1]
                });
            items.push($item);
        }

        $element.append(items);

        $('.infinite-canvas .image-panel .info-box').on('click', function(e) {
            $(this).parent().toggleClass('active');
        });
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
