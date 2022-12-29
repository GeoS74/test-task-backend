const Router = require('koa-router');
const { koaBody } = require('koa-body');

const controller = require('../controllers/shop.controller');
const validator = require('../middleware/validators/shop.params.validator');

const router = new Router({ prefix: '/api/shop' });

router.get('/:id', validator.id, controller.get);
router.get('/', controller.getAll);
router.post('/', koaBody({ multipart: true }), validator.params, controller.add);
router.patch('/:id', koaBody({ multipart: true }), validator.id, validator.params, controller.update);
router.delete('/:id', validator.id, controller.delete);

module.exports = router.routes();
