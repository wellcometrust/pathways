(function(exports, w, $) {

    var defaultBase = '';

    exports.imageLoader = {
        getImageLoader: function(location, base) {

            base = base || defaultBase;
            location = location || '';
            var imageData,
                imageSrc;

            function loadImages(images, callback) {
                if (images.length) {
                    imageData = images[0];
                    imageSrc = imageData.image;
                    loadImage(imageSrc, function(img, data) {

                        if (callback) callback.call(null, img, data);

                        images.shift();

                        loadImages(images, callback);
                    }, imageData);
                }
            }

            function loadImage(src, callback, data) {
                var img = new Image();

                img.src = base + location + src + '.jpg';

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
