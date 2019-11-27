const glob = require('glob')
module.exports = function (dirname) {
    //返回promis对像，
    return new Promise((resolve, reject) => {
      const routers = []
      //按通配符便利指定dirname下面除了index.js外的文件
      glob(`${dirname}/*`, { ignore: '**/index.js' }, (err, files) => {
        if (err) {
          reject(err)
        }
        files.forEach(file => {
          const router = require(file)
          routers.push(router)
        })
        resolve(routers)
      })
    })
  }