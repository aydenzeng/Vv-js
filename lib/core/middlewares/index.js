const middlewaresLoader = require('../loader/middlewaresLoader')
const support = require('../support')
//注册中间件
module.exports = {
    bindRouter:async (router)=>{
        let middlewares = middlewaresLoader(`${support.getRootDir()}/app/middlewares`)
        for(let name in middlewares) {
            router.registerMiddleware(`${name}`, middlewares[name]); 
        }
        //添加全局中间件
        //router.pushMiddleware("verifyToken")
    }
}