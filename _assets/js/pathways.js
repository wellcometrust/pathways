(function(window) {

    'use strict';

    var Pathways = function(options) {
        var Pathways = this,

            supports_touch = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);

        /************************
            Private functions
        *************************/

        var init = function() {
            loadComponents();

            if( !supports_touch )
                window.Pathways.LoadScenes();
        }

        var loadComponents = function() {
            $('[data-component]').each(function(){
                var handler = $(this).attr('data-component');

                if ( handler ) {
                    var handlerClass = toTitleCase(handler);

                    if ( window.Pathways[handlerClass] != null ) {
                        window.Pathways[handlerClass]();
                    }
                }
            });
        }

        var toTitleCase = function(str){
            str = str.replace('-',' ').replace('_',' ');
            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
            return str.replace(/\W/g,'');
        }

        /************************
            Public functions
        *************************/

        init();
        return Pathways;
    }

    window.Pathways = Pathways;
})(window);

