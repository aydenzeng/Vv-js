const csrf = require('csrf');
module.exports = (opts = {})=>{
    var opts = Object.assign(
      {
        invalidTokenMessage: 'Invalid CSRF token',
        invalidTokenStatusCode: 403,
        excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
        disableQuery: false
      },
      opts
    )
    var tokens = csrf(opts)
    return async (ctx, next)=>{
      if (!ctx.session.secret) {
        ctx.session.secret = tokens.secretSync();
        console.log("==================ctx.session.secret="+ctx.session.secret)
      }
      //读取csrf属性时调用
      ctx.csrf = ()=>{
        if (!ctx.session) {
          return null;
        }
        return tokens.create(ctx.session.secret);
      }
  
      ctx.response.csrf = () => ctx.csrf;
  
      if (opts.excludedMethods.indexOf(ctx.method) !== -1) {
        return next();
      }
      const bodyToken =
        ctx.request.body && typeof ctx.request.body._csrf === 'string'
          ? ctx.request.body._csrf
          : false;
  
      const token =
        bodyToken ||
        (!opts.disableQuery && ctx.query && ctx.query._csrf) ||
        ctx.get('csrf-token') ||
        ctx.get('xsrf-token') ||
        ctx.get('x-csrf-token') ||
        ctx.get('x-xsrf-token');
  
      if (!token) {
        return ctx.throw(
          opts.invalidTokenStatusCode,
          typeof opts.invalidTokenMessage === 'function'
            ? opts.invalidTokenMessage(ctx)
            : opts.invalidTokenMessage
        );
      }
      console.log(token,ctx.session.secret)
      if (!tokens.verify(ctx.session.secret, token)) {
        return ctx.throw(
          opts.invalidTokenStatusCode,
          typeof opts.invalidTokenMessage === 'function'
            ? opts.invalidTokenMessage(ctx)
            : opts.invalidTokenMessage
        );
      }
      return await next();
    }}