
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
        var self = this;

        totalWidth  = $element.outerWidth();
        totalHeight = $element.outerHeight();

        // center the first text block.
        centerText( $('[data-chapter="1"]', $element) );

        // prev/next events
        $element.on('click', '.prev, .next', function(e) {
            var $this   = $(this),
                $target = $(e.target),
                chapter = $this.parents('.text-panel').data('chapter');

            if( $target.hasClass('prev') ) {
                var $text = $('[data-chapter="'+(chapter - 1)+'"]', $element);

                if( $text.length ) {
                    centerText($text);
                }
            }

            if( $target.hasClass('next') ) {
                var $text = $('[data-chapter="'+(chapter + 1)+'"]', $element);

                if( $text.length ) {
                    centerText($text);
                }
            }

            e.preventDefault();
        });

        window.addEventListener('resize', function() {
            viewportWidth   = window.innerWidth,
            viewportHeight  = window.innerHeight;
        });

        this.loadImages();
    }

    this.loadImages = function() {
        console.log('running');
        // for now load all the images in the DB
        var images = canvasDB,
            length = images.length;

        for (var i = 0; i < length; i++) {
            var $img = $('<img/>').addClass('image-panel');

            $img.attr( 'src', '/_assets/img/infinite-canvas/infiniteCanvas_'+images[i].id+'.jpg' );

            $img.css({
                left: images[i].pos[0],
                top: images[i].pos[1]
            });

            $element.append($img);
        };
    }

    // Try to position the text in the middle of the screen, but also keep the canvas within bounds.
    function centerText($elm) {
        var width   = $elm.outerWidth(),
            height  = $elm.outerHeight(),
            top     = $elm.position().top,
            left    = $elm.position().left,

            offsetX = (viewportWidth - width) / 2,
            offsetY = (viewportHeight - height) / 2,

            totalX = (-left + offsetX),
            totalY = (-top + offsetY);

        // Keep within the bounds of the canvas
        if( totalX > 0 )
            totalX = 0;

        if( Math.abs(totalX - viewportWidth) > totalWidth ) {
            totalX = -(totalWidth - viewportWidth);
        }

        if( totalY > 0 )
            totalY = 0;

        if( Math.abs(totalY - viewportHeight) > totalHeight ) {
            totalY = -(totalHeight - viewportHeight);
        }

        setContainerOffset(totalX, totalY, true);
        totalOffsetX = totalX;
        totalOffsetY = totalY;
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
            case 'drag':
                setContainerOffset( (ev.gesture.deltaX + totalOffsetX), (ev.gesture.deltaY + totalOffsetY) );
                break;

            case 'release':
                totalOffsetX += ev.gesture.deltaX;
                totalOffsetY += ev.gesture.deltaY;

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
                if( Math.abs(totalOffsetY - viewportHeight) > totalHeight ) {
                    setContainerOffset(totalOffsetX, -(totalHeight - viewportHeight), true);
                    totalOffsetY = -(totalHeight - viewportHeight);
                }

                break;
        }
    }

    new Hammer(_element, {}).on("release drag", handleHammer);
}

var canvasDB = [
    { id: '03', pos: [1220,35] },
    { id: '05', pos: [1648,35] },
    { id: '07', pos: [2075,35] },
    { id: '09', pos: [2397,35] },
    { id: '12', pos: [4083,37] },
    { id: '15', pos: [3235,38] },
    { id: '18', pos: [66,52] },
    { id: '21', pos: [6704,54] },
    { id: '24', pos: [5455,68] },
    { id: '27', pos: [773,113] },
    { id: '30', pos: [7418,163] },
    { id: '33', pos: [2765,165] },
    { id: '36', pos: [3704,231] },
    { id: '39', pos: [5913,275] },
    { id: '43', pos: [4836,294] },
    { id: '46', pos: [1220,366] },
    { id: '49', pos: [6704,446] },
    { id: '54', pos: [773,486] },
    { id: '56', pos: [3387,511] },
    { id: '58', pos: [2765,512] },
    { id: '63', pos: [4083,546] },
    { id: '66', pos: [2311,575] },
    { id: '69', pos: [2098,576] },
    { id: '72', pos: [66,670] },
    { id: '79', pos: [4811,758] },
    { id: '81', pos: [5359,758] },
    { id: '83', pos: [3387,790] },
    { id: '89', pos: [2094,870] },
    { id: '93', pos: [6704,930] },
    { id: '96', pos: [773,1078] },
    { id: '99', pos: [4083,1271] },
    { id: '101', pos: [228,1300] },
    { id: '104', pos: [2765,1372] },
    { id: '107', pos: [5902,1414] },
    { id: '109', pos: [6192,1414] },
    { id: '111', pos: [6927,1414] },
    { id: '113', pos: [7420,1414] },
    { id: '116', pos: [1266,1527] },
    { id: '118', pos: [1636,1527] },
    { id: '123', pos: [805,1608] },
    { id: '127', pos: [4809,1628] },
    { id: '130', pos: [5230,1659] },
    { id: '133', pos: [6927,1746] },
    { id: '141', pos: [1265,1816] },
    { id: '144', pos: [1995,1816] },
    { id: '147', pos: [4324,1816] },
    { id: '149', pos: [5902,1845] },
    { id: '151', pos: [6286,1845] },
    { id: '154', pos: [6668,1846] },
    { id: '156', pos: [1629,1852] },
    { id: '159', pos: [7420,1903] },
    { id: '161', pos: [805,1998] },
    { id: '168', pos: [5406,2101] },
    { id: '170', pos: [6286,2101] },
    { id: '171', pos: [6927,2114] },
    { id: '172', pos: [1265,2126] },
    { id: '175', pos: [315,2135] },
    { id: '178', pos: [4984,2178] },
    { id: '183', pos: [4226,2212] },
    { id: '192', pos: [5902,2371] },
    { id: '194', pos: [6414,2371] },
    { id: '196', pos: [805,2388] },
    { id: '199', pos: [1729,2389] },
    { id: '201', pos: [2164,2389] },
    { id: '203', pos: [2875,2389] },
    { id: '207', pos: [7420,2451] },
    { id: '210', pos: [4982,2455] },
    { id: '211', pos: [3387,2480] },
    { id: '213', pos: [3707,2480] },
    { id: '216', pos: [6414,2692] },
    { id: '219', pos: [4226,2726] },
    { id: '221', pos: [4674,2726] },
    { id: '223', pos: [5406,2741] },
    { id: '227', pos: [6927,2876] },
    { id: '233', pos: [2164,2914] },
    { id: '235', pos: [2571,2914] },
    { id: '237', pos: [147,2944] },
    { id: '240', pos: [1801,2944] },
    { id: '245', pos: [4991,2997] },
    { id: '251', pos: [5409,3114] },
    { id: '255', pos: [4674,3140] },
    { id: '257', pos: [2164,3172] },
    { id: '260', pos: [3632,3177] },
    { id: '268', pos: [2550,3345] },
    { id: '270', pos: [2949,3345] },
    { id: '272', pos: [1801,3377] },
    { id: '276', pos: [4226,3424] },
    { id: '279', pos: [7079,3429] },
    { id: '281', pos: [7396,3429] },
    { id: '283', pos: [270,3461] },
    { id: '285', pos: [533,3461] },
    { id: '289', pos: [4990,3537] },
    { id: '291', pos: [2550,3618] },
    { id: '293', pos: [941,3653] },
    { id: '296', pos: [6006,3705] },
    { id: '298', pos: [6333,3705] },
    { id: '303', pos: [119,3818] },
    { id: '306', pos: [7079,3876] },
]
