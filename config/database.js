module.exports = {
    default: global.VVENV('DB_CONNECTION','mysql'),
    connections: {
      sqlite: {
        //database:
        //user:
        //password:
        options:{
          dialect: 'mysql',
          storage: global.VVENV('DB_DATABASE',`${global.APP_PATH}/database/database.sqlite`),
        }//end options
      },
      mysql: {
        database : global.VVENV('DB_DATABASE', 'forge'),
        user : global.VVENV('DB_USERNAME', 'forge'),
        password : global.VVENV('DB_PASSWORD', ''),
        options:{
                  dialect: 'mysql',///* 'mysql' | 'mariadb' | 'postgres' | 'mssql' 之一 */
                  host : global.VVENV('DB_HOST', '127.0.0.1'),
                  port : global.VVENV('DB_PORT', '3306'),
                  dialectOptions: {
                    socketPath: global.VVENV('DB_SOCKET', ''),//'/Applications/MAMP/tmp/mysql/mysql.sock'
                    supportBigNumbers: true,
                    bigNumberStrings: true
                  },
                  define: {
                    underscored: false,
                    freezeTableName: true,
                    charset: 'utf8mb4',
                    dialectOptions: {
                      collate: 'utf8mb4_general_ci'
                    },
                    timestamps: false
                  },
                  pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                  }
        },//end options
       
      },
    },
  }