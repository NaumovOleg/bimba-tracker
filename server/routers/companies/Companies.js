/**
 * author Oleg .
 */
const CompaniesCore = require('../../core/network/Companies.js' );

var Company ={
    getMyList:( event,args )=>{
        'use strict';

        storage.get('bimba-tracker-user',function ( error,data ) {

            if( error ) {
                return  event.returnValue = error
            } else {

                CompaniesCore.getList( data.id )
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
                        event.returnValue = companyList;
                    })
                    .catch( function ( error ) {

                    })
            }
        })

    }
};
module.exports = Company;