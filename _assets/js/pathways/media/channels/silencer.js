(function(exports, utils) {

    function getExcludesFromDefs(defs) {
        return [].concat(defs).map(function(def) {
            return def.config.exclude || [];
        }).reduce(function(lastExclude, currExclude) {
            return utils.unique(lastExclude, currExclude);
        }, []);
    }

    function getSilenceesById(silencees, ids) {
        return ids.map(function mapId (id) {
            return [].concat(silencees).filter(function(silencee){
                return silencee.id === id;
            }).pop();
        });
    }

    function getSilenceesByDefs(silencees, defList) {
        return getSilenceesById(silencees, getExcludesFromDefs(defList));
    }

    function removeSilenceeSet(list, set, silencer) {
        set.forEach(function removeSilencee(item) {
            utils.removeItemFromArray(item, list);
            item.removeSilencer(silencer);
        });
    }

    function SilenceCtrl(channel) {

        this.silencers = [];
        this.silencees = [];
        this.channel = channel;
        this.id = this.channel.id;
    }

    SilenceCtrl.prototype = {

        addSilencer: function addSilencer(silencer) {
            this.silencers.push(silencer);
            if (!this.hasNoSilencers()) {
                this.channel.silence();
            }
        },

        removeSilencer: function removeSilencer(silencer) {
            utils.removeItemFromArray(silencer, this.silencers);
            if (this.hasNoSilencers()) {
                this.channel.resume();
            }
        },

        hasNoSilencers: function hasNoSilencers(channelID) {
            if (this.silencers.length === 0) return true;
            return false;
        },

        addSilencee: function addSilencee(silencee) {
            this.silencees.push(silencee);
            silencee.addSilencer(this);
        },

        removeSilencee: function removeSilencee(silencee) {
            var set = [].concat(silencee);
            removeSilenceeSet(this.silencees, set, this);
        },

        removeSilenceesByDefs: function removeSilenceesByDefs(defList) {
            defList = [].concat(defList);
            var set = getSilenceesByDefs(this.silencees, defList);
            if (set.length === 0) return;
            removeSilenceeSet(this.silencees, set, this);
        },

        toString: function toString () {
            return '[' + this.id + '] ' + this.silencers;
        }
    };


    exports.silencer = {
        SilenceCtrl: SilenceCtrl,
        getSilenceCtrl: getSilenceCtrl = function(id, config) {
            return new SilenceCtrl(id, config);
        }
    };


}(Pathways.media, Pathways.utils));
