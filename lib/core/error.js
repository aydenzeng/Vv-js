module.exports = async (ctx, next) => {
    try {
      await next();
    } catch (err) {
        const status = err.status || 500;
        ctx.status = status;
        ctx.body = err.message
    }
  }