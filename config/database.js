module.exports = {
    default: global.VVENV('DB_CONNECTION','mysql'),
    connections: {
      sqlite: {
        protocol:'sqlite',
        database : global.VVENV('DB_DATABASE',`'${global.APP_PATH}/database/database.sqlite'`),
        prefix : '',
        foreign_key_constraints : global.VVENV('DB_FOREIGN_KEYS', true),
      },
      mysql: {
        protocol:'mysql',
        host : global.VVENV('DB_HOST', '127.0.0.1'),
        port : global.VVENV('DB_PORT', '3306'),
        database : global.VVENV('DB_DATABASE', 'forge'),
        user : global.VVENV('DB_USERNAME', 'forge'),
        password : global.VVENV('DB_PASSWORD', ''),
        socketPath:global.VVENV('DB_SOCKET', ''),
        charset:'UTF8MB4_UNICODE_CI',
        query:{
          pool: true,
          debug: true
        }
      },
    },
  }