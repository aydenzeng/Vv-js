const glob = require('glob')
const merge = require('lodash/merge')
module.exports = function (dirname) {
    //返回promis对像，
    return new Promise((resolve, reject) => {
      let models = {}
      //按通配符便利指定dirname下面除了index.js外的文件
      glob(`${dirname}/*`, { ignore: '**/index.js' }, (err, files) => {
        if (err) {
          reject(err)
        }
        files.forEach(file => {
          const model = require(file)
          models = merge(models,model)
        })
        resolve(models)
      })
    })
  }