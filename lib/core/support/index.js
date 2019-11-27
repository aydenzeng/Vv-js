const path = require('path')
const fs= require("fs")
module.exports={
    getRootDir:()=>{
        return path.resolve(__dirname, '../../..');
    }
}