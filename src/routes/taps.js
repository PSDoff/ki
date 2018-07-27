var express = require('express');
var router = express.Router();

var taps_controller = require('../controllers/tapsController');

router.get('/', taps_controller.index);
router.get('/:id', taps_controller.show);

module.exports = router;
