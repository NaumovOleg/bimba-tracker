/**
 * author Oleg .
 */
const ProjectModel = require ( '../../db/sql/Connection.js' ).models.projects;
const EmploeeModel = require ( '../../db/sql/Connection.js' ).models.employees;
const CompanyModel = require ( '../../db/sql/Connection.js' ).models.companies;
const TaskModel = require ( '../../db/sql/Connection.js' ).models.tasks;

const Projects = {
    getList: ( uid,companyId ) => {
        'use strict';

        return EmploeeModel.findAll({
            where:{
                UserId:uid,
                CompanyId:companyId
            },
            include:[{
                model:ProjectModel,
                as:'Projects'
            }]
        })

    },
    getTasks: ( project ) => {
        storage.get( 'bimba-tracker-user',  function ( error , user) {

            let uid = user.id;
            storage.get( 'bimba-tracker-company',function ( error , comp) {
               let company = comp.id;

            });
        });

    }
};

module.exports = Projects;
