const Router = require('koa-router');

const router = new Router();

router.get('/robots.txt', ctx => {
  ctx.body = 'User-agent: *\nDisallow: /';
});

module.exports = router;
