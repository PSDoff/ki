var express = require('express');
var router = express.Router();
var beerData = require('../data/beerData');

// Fetch Beer data
// var leftBeerMeta = beerData.leftBeerMeta();
// var rightBeerMeta = beerData.rightBeerMeta();
//
// console.log(beerData.leftBeerMeta);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Keg Intelligentsia',
        level0: req.app.get('level0'),
        level1: req.app.get('level1')
    });
});

module.exports = router;
