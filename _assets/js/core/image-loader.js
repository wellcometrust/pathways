var Pathways = Pathways || {};
Pathways.components = Pathways.components || {};
Pathways.components.core = Pathways.components.core || {};
console.log('include image-loader');

(function(exports, w, $) {

    var defaultBase = '/_assets/img/';

    exports.imageLoader = {
        getImageLoader: function(location, base) {

            base = base || defaultBase;
            location = location || '';

            function loadImages(images, callback) {
                if (images.length) {
                    loadImage(images[0], function(img, data) {

                        if (callback) callback.call(null, img, data);

                        images.shift();

                        loadImages(images, callback);
                    });
                }
            }

            function loadImage(data, callback) {
                var img = new Image();

                img.src = base + location + data.image + '.jpg';

                img.onload = function(e) {

                    if (callback) callback.call(self, this, data);
                };
            }

            return {
                loadImages: function(datalist, callback) {
                    datalistCopy = [].concat(datalist);
                    loadImages(datalistCopy, callback);
                },
                loadImage: loadImage
            };

        }
    };



}(Pathways.components.core, window, jQuery));
