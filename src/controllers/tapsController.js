var db = require('../services/firebase');

exports.taps_index = function(req, res) {
    var taps = db.ref('/taps');
    taps.once("value").then(function(snap) {
        var taps = snap.val();
        var kegs = Object.keys(taps).map(function(key) {
            return new Promise(function(resolve) {
                var tap = taps[key];
                kegRef = db.ref(`/kegs/${tap.keg}`);
                kegRef.once("value").then(function(snap) {
                    taps[key].keg = snap.val();
                    resolve();
                });
            });
        });
        var results = Promise.all(kegs);
        results.then(function() {
            res.render('taps/index', {taps});
        });
    });
};

exports.tap_show = function(req, res) {
    tapRef = db.ref(`/taps/${req.params.id}`);
    tapRef.once("value").then(function(snap) {
        var tap = snap.val();
        if (!tap) {
            res.render('404');
            return;
        }
        tap.key = req.params.id;
        var kegRef = db.ref(`/kegs/${tap.keg}`);
        kegRef.once("value").then(function(snap) {
            keg = snap.val();
            res.render('taps/show', {tap, keg});
        });
    });
};

exports.tap_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.tap_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.tap_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};

exports.tap_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};

exports.tap_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};

exports.tap_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};
