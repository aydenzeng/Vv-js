const fs = require('fs');
const vm = require('vm');

const templateCache = {};
const tplBasePath = global.APP_PATH+"/resources/views";
var baseVars = {}
var layoutPath = null
const templateContext = vm.createContext({
    include: function (tplPath) {
        let _tplPath = tplBasePath+'/'+tplPath
        const template = templateCache[_tplPath] || createTemplate(_tplPath)
        return template(baseVars);
    },
    layout:function (layout_path) {
        layoutPath = layout_path
        return ""
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
    setLayout(layout_path){
        layoutPath = layout_path
    }
    render(tplpath , vars = {}) {
        const template = createTemplate(tplBasePath+'/'+tplpath)
        baseVars = vars
        let content = template(vars)    
        if(layoutPath){
            const templateLayout = createTemplate(tplBasePath+'/'+layoutPath)
            return templateLayout({vvcontent:content})
        }
        return content
    }
}
module.exports = TplEngine;
module.exports.Middleware = (opts = {}) => {
    return async (ctx, next) => {
        layoutPath = null
        ctx.tpl = new TplEngine()
        await next()
    }
};