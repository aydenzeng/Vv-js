class Controller {
    constructor() {
        this.tplEngine = global.TPL_ENGINE;
        this.display = this.tplEngine.display
    }
    destroy() {
        this.tplEngine=null;
        this.display =null;
    }
}
module.exports = Controller;