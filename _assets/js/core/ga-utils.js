var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};

(function(w, exports, $) {

    function toggleActiveGA($el, re1, re2) {
        var gaData = $el.data('ga');
        if (!gaData) return;
        var newStr = gaData.replace(re1, re2);
        $el.data('ga', newStr);
    }

    exports.ga = {
        toggleActiveGA: toggleActiveGA
    };

}(window, Pathways.components.core, jQuery));
