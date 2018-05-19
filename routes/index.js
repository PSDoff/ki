var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Keg Intelligentsia',
        level0: req.app.get('level0'),
        level1: req.app.get('level1')
    });
});

module.exports = router;
