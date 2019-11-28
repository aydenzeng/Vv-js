const routesLoader = require('../loader/routesLoader')
module.exports = router => {
    //自动加载当前目录下面的路由到koa-router
    routesLoader(`${global.APP_PATH}/app/routes`).then(routersList => {
      console.log('initRouter')
      routersList.forEach(initRouter => {
        initRouter(router)
      })
    })
  }