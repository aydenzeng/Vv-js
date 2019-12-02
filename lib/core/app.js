const Koa = require('koa')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const session = require('koa-session2')
const routerGroups = require("koa-router-groups");
const koaStatic = require('koa-static')
const middleWares = require("./middlewares")
const errorCatch = require('./error')
//加载配置文件和路由文件
const support = require('./support')
global.APP_PATH = support.getRootDir()
global.VVENV = support.env

const config = require('./config')
const router = require('./router')
const tplEngine =require('./tplengine')

require('dotenv').config()
global.CONFIG = config()
//加载配置文件结束
//加载orm
const vvorm =require('./orm')
const app = new Koa()
.use(vvorm())
routerGroups.extend(router);
middleWares.bindRouter(router)

//绑定配置信息到app
app.context.config = config()
app.keys = [app.context.config.app.key];
app
//.use(errorCatch)
.use(vvorm())
.use(tplEngine.Middleware())
.use(koaStatic(global.APP_PATH+'/public'))
.use(session(app.context.config.session, app))//开启session
.use(cors(app.context.config.cors))//添加跨域中间件
.use(logger())//添加logger
.use(router.routes())
.use(router.allowedMethods())

app.use(async (ctx, next) => {
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
  });
  
  app.on("error", (err, ctx) => {
    console.error("Ooops..\n", err);
  });
app.start = function (){
    const PORT = app.context.config.app.port
    app.listen(PORT)
    console.log(`listening on port ${PORT}`)
}
module.exports=app