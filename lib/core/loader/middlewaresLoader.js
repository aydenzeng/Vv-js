const glob = require('glob')
const path = require('path')
module.exports = function (dirname) {
      var middlewares = {}
      //按通配符便利指定dirname下面除了index.js外的文件
      let files =glob(`${dirname}/*`, { ignore: '**/index.js',sync:true });
      files.forEach(file => {
        const middlewareModule = require(file)
        const filename = path.basename(file,'.js')
        middlewares[filename] = middlewareModule
      })
      return middlewares
  }