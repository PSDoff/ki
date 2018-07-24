var express = require('express');
var router = express.Router();

var admin_controller = require('../controllers/adminController');
var kegs_controller = require('../controllers/kegsController');
var taps_controller = require('../controllers/tapsController');

router.get('/', admin_controller.admin_index);

router.get('/taps/:id/update', taps_controller.tap_update_get);
router.post('/taps/:id/update', taps_controller.tap_update_post);

router.get('/kegs/:id/create', kegs_controller.keg_create_get);
router.post('/kegs/:id/create', kegs_controller.keg_create_post);
router.get('/kegs/:id/delete', kegs_controller.keg_delete_get);
router.post('/kegs/:id/delete', kegs_controller.keg_delete_post);
router.get('/kegs/:id/update', kegs_controller.keg_update_get);
router.post('/kegs/:id/update', kegs_controller.keg_update_post);

module.exports = router;
