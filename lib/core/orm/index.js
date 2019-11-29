var orm = require('orm');
var dbConnections = global.CONFIG('database')
db=connect(dbConnections)

function connect(){
    let connectStr = ''
    //判断connection是否存在
    connection = dbConnections.default
    let dbConfig = dbConnections.hasOwnProperty(connection) ? dbConnections[connection] : null
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