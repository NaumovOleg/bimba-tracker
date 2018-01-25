/**
 * author Oleg .
 */
const EmploeeModel = require('../../db/sql/Connection.js').models.employees;
const CompanyModel = require('../../db/sql/Connection.js').models.companies;

const Emploee = {

    getList:( uid ) =>{
       return EmploeeModel.findAll( {
           where:{'UserId':uid},
           attributes:['id','UserId','disabled','CompanyId'],
           include: [{
               model: CompanyModel,
               as:'Company',
               attributes:['id','title','owner']
           }],
       });

    },
	
	getMe:(id)=>{
    	return EmploeeModel.findById( id );
	},



    // according selected current company  and user  returns emploee
    setCurrentEmploee:( companyId )=>{
        'use strict';

        storage.get ( 'bimba-tracker-user',  function ( error , data ) {
            if ( error )  throw error;
            else {

                let uid = data.id;

               return EmploeeModel.findAll({
                    where:{
                        UserId:uid,
                        CompanyId:companyId
                    }
                }).then( function ( response  ) {

                    storage.set('bimba-tracker-emploee', response[0].dataValues.id , function (  ) {

                    })

               })


            }
        })

    }

};

module.exports = Emploee;