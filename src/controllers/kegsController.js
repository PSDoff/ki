var kegModel = require('../models/keg');
var images = require('../services/images');

exports.new = function(req, res) {
    res.render('admin/kegs/new');
};

exports.create = function(req, res) {
    kegModel.create(req.body).then(function(keg) {
        if (req.files) {
            images.upload(keg, req.files).then(function(){
                res.redirect('/admin');
            });
        } else {
            res.redirect('/admin');
        }
    });
};

exports.show = function(req, res) {

};

exports.edit = function(req, res) {
    kegModel.find(req.params.id)
        .then(function(keg) {
            keg['images'] = images.all(keg.key);
            res.render(`admin/kegs/edit`, {keg});
        }).catch(function() {
            res.render('404');
            return;
        });
};

exports.update = function(req, res) {
    kegModel.update(req.params.id, req.body).then(function(keg) {
        if (req.files) {
            images.upload(keg, req.files).then(function(){
                res.redirect(`/admin/kegs/${req.params.id}/edit`);
            });
        }
        io.emit('reload', {keg});
    });
};

exports.delete = function(req, res) {
    kegModel.find(req.params.id)
        .then(function(keg){
            res.render(`admin/kegs/delete`, {keg, id: req.params.id});
        }).catch(function() {
            res.render('404');
            return;
        });
};

exports.destroy = function(req, res) {
    kegModel.delete(req.params.id).then(function() {
        images.delete(req.params.id);
    });
    res.redirect('/admin');
};
