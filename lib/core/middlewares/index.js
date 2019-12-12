const middlewaresLoader = require('../loader/middlewaresLoader')
const support = require('../support')
const CSRF = require('./csrfSafe')
//注册中间件
module.exports = {
    bindRouter:async (router)=>{
        let middlewares = middlewaresLoader(`${support.getRootDir()}/app/middlewares`)
        for(let name in middlewares) {
            router.registerMiddleware(`${name}`, middlewares[name]); 
        }
        console.log('loaded middlewares')
        //添加全局中间件
        router.pushMiddleware(require('./error'))

        //添加csrf支持
        router.pushMiddleware(new CSRF({
            invalidTokenMessage: 'Invalid CSRF token',
            invalidTokenStatusCode: 403,
            excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
            disableQuery: false
        }))
        router.pushMiddleware((ctx, next)=>{
                    ctx._csrf_ = ctx.csrf;
                    next()
        })
    }
}