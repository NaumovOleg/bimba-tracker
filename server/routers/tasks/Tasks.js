/**
 * author Oleg .
 */

const TaskCore = require('../../core/network/Tasks.js' );

let Tasks = {
    getList:( event,args )=>{
        'use strict';
        let projectId = args.projectId;
        let tasks = [];
       storage.get('bimba-tracker-emploee', function ( error, response  ) {

           TaskCore.getTasks( projectId , response )
               .then( function ( response ) {

                   for ( var i = 0; i < response.length; i++ ) {
                       var obj = response[ i ].dataValues;
                       tasks.push( obj )

                   }

                   return event.returnValue = tasks

               })
       });


    }
};

module.exports = Tasks;
