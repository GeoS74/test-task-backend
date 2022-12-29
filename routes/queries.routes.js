const Router = require('koa-router');

const controller = require('../controllers/queries.controller');

const router = new Router({ prefix: '/api/queries' });

router.get('/', controller.get);

module.exports = router.routes();
