const Router = require('koa-router');
const initRouter = require('./routes')

//new 一个koa router
const appRoute =new Router()

//绑定应用路由到koa router
initRouter(appRoute)

module.exports=appRoute