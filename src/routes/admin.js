var express = require('express');
var router = express.Router();

var admin_controller = require('../controllers/adminController');
var kegs_controller = require('../controllers/kegsController');

router.get('/', admin_controller.index);
router.get('/kegs/create', kegs_controller.create_get);
router.post('/kegs/create', kegs_controller.create_post);
router.get('/kegs/:id/delete', kegs_controller.delete_get);
router.post('/kegs/:id/delete', kegs_controller.delete_post);

module.exports = router;