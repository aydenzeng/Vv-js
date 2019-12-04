const projectCtr = global.controller('ProjectController')
module.exports = async router => {
    router.group("verifyToken2", () => {
        router.get('/project/info', projectCtr.info);
    })
    router.get('/',projectCtr.index);
    router.get('/session',projectCtr.session);

    router.get('/db/create',projectCtr.dbCreate);
    router.get('/db/get/:id',projectCtr.dbGet);
    router.post('/db/post',projectCtr.dbPost);


  }