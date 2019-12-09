module.exports = async function (ctx, next) {
    ctx.redirectWithError=(url, errorMessage)=>{
        let errors = ctx.session.errors
        errors = !Array.isArray(errors) || errors.length <=0?[]:ctx.session.errors
        ctx.status = 302
        errors.push(errorMessage)
        ctx.session.errors = errors
        ctx.redirect(url);
    }
    ctx.getErrors = ()=>{
        let errors = ctx.session.errors
        errors = !Array.isArray(errors) || errors.length <=0?[]:ctx.session.errors
        ctx.session.errors = []
        return errors
    }
    global.currentCtx = ctx
    await next()
}