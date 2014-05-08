(function(window) {

    'use strict';

    var Pathways = function(options) {
        var Pathways    = this,
            lastScrollY = 0,
            ticking     = false,

            supports_touch = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch),

            renderQueue = [],
            scrollQueue = [];

        /************************
            Private functions
        *************************/

        var init = function() {
            window.addEventListener('scroll', onScroll);
        }

        var onScroll = function() {
            lastScrollY = window.scrollY;
            requestTick();
        }

        var requestTick = function() {
            if(!ticking) {
                requestAnimationFrame(Pathways.render);
                ticking = true;
            }
        }

        /************************
            Public functions
        *************************/

        this.addRender = function(func) {
            this.renderQueue.push(func);
        }

        this.addScroll = function(func) {
            this.scrollQueue.push(func);
        }

        this.render = function() {

            ticking = false;
        }

        init();
        return Pathways;
    }

    window.Pathways = Pathways;
})(window);