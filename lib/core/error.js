module.exports = async (ctx, next) => {
    try {
      await next();
    } catch (err) {
        const status = err.status || 500;
        ctx.status = status;
        ctx.type = "html";
        ctx.body = `
        <b>${status}</b> ${err}
        `;
        // emmit
        ctx.app.emit("error", err, ctx);
    }
  }