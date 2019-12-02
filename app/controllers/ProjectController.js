class ProjectController {
    async info (ctx, next) {
        ctx.body = { project: 'hk01-koa-project', name: 'prm-group'}
      }


    async index  (ctx, next) {
      // ctx.body = "<h2>Hi,Welcome to PRM GROUP DEV FRAME WORK</h2>"
      //console.log(ctx.tpl);
      ctx.body = ctx.tpl.render('project/index.html',{column:{name:'zpming',role:'管理员'}})
    }
    async dbCreate(ctx, next){
      let Person = ctx.models.Person
      Person.create({name: "John", surname: "Doe", age: 27 }, function(err) {
        if (err) ctx.throw(500);
      })
      ctx.body = "asdfasdf"
    }
    async dbGet(ctx, next)
    {
      let Person = ctx.models.Person
      Person.get(2, function (err, person) {
        console.log(person.name)
       })
    }

    async dbFindAndUpdate(ctx, next)
    {
      let Person = ctx.models.Person
      Person.find({ surname: "Doe" }, function (err, people) {
        // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
        if (err) throw err;
 
        console.log("People found: %d", people.length);
        console.log("First person: %s, age %d", people[0].fullName(), people[0].age);
 
        people[0].age = 16;
        people[0].save(function (err) {
          // err.msg == "under-age";
        });
      });
    }
    async session (ctx, next) {
      if (ctx.path === '/favicon.ico') return;
      let n = ctx.session.views || 0;
      ctx.session.views = ++n;
      ctx.body = n + ' views';
    }
    
}
module.exports = new ProjectController()