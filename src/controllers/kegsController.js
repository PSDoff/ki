var db = require('../services/firebase');

exports.keg_create_get = function(req, res) {
    res.send('kegs/create');
};

exports.keg_create_post = function(req, res) {
    res.send('admin/index');
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
