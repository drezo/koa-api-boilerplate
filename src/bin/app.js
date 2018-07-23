const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const methodOverride = require('koa-methodoverride');
const cors = require('kcors');
const helmet = require('koa-helmet');
const bugsnag = require('bugsnag');
const route = require('../routes');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.proxy = true; // eg header 'X-Forwarded-Host'

  if (process.env.BUGSNAG_KEY) {
    bugsnag.register(process.env.BUGSNAG_KEY, {
      filters: ['authorization']
    });
    app.on('error', bugsnag.koaHandler);
  }
}

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(helmet());
app.use(cors({ credentials: true }));
app.use(koaBody());
app.use(logger());

app.use(route.routes());
app.use(route.allowedMethods());

module.exports = app;
