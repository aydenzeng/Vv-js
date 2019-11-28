const projectCtr = require('../app/controllers/ProjectController')
module.exports = async router => {
    router.group("verifyToken2", () => {
        router.get('/project/info', projectCtr.info);
    })
    router.get('/',projectCtr.index);
    router.get('/session',projectCtr.session);

  }