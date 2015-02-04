(function(exports, mixer, utils) {

    var unique = utils.unique;

    function MediaDefinition(media, config) {
        this.media = media;
        this.config = config;
    }

    MediaDefinition.prototype = {
        play: function play(channel, config) {
            config = utils.extend({}, this.config, config);
            var media = this.media,
                fadeDuration = parseInt((config && config.fadeDuration), 10),
                maxConcurrentSounds = parseInt(config.maxConcurrentSounds, 10);

            mixer.fadeIn(media, fadeDuration, config);
            while (channel.length() > maxConcurrentSounds) {
                var head = channel.shift();
                mixer.fadeOut(head.media, fadeDuration, head.config);
            }
        },
        stop: function stop(config) {
            config = utils.extend({}, this.config, config);
            var media = this.media,
                fadeDuration = parseInt((config && config.fadeDuration), 10);

            mixer.fadeOut(media, fadeDuration, config);
        },
        getExcludes: function getExcludes() {
            return this.config.exclude || [];
        }
    };


    function MediaDefinitionList(channel) {
        this.list = [];
        this.channel = channel;
    }
    MediaDefinitionList.prototype = {
        push: function(media, config) {
            var definition = getMediaDefinition(media, config);
            this.list.push(definition);
            // setChannelStateOnComplete(definition, this);
            return definition;
        },

        remove: function(definition) {
            return utils.removeItemFromArray(definition, this.list);
        },
        removeAll: function() {
            var defs = [].concat(this.list);
            this.list = [];
            return defs;
        },
        removeSet: function(defs) {
            defs = [].concat(defs);
            var list = [].concat(this.list),
                removed = [];

            defs.forEach(function(def) {
                var l = utils.removeItemFromArray(def, list);
                if (l) removed.push(l);
            });
            this.list = list;
            return removed;
        },
        removeByMedia: function(media) {
            return this.removeSet(this.getByMedia(media));
        },

        getAll: function() {
            return [].concat(this.list);
        },
        shift: function() {
            return this.list.shift();
        },
        getByMedia: function(media) {
            var mediaList = [].concat(media),
                mediaDefs = this.list;

            return mediaList.map(function(medium) {
                return mediaDefs.filter(function(def) {
                    return def.media === medium;
                })[0];
            }) || [];
        },

        isEmpty: function() {
            return this.list.length === 0;
        },
        length: function() {
            return this.list.length;
        },

        getExcludes: function getExcludes() {
            var arr = this.list;
            var ret = arr.map(function(def) {
                return def.getExcludes();
            }).reduce(function(lastExclude, currExclude) {
                return unique(lastExclude, currExclude);
            }, []);
            console.log('ret', ret);
            return ret;
        }

    };

    function getMediaDefinition(media, config) {
        return new MediaDefinition(media, config);
    }

    exports.MediaDefinition = MediaDefinition;
    exports.getMediaDefinition = getMediaDefinition;

    exports.MediaDefinitionList = MediaDefinitionList;
    exports.getMediaDefinitionList = function() {
        return new MediaDefinitionList();
    };


}(Pathways.media, Pathways.media.mixer, Pathways.utils));
