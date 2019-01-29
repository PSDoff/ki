var express = require('express');
var router = express.Router();

var admin_controller = require('../controllers/adminController');
var kegs_controller = require('../controllers/kegsController');
var taps_controller = require('../controllers/tapsController');

router.get('/', admin_controller.index);

router.get('/kegs/new', kegs_controller.new);
router.post('/kegs/create', kegs_controller.create);
router.get('/kegs/:id/edit', kegs_controller.edit);
router.post('/kegs/:id/update', kegs_controller.update);
router.get('/kegs/:id/delete', kegs_controller.delete);
router.post('/kegs/:id/destroy', kegs_controller.destroy);

router.get('/taps/:id/edit/:keg', taps_controller.edit);
router.post('/taps/:id/update/:keg', taps_controller.update);

router.get('/testmode', admin_controller.testMode);
router.get('/maintenancemode', admin_controller.maintenanceMode);
router.get('/refreshdisplays', admin_controller.refreshDisplays);

module.exports = router;