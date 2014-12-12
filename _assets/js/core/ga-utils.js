var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};

(function(w, exports, ga, $) {

    var baseSelector = '';
    var attrSelector = '';

    function toggleActiveGA($el, re1, re2) {
        var gaData = $el.data(baseSelector);
        if (!gaData) return;
        var newStr = gaData.replace(re1, re2);
        $el.data(baseSelector, newStr);
    }

    function send(label) {
        console.log(baseSelector + ' click:', label);
        if (label) ga('send', 'event', 'link', 'click', label);
    }

    // Assumes selector will be in form '[data-<val>]'
    function init(selector) {
        attrSelector = selector;
        baseSelector = selector.replace(/\[data-(\w*)\]/, '$1');
        update();
    }

    function update() {
        $(attrSelector).click(function() {
            send($(this).data(baseSelector));
        });
    }

    exports.ga = {
        toggleActiveGA: toggleActiveGA,
        send: send,
        init: init,
        update: update
    };

}(window, Pathways.components.core, ga, jQuery));
