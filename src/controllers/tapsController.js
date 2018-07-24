var db = require('../services/firebase');
var tapModel = require('../models/tap');
var kegModel = require('../models/keg');

exports.taps_index = function(req, res) {
    tapModel.findAll().then(function(taps) {
        kegs = Object.keys(taps).map(function(key) {
            return new Promise(function(resolve){
                let tap = taps[key];
                kegModel.find(tap.keg).then(function(keg) {
                    tap['keg'] = keg;
                    resolve(keg);
                });
            });
        });
        
        Promise.all(kegs).then(function() {
            res.render('taps/index', {taps});
        });
    });
};

exports.tap_show = function(req, res) {
    tapModel.find(req.params.id)
        .then(function(tap){
            kegModel.find(tap.keg).then(function(keg) {
                tap['keg'] = keg;
                res.render('taps/show', {tap});
            }); 
        }).catch(function() {
            res.render('404');
            return;
        });
}


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
