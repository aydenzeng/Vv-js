const fs = require('fs');
const vm = require('vm');

const templateCache = {};
const tplBasePath = global.APP_PATH+"/resources/views";
var baseVars = {}

const templateContext = vm.createContext({
    include: function (tplPath) {
        let _tplPath = tplBasePath+'/'+tplPath
        const template = templateCache[_tplPath] || createTemplate(_tplPath)
        return template(baseVars);
    }
});
function createTemplate(templatePath) {
    templateCache[templatePath] = vm.runInContext(
        `(function (data) {
            with (data) {
                return \`${fs.readFileSync(templatePath, 'utf-8')}\`
            }
        })`,
        templateContext
    );

    return templateCache[templatePath]
}
class TplEngine {
    render(tplpath , vars = {}) {
        const template = createTemplate(tplBasePath+'/'+tplpath)
        baseVars = vars
        return template(vars)
        
    }
}
module.exports = TplEngine;
module.exports.Middleware = (opts = {}) => {
    return async (ctx, next) => {
        ctx.tpl = new TplEngine()
        await next()
    }
};