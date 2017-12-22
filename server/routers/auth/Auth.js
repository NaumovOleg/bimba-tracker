/**
 * author Oleg .
 */

var AuthCore = require('../../core/network/Auth.js');


var Login =  {
   login : ( event, args ) =>{
       var user = {
           email:args.email,
           password:args.password
       };

       AuthCore.login( user )
           .then( function ( response  ) {
               if( ! response.error ) {
                    storage.set( 'bimba-tracker-user', {email:response.email, password:user.password}, function ( error ) {
                       return  event.sender.send('user is logined ')
                   });
                   mainWindow.loadURL( indexUrl );
               } else {
                   mainWindow.loadURL( loginUrl )
               }
           })
           .catch(function ( error ) {
               return  event.sender.send(error)
           })

   },
    logout: function ( event, args ) {
        storage.set( 'bimba-tracker-user', {email:null,password:null}, function ( error ) {
            mainWindow.loadURL( loginUrl )
        });
    }
};


module.exports = Login;
