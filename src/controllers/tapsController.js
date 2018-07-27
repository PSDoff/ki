var tapModel = require('../models/tap');
var kegModel = require('../models/keg');
var images = require('../services/images').images;

exports.index = function(req, res) {
    tapModel.findAll().then(function(taps) {
        kegs = Object.keys(taps).map(function(key) {
            return new Promise(function(resolve){
                let tap = taps[key];
                kegModel.find(tap.keg)
                    .then(function(keg) {
                        tap['keg'] = keg;
                        tap['keg']['images'] = images(keg.key);
                        resolve(keg);
                    }).catch(function() {
                        tap['keg'] = kegModel.dummy;
                        resolve(kegModel.dummy);
                    });
            });
        });

        Promise.all(kegs).then(function() {
            res.render('taps/index', {taps});
        });
    });
};

exports.show = function(req, res) {
    tapModel.find(req.params.id)
        .then(function(tap){
            kegModel.find(tap.keg)
                .then(function(keg) {
                    tap['keg'] = keg;
                    tap['keg']['images'] = images(keg.key);
                    res.render('taps/show', {tap});
                }).catch(function() {
                    tap['keg'] = kegModel.dummy;
                    res.render('taps/show', {tap});
                });
        }).catch(function() {
            res.render('404');
            return;
        });
}

exports.edit = function(req, res) {
    res.render('admin/taps/edit', {'id': req.params.id, 'keg': req.params.keg});
};

exports.update = function(req, res) {
    tapModel.update(req.params.id, req.params.keg).then(function() {
        res.redirect('/taps');
    });
};

exports.delete = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};

exports.destroy = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};
