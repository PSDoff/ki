var express = require('express');
var router = express.Router();

var kegs_controller = require('../controllers/kegsController');

router.get('/new', kegs_controller.new);
router.post('/create', kegs_controller.create);
router.get('/:id/delete', kegs_controller.delete);
router.post('/:id/destroy', kegs_controller.destroy);
router.get('/:id/edit', kegs_controller.edit);
router.post('/:id/update', kegs_controller.update);

module.exports = router;