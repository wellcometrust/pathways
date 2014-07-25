Pathways.Infographic = function() {

    var $svg = $('[data-component="infographic"] svg');

    $svg.on('click', 'circle', function() {
        var $this   = $(this),
            top     = $this.position().top,
            left    = $this.position().left,
            radius  = $this.attr('r'),

            center_x = left + (radius / 2),
            center_y = top + (radius / 2);

        // console.log(top, left);
        $svg.css('transform-origin', center_x + 'px ' + center_y + 'px' );
        $svg.css('transform', 'scale(3, 3)');
    });
}