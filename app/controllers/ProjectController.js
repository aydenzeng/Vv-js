class ProjectController {
    async info (ctx, next) {
        ctx.body = { project: 'hk01-koa-project', name: 'prm-group'}
      }


    async index  (ctx, next) {
      ctx.body = "<h2>Hi,Welcome to PRM GROUP DEV FRAME WORK</h2>"
    }

    async session (ctx, next) {
      if (ctx.path === '/favicon.ico') return;
      let n = ctx.session.views || 0;
      ctx.session.views = ++n;
      ctx.body = n + ' views';
    }
    
}
module.exports = new ProjectController()