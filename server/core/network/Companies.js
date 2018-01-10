/**
 * author Oleg .
 */
const CompanyModel = require( '../../db/sql/Connection' ).models.companies;
const EmploeesModel = require( '../../db/sql/Connection' ).models.employees;

var Companies = {
  getList:( uid ) =>{
      'use strict';

     return EmploeesModel.findAll({

         where:{
             UserId:uid
         },
          include:[{
              model:CompanyModel,
              as:'Company',
          }]
      })

  }
};

module.exports = Companies;