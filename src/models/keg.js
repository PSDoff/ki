var db = require('../services/firebase');

exports.findAll = function() {
    return new Promise(function(resolve) {
        var ref = db.ref('/kegs');
        ref.once("value").then(function(snap) {
            var kegs = snap.val();
            resolve(kegs);
        });
    });
}

exports.find = function(id) {
    return new Promise(function(resolve) {
        var ref = db.ref(`/kegs/${id}`);
        ref.once("value").then(function(snap) {
            var keg = snap.val();
            if (keg) {
                keg['key'] = snap.key;
                resolve(keg);
            } else {
                reject(new Error('Keg not found.'));
            }
        });
    })
}
