var orm = require('orm');
var dbConfigs = global.CONFIG.hasOwnProperty('database') ?global.CONFIG.database:null

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
module.exports = (opts = {}) => {
    return async (ctx, next) => {
        ctx.db = _connect()
        await next()
    }
};