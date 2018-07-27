var bucket = require('../services/firebase').bucket;
var fs = require('fs');

var imageTypes = ['logo', 'lifestyle1', 'lifestyle2'];

exports.upload = function(keg, files) {
    images = imageTypes.forEach(function(name) {
        let image = files[name];
        if (image) {
            let imageName = image.name;
            let imagePath = `${imageTempFolder}/${imageName}`
            image.mv(imagePath).then(function(){
                let options = {
                    destination: `keg-images/${keg.key}/${name}`,
                }
                bucket.upload(imagePath, options, function(err, file){
                    fs.unlink(imagePath);
                    console.log(file);
                    return file;
                })
            });
        }
    });

    return images;
}

exports.delete = function(id) {
    bucket.deleteFiles({
        force: true,
        prefix: `keg-images/${id}`
    }, function(errors) {});
}

exports.images = function(id) {
    return {
        "logo": getImageUrl(id, 'logo'),
        "lifestyle1": getImageUrl(id, 'lifestyle1'),
        "lifestyle2": getImageUrl(id, 'lifestyle2')
    }
}

getImageUrl = function(id, name) {
    return `https://firebasestorage.googleapis.com/v0/b/keg-intelligence.appspot.com/o/keg-images%2F${id}%2F${name}?alt=media`
}