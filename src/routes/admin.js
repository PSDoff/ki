var express = require('express');
var router = express.Router();

var admin_controller = require('../controllers/adminController');

router.get('/', admin_controller.admin_index);

module.exports = router;