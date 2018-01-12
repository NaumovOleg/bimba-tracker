/**
 * author Oleg .
 */
const API = require('./api/Api.js' );
const Router = {
    setRoutes :( ipcmain ) =>{
        ipcmain.on('login',  API.auth.login);
        ipcmain.on('logout',  API.auth.logout);
        ipcmain.on('emploee/getList',  API.emploees.getList);
        ipcmain.on('projects/getList',  API.projects.getDefaultProjets );
        ipcmain.on('projects/changeCompany', API.projects.changeCompany );
        ipcmain.on('project/getTasks', API.tasks.getList );

        ipcmain.on('company/getMyList',  API.companies.getMyList );
    }
};

module.exports = Router;