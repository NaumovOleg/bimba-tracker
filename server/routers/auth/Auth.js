/**
 * author Oleg .
 */


const AuthCore = require('../../core/network/Auth.js');
const CompaniesCore = require('../../core/network/Companies.js' );
const Utils = require( '../../libs/Session.js' );

// function for authentification user to system ( sets uderId and defaul emploee and company to json storage)
var Login =  {
   login : ( event, args ) =>{
       var user = {
           email:args.email,
           password:args.password
       };
        AuthCore.login( user )
           .then( function ( response  ) {
               
               
               if( ! response.error ) {
                  let currentSession = Utils.generateKey();
                  return  storage.set( 'bimba-tracker-user', {email:response.email, password:user.password,id:response.id, session:currentSession }, function ( error ) {

                      var userData = {
                                 expiration:     new Date(),
                                 uid:            response.id,
                                 firstName:      response.firstname || '',
                                 lastName:       response.lastname || '' ,
                                 username:       response.username || '',
                                 email:          response.email || '',
                                 status:         response.status,
                                 userpic:        response.userpic,
                                 session:        currentSession
                             };
                      
                      redisDB.set( currentSession, JSON.stringify( userData ) );
                      
                      CompaniesCore.getList( response.id )
                          .then( function ( response  ) {

                              let companyList = [];
                              for ( var i = 0; i < response.length; i++ ) {
                                  var obj = response[ i ].dataValues.Company.dataValues;
                                  var company = {
                                      id:obj.id,
                                      title:obj.title
                                  };
                                  companyList.push( company )
                              };

                              storage.set('bimba-tracker-company',companyList[0], function ( error ) {
                                  mainWindow.loadURL( indexUrl );
                              });

                              event.returnValue = companyList;
                          })
                          .catch( function ( error ) {

                          })

                   });

               }
               else {
                   return event.returnValue = {error:'invalid login or password'}
               }
           })
           .catch(function ( error ) {
               return  event.returnValue = error;
           })

   },

    // throws user to login page and clears json storage
    logout: function ( event, args ) {
        storage.set( 'bimba-tracker-user', {email:null,password:null}, function ( error ) {
            storage.set( 'bimba-tracker-company',null, function ( error ) {
                storage.set( 'bimba-tracker-emploee',null, function ( error ) {
                    tray.destroy();
                    window = null;
                    mainWindow.loadURL( loginUrl )
                });
            });
        });

    }
};


module.exports = Login;
