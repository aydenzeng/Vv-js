module.exports = async function (ctx, next) {
    if(true){
        ctx.throw(401, 'invalid token')
    }
    await next()
}