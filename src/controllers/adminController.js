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
            res.render('admin/index', {taps, kegs});
        });
    });
};