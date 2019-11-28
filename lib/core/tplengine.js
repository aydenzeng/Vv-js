class TplEngine {
    constructor() {
        this.basePath = global.APP_PATH+"/resources/view";
    }
    async display(tplpath) {
        console.log(tplpath)
        
    }
}
module.exports = TplEngine;