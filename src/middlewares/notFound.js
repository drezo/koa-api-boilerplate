module.exports = () => async (ctx, next) => {
  await next();
  const status = ctx.status || 404;
  if (ctx.status === 404) {
    ctx.status = status;
    ctx.body = {
      success: false,
      error: {
        status,
        message: 'API not found'
      }
    };
  }
};
