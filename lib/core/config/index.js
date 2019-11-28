const configsLoader = require('../loader/configsLoader')
module.exports = () =>{
  return configsLoader(`${global.APP_PATH}/config`);
}