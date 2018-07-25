var kegModel = require('../models/keg');

exports.create_get = function(req, res) {
    res.render('admin/kegs/create');
};

exports.create_post = function(req, res) {
    var imageName;
    if (req.files) {
        var image = req.files.image;
        var imageName = image.name;
        image.mv(`${imageUploadFolder}/${imageName}`, function(err) {
            console.log(err);
        });
    }

    keg = {
        name: req.body.name,
        description: req.body.description,
        image: imageName,
    };
    kegModel.create(keg);

    res.redirect('/admin');
};

exports.keg_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};

exports.keg_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: id=' + req.params.id);
};

exports.delete_get = function(req, res) {
    kegModel.find(req.params.id)
        .then(function(keg){
            res.render(`admin/kegs/delete`, {keg, id: req.params.id});
        }).catch(function() {
            res.render('404');
            return;
        });
    
};

exports.delete_post = function(req, res) {
    kegModel.delete(req.params.id);
    res.redirect('/admin');
};
