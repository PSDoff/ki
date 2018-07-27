var kegModel = require('../models/keg');
var images = require('../services/images');

exports.new = function(req, res) {
    res.render('admin/kegs/new');
};

exports.create = function(req, res) {
    kegModel.create({
        name: req.body.name,
        details: {
            ibu: req.body.ibu,
            alcohol: req.body.alcohol,
            ingredients: req.body.ingredients,
            description: req.body.description,
            tasting: req.body.tasting,
            brand: req.body.brand
        }
    }).then(function(keg) {
        if (req.files) {
            images.upload(keg, req.files);
        }
    });

    res.redirect('/admin');
};

exports.show = function(req, res) {

};

exports.edit = function(req, res) {
    res.render(`admin/kegs/${req.params.id}/edit`);
};

exports.update = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
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
