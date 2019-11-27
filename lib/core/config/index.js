const configsLoader = require('../loader/configsLoader')
const support = require('../support')
module.exports = () =>{
  return configsLoader(`${support.getRootDir()}/config`);
}