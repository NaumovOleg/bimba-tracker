/**
 * author Oleg .
 */

const CompaniesCore = require( '../../core/network/Emploee.js' );



var Companies = {

    getList: (  event, args ) =>{
        storage.get('bimba-tracker-user',function ( error,data ) {

            if( error ) {
                return  event.returnValue = error
            } else {

                let emploees = [];

                CompaniesCore.getList( data.id )
                    .then( function ( response ) {
                        for ( var i = 0; i < response.length; i++ ) {

                             if(! response[i].dataValues.disabled ) {

                                 let emploee = {
                                     id:response[i].dataValues.id,
                                     UserId:response[i].dataValues.UserId,
                                     company:response[i].dataValues.Company.dataValues
                                 };

                                 emploees.push( emploee )
                             }

                        }


                        return event.returnValue = emploees;

                    })
                    .catch(function ( error  ) {

                        return  event.returnValue = error;
                    })

            }

        })
    },


};

module.exports = Companies;