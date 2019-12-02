var orm = require('orm');
var dbConfigs = global.CONFIG.hasOwnProperty('database') ?global.CONFIG.database:null
const modelsLoader = require('../loader/modelsLoader')
function _connect(){
    //判断connection是否存在
    connection = dbConfigs.default
    connectionList = dbConfigs.connections;
    let dbConfig = connectionList.hasOwnProperty(connection) ? connectionList[connection] : null
    if(!dbConfig) {
        throw Error('unsupport database driver')
    }
    var db = orm.connect(dbConfig);
    db.on('connect', function(err) {
        if (err) return console.error('Connection error: ' + err);
        console.log('db connected success')
      });
    return db;
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