var db = require('../services/firebase');

exports.admin_index = function(req, res, next) {
    var tapsRef = db.ref('/taps');
    var kegsRef = db.ref('/kegs');
    kegsRef.once("value").then(function(snap) {
        var kegs = snap.val();
        res.render('kegs/index', {kegs});
    });
};

exports.keg_show = function(req, res) {
    kegRef = db.ref(`/kegs/${req.params.id}`);
    kegRef.once("value").then(function(snap) {
        keg = snap.val();
        if (!keg) {
            res.render('404');
            return;
        }
        res.render('kegs/show', {keg});
    });
};

exports.keg_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.keg_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.keg_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};

exports.keg_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};

exports.keg_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};

exports.keg_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};
