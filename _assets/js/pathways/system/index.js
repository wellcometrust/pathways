/***
 *   System capabilities
 */
console.log('include system/index');
(function(exports, w, $, undefined) {

    var capabilities = {
        aspectRatio: 1900 / 1050,
        supportsTouch: false,
        innerHeight: 0,
        innerWidth: 0,
        orientation: 'landscape',
        level: 0,

        calcSupportsTouch: function() {
            return ('ontouchstart' in w) || (w.DocumentTouch && document instanceof DocumentTouch);
        },
        calcOrientation: function() {
            return (this.innerWidth / this.innerHeight) > 1.2 ? 'landscape' : 'portrait';
        },
        calcAspectRatio: function() {
            return (this.orientation === 'landscape') ? (1900 / 1050) : (1050 / 1900);
        },
        /*
                Do a few checks on screen size and touch abilities to allocate a level to the current device. This will be used to determine
                what gets loaded when.

                Need to further refine the levels.
            */
        getEnhancementLevel: function() {
            // small screen
            var level = 0;

            // small to mid screens
            if (w.innerWidth >= 480)
                level = 1;

            // ~ iPad portrait (mid screens) or Nexus 7 ()
            if (w.innerWidth >= 768 && this.supportsTouch)
                level = 2;

            // ~ Nexus 7 landscape (mid screens)
            if (w.innerWidth >= 960 && this.supportsTouch)
                level = 3;

            // Desktop
            if (w.innerWidth >= 768 && !this.supportsTouch)
                level = 4;


            return level;
        },
        getDisplaySettings: function() {
            this.innerWidth = w.innerWidth;
            this.innerHeight = w.innerHeight;

            this.orientation = this.calcOrientation();
            this.supportsTouch = this.calcSupportsTouch();
            this.level = this.getEnhancementLevel();
        },
        init: function() {
            w.addEventListener('resize', (this.getDisplaySettings).bind(this), false);
        }
    };

    capabilities.getDisplaySettings();
    capabilities.init();

    exports.system = capabilities;

}(Pathways, window, jQuery));
