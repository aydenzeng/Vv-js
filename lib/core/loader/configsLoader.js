const glob = require('glob')
const merge = require('lodash/merge')
const path = require('path')
module.exports = function (dirname) {
      var configs = {}
      //按通配符便利指定dirname下面除了index.js外的文件
      let files =glob(`${dirname}/*`, { ignore: '**/index.js',sync:true });
      files.forEach(file => {
        const config = require(file)
        const filename = path.basename(file,'.js')
        const configFormat = {}
        configFormat[filename] = config
        configs = merge(configs,configFormat)
      })
      return configs
  }