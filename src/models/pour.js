var db = require('../services/firebase').db;

var kegModel = require('./keg');
var tapModel = require('./tap');

exports.dummy = {
    time: "Sat Apr 20 2019 07:44:27 GMT-0400 (EDT)",
    volume: 100,
    beforeVolume: 500,
    afterVolume: 400,
    tap: "left",
    keg: {
        key: "-12345",
        name: "Beer",
        brand: "Beau's"
    }
};

exports.create = function(pour, tapKey) {
    return new Promise(function(resolve) {
        if (config.testMode) {
            resolve(pour);
            return;
        } else {
            tapModel.find(tapKey).then(function(tap) {
                kegModel.find(tap.keg).then(function(keg) {
                    var poursRef = db.ref(`/pours`);
                    poursRef.push(
                        {
                            time: (new Date).toString(),
                            volume: pour.volume,
                            beforeVolume: pour.beforeVolume,
                            afterVolume: pour.afterVolume,
                            tap: pour.tap,
                            keg: {
                                key: keg.key,
                                name: keg.name,
                                brand: keg.brand
                            }
                        }
                    ).then(function(snap){
                        resolve(pour);
                        return;
                    });
                });
            });
        }
    });
}