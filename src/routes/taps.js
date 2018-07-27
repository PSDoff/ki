var express = require('express');
var router = express.Router();

var taps_controller = require('../controllers/tapsController');

router.get('/', taps_controller.taps_index);
router.get('/:id', taps_controller.tap_show);
router.get('/create', taps_controller.tap_create_get);
router.post('/create', taps_controller.tap_create_post);
router.get('/:id/delete', taps_controller.tap_delete_get);
router.post('/:id/delete', taps_controller.tap_delete_post);
router.get('/:id/update', taps_controller.tap_update_get);
router.post('/:id/update', taps_controller.tap_update_post);

module.exports = router;
