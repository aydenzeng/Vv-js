const Koa = require('koa')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const session = require('koa-session')
const routerGroups = require("koa-router-groups");
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const middleWares = require("./middlewares")
const errorCatch = require('./error')
const CSRF = require('./middlewares/csrfSafe')
//加载配置文件和路由文件
const {getRootDir,controller,env} = require('./support')
global.APP_PATH = getRootDir()
global.VVENV = env
global.controller = controller
const config = require('./config')
const router = require('./router')
const tplEngine =require('./tplengine')

require('dotenv').config()
global.CONFIG = config()
//加载配置文件结束
//加载orm
const vvorm =require('./orm')
const app = new Koa()
routerGroups.extend(router);
middleWares.bindRouter(router)
//绑定配置信息到app
app.context.config = config()
app.keys = [app.context.config.app.key];
app
.use(session(app.context.config.session,app))//开启session
.use(vvorm())
.use(bodyParser())
.use(errorCatch)
.use(vvorm())
.use(tplEngine.Middleware())
.use(koaStatic(global.APP_PATH+'/public'))
.use(cors(app.context.config.cors))//添加跨域中间件
.use(logger())//添加logger
.use(CSRF({
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],//不验证csrf的请求
    disableQuery: false
}))
.use(router.routes())
.use(router.allowedMethods())

app.start = function (){
    const PORT = app.context.config.app.port
    app.listen(PORT)
    console.log(`listening on port ${PORT}`)
}
module.exports=app