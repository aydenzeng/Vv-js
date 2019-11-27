const routesLoader = require('../loader/routesLoader')
const support = require('../support')
module.exports = router => {
    //自动加载当前目录下面的路由到koa-router
    routesLoader(`${support.getRootDir()}/app/routes`).then(routersList => {
      console.log('initRouter')
      routersList.forEach(initRouter => {
        initRouter(router)
      })
    })
  }