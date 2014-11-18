Pathways.components.toggleSection = function(element, data) {

	var $element			= $(element),
		$target             = $($element.attr('data-toggle-section-target')),
		$scrollAnchor       = $($element.attr('data-toggle-section-anchor')),
        height              = $target.height();

    $target.css({ 'height': 0, 'transition': 'height 0.4s ease' });

    $element.on('click', function toggleOpen() {

    	$target.toggleClass('open');

    	if($target.hasClass('open')) {
    		$target.css('height', height);

    		$('html, body').animate({
                scrollTop: $scrollAnchor.offset().top - 100
            }, 400);
    	} else {
    		$target.css('height', 0);
    	}

        return false;
    });

};
