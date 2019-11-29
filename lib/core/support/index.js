const path = require('path')
const fs= require("fs")
module.exports={
    getRootDir:()=>{
        return path.resolve(__dirname, '../../..');
    },
    env:(key,default_value)=>{
        return process.env.hasOwnProperty(key)?process.env[key] :default_value;
    }
}