require('../lib/core/app')
if(global.CONFIG != undefined)
{
  var dbConfigs = global.CONFIG.hasOwnProperty('database') ?global.CONFIG.database:null
  connection = dbConfigs.default
  connectionList = dbConfigs.connections;
  let dbConfig = connectionList.hasOwnProperty(connection) ? connectionList[connection] : null
  if(!dbConfig) {
      throw Error('unsupport database driver')
  }
  let dbConfigFormat = {
    "username": dbConfig.user,
    "password": dbConfig.password,
    "database": dbConfig.database,
    "host": dbConfig.options.host,
    "dialect": dbConfig.options.dialect,
    "operatorsAliases": false
  }
  module.exports = {
    "development": dbConfigFormat,
    "test": dbConfigFormat,
    "production": dbConfigFormat
  }
}

