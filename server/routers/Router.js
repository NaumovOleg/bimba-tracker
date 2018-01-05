/**
 * author Oleg .
 */
const API = require('./api/Api.js' );
const Router = {
    setRoutes :( ipcmain ) =>{
        ipcmain.on('login',  API.auth.login);
        ipcmain.on('logout',  API.auth.logout);
        ipcmain.on('emploee/getList',  API.companies.getList);
        ipcmain.on('projects/getList',  API.projects.getList);
        ipcmain.on('projects/getTasks',  API.projects.getTasks );
    }
};

module.exports = Router;