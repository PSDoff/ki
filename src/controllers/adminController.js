var kegModel = require('../models/keg');
var tapModel = require('../models/tap');

exports.index = function(req, res, next) {
    tapModel.findAll().then(function(taps) {
        kegs = kegModel.findAll().then(function(kegs) {
            Object.keys(taps).map(function(key) {
                var tap = taps[key];
                var tappedKegKey = tap['keg'];
                var keg = kegs[tappedKegKey];
                if (keg) {
                    taps[key]['keg'] = keg;
                } else {
                    taps[key]['keg'] = kegModel.dummy;
                }
            });
            res.render('admin/index', {taps, kegs, config});
        });
    });
};

exports.testMode = function(req, res, next) {
    config.testMode = !config.testMode;
    res.redirect('/admin');
}

exports.maintenanceMode = function(req, res, next) {
    config.maintenanceMode = !config.maintenanceMode;
    io.emit('maintenance', {enabled: config.maintenanceMode});
    res.redirect('/admin');
}

exports.refreshPage = function(req, res, next) {
    io.emit('reload', {});
    res.redirect('/admin');
}