(function(exports, utils, $) {

    var baseSelector = 'preload-link';
    var attrSelector = '[data-preload-link]';
    var links = [];


    // Assumes selector will be in form '[data-<val>]'
    function init(selector) {
        console.log('initing preloader');
        attrSelector = selector || attrSelector;
        baseSelector = attrSelector.replace(/\[data-(\w*)\]/, '$1');
        links = $(selector).map(function() {
            return $(this).attr('href');
        }).get();
        links = utils.unique([], links);
    }

    function _load() {
        links.forEach(function(link) {
            var $i = $('<iframe class="preloader"></iframe>');
            $i.css({
                'width': '1px',
                'height': '1px',
                'position': 'absolute',
                'top': '-100px',
            });
            $('body').append($i);
            $i.attr('src', link);
        });
    }

    function load(delay) {
        delay = delay || 10;
        setTimeout(_load, delay);
    }

    exports.preloader = {
        init: init,
        load: load
    };

}(Pathways, Pathways.utils, jQuery));
