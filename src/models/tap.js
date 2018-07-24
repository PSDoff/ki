var db = require('../services/firebase');

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

exports.create_get = function() {

}

exports.create_post = function(tap) {
    return new Promise(function(resolve) {
        var ref = db.ref(`/taps/${tap.key}`);
        ref.set(tap);
        resolve(tap);
    });
}