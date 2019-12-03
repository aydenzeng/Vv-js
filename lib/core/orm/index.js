const Sequelize = require('sequelize');
var dbConfigs = global.CONFIG.hasOwnProperty('database') ?global.CONFIG.database:null
const modelsLoader = require('../loader/modelsLoader')
var sequelize = null
function _connect(){
    //判断connection是否存在
    connection = dbConfigs.default
    connectionList = dbConfigs.connections;
    let dbConfig = connectionList.hasOwnProperty(connection) ? connectionList[connection] : null
    if(!dbConfig) {
        throw Error('unsupport database driver')
    }
    if(connection == 'sqlite')
    {
        sequelize = new Sequelize(dbConfig.options);
    } else {
        sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig.options);
    }
    sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
    return sequelize;
}
async function _registerModels(db){
    let models={}
    //自动加载当前models目录下面的所有model
    return modelsLoader(`${global.APP_PATH}/app/models`).then(modelsList => {
        console.log('Loading models')
        for (let modelName in modelsList) {
            models[modelName] = modelsList[modelName](db)
        }
        return models
      })
}
module.exports = (opts = {}) => {
    return async (ctx, next) => {
        ctx.db = _connect()
        ctx.models = await _registerModels(ctx.db)
        await next()
    }
};