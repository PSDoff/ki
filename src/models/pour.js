var db = require('../services/firebase').db;

var kegModel = require('./keg');
var tapModel = require('./tap');

exports.create = function(pour, tapKey) {
    return new Promise(function(resolve) {
        tapModel.find(tapKey).then(function(tap) {
            kegModel.find(tap.keg).then(function(keg) {
                var poursRef = db.ref(`/pours`);
                poursRef.push(
                    {
                        time: (new Date).toString(),
                        volume: pour.volume,
                        keg: {
                            key: keg.key,
                            name: keg.name,
                            brand: keg.brand
                        }
                    }
                ).then(function(snap){
                    resolve(pour);
                });
            });
        });
    });
}