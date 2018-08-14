var db = require('../services/firebase').db;

exports.dummy = {
    initialVolume: config.defaultKegVolume,
    keg: 'dummy',
    volume: config.defaultKegVolume
};

exports.findAll = function() {
    return new Promise(function(resolve) {
        var ref = db.ref('/taps');
        ref.once("value").then(function(snap) {
            var taps = snap.val();
            resolve(taps);
        });
    });
}

exports.find = function(id) {
    return new Promise(function(resolve, reject) {
        var ref = db.ref(`/taps/${id}`);
        ref.once("value").then(function(snap) {
            var tap = snap.val();
            if (tap) {
                tap['key'] = snap.key;
                resolve(tap);
            } else {
                reject(new Error('Tap not found.'));
            }
        });
    });
}

exports.update = function(id, keg, volume=config.defaultKegVolume) {
    return db.ref(`/taps/${id}`).set({
        'keg': keg,
        'volume': volume,
        'initialVolume': volume
    });
}