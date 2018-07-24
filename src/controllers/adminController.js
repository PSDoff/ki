var db = require('../services/firebase');
var kegModel = require('../models/keg');
var tapModel = require('../models/tap');

exports.admin_index = function(req, res, next) {
    tapModel.findAll().then(function(taps) {
        kegs = kegModel.findAll().then(function(kegs) {
            res.render('admin/index', {taps, kegs});
        })
    });
};