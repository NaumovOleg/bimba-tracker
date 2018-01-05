/**
 * author Oleg .
 */
const ProjectModel = require( '../../db/sql/Connection.js' ).models.projects;
const EmploeeModel = require( '../../db/sql/Connection.js' ).models.employees;
const CompanyModel = require( '../../db/sql/Connection.js' ).models.companies;

const Projects = {
     getList:( uid )=>{
         'use strict';

         return EmploeeModel.findAll( {
             where:{ UserId:uid },
             attributes:[ 'id','CompanyId' ],
                 include: [{
                     model: ProjectModel,
                     as:'Projects',
                     where:{
                         status:'in progress'
                     },
                     attributes:['id', 'name','internalName','startDate','endDate'],
                     include: [{
                         model: CompanyModel,
                         as:'Company',
                         attributes:['id','title','shortTitle','owner']
                 }],
             }],
         })

     }
};

module.exports = Projects;
