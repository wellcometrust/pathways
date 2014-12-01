var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};

(function(w, exports, utils, $) {

    function toggleActiveGA($el, re1, re2) {
        var gaData = $el.data('ga');
        if (!gaData) return;
        var newStr = gaData.replace(re1, re2);
        $el.data('ga', newStr);
    }

    exports.gaState = {
        toggleActiveGA: toggleActiveGA
    };

}(window, Pathways.components.core, Pathways.utils, jQuery));
