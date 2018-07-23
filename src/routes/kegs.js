var express = require('express');
var router = express.Router();

var kegs_controller = require('../controllers/kegsController');

router.get('/', kegs_controller.kegs_index);
router.get('/:id', kegs_controller.keg_show);
router.get('/create', kegs_controller.keg_create_get);
router.post('/create', kegs_controller.keg_create_post);
router.get('/:id/delete', kegs_controller.keg_delete_get);
router.post('/:id/delete', kegs_controller.keg_delete_post);
router.get('/:id/update', kegs_controller.keg_update_get);
router.post('/:id/update', kegs_controller.keg_update_post);

module.exports = router;
