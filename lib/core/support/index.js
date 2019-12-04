const path = require('path')
const fs= require("fs")
function _getRootPath(){
    return path.resolve(__dirname, '../../..');
}
module.exports={
    getRootDir:()=>{
        return _getRootPath();
    },
    env:(key,default_value)=>{
        return process.env.hasOwnProperty(key)?process.env[key] :default_value;
    },
    controller:(controllerPath)=>{
        let controller = _getRootPath()+'/app/controllers/'+controllerPath
        return require(controller)
    }
}