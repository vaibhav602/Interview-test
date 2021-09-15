const controller = require('../controllers/usercontroller');


module.exports = (app) =>{
    const common = '/api/user/';
    
    app.post(`${common}create`, controller.postnewuser);
    app.post(`${common}list`, controller.getuserById);
    app.post(`${common}update`, controller.updateuser);
    app.post(`${common}delete`, controller.deleteUser);
}