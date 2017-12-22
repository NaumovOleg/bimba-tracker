/**
 * author Oleg .
 */
const API = require('./api/Api.js' );
const Router = {
    setRoutes :( ipcmain ) =>{
        ipcmain.on('login',  API.auth.login)
    }
};

module.exports = Router;