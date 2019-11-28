const Koa = require('koa')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const session = require('koa-session2')
const routerGroups = require("koa-router-groups");
const koaStatic = require('koa-static')

const middleWares = require("./middlewares")

//加载配置文件和路由文件
const support = require('./support')
global.APP_PATH = support.getRootDir()
global.CONFIG = support.config
const config = require('./config')
const router = require('./router')
require('dotenv').config()
//加载配置文件结束

const app = new Koa()

routerGroups.extend(router);
middleWares.bindRouter(router)

//绑定配置信息到app
app.context.config = config()
app.keys = [app.context.config.app.key];
app
.use(koaStatic(global.APP_PATH+'/public'))
.use(session(app.context.config.session, app))//开启session
.use(cors(app.context.config.cors))//添加跨域中间件
.use(logger())//添加logger
.use(router.routes())
.use(router.allowedMethods());

app.start = function (){
    const PORT = app.context.config.app.port
    app.listen(PORT)
    console.log(`listening on port ${PORT}`)
}
module.exports=app