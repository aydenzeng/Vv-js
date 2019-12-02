const projectCtr = require('../app/controllers/ProjectController')
module.exports = async router => {
    router.group("verifyToken2", () => {
        router.get('/project/info', projectCtr.info);
    })
    router.get('/',projectCtr.index);
    router.get('/session',projectCtr.session);

    router.get('/db/create',projectCtr.dbCreate);
    router.get('/db/get',projectCtr.dbGet);
    router.get('/db/find_update',projectCtr.dbFindAndUpdate);


  }