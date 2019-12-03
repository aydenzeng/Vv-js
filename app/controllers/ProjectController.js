class ProjectController {
     info (ctx, next) {
        ctx.body = { project: 'hk01-koa-project', name: 'prm-group'}
      }


    async index  (ctx, next) {
      // ctx.body = "<h2>Hi,Welcome to PRM GROUP DEV FRAME WORK</h2>"
      //console.log(ctx.tpl);
      ctx.body = ctx.tpl.render('project/index.html',{column:{name:'zpming',role:'管理员'}})
    }
    async dbCreate(ctx, next){
      let Person = ctx.models.Person
      console.log(Person)
      ctx.body = "asdfsadf" 
      
    }
    async dbGet(ctx)
    {
      //具体使用方法参考https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/models-usage.md
      let Person = ctx.models.Person
      // 搜索已知的id
      let person1 = await Person.findByPk(2)
      // 搜索属性
      let person2 =await Person.findOne({
        where: {name: 'John'},
        attributes: ['id',['name','aliasName'], 'surname','age']//定义别名
      });
      //搜索特定元素或创建它(如果不可用)
      let createResult = await Person.findOrCreate({where: {name: 'Zpming'}, defaults: {name: 'Zpming',surname:'pengming',age:18}})
      ctx.body = person1.name + ':' +person2.get('aliasName') +"---是否create新记录:"+createResult[1] + '---新的name:' + createResult[0].name
    }

    async session (ctx, next) {
      if (ctx.path === '/favicon.ico') return;
      let n = ctx.session.views || 0;
      ctx.session.views = ++n;
      ctx.body = n + ' views';
    }
    
}
module.exports = new ProjectController()