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
    getTasks: ( uid ) => {
        'use strict';
        return EmploeeModel.findAll ( {
            where: {
                UserId: uid
            },
            attributes: [ 'id' ],
        })
            .then ( function ( response ) {


                let ids = [];

                for ( var i = 0; i < response.length; i++ ) {
                    var id = response[ i ].dataValues.id;
                    ids.push ( id )
                }

                console.log( ids )


                return ProjectModel.findAll({
                    where:{
                        status:'in progress',
                    },
                    include:[{
                        model:TaskModel,
                        as:'Tasks',
                        required:true,
                        include:[{
                            model:EmploeeModel,
                            as:'Emploees',
                            where:{
                                id:{
                                    $in:ids
                                }
                            }
                        }]

                    }]
                })

            } )
            .catch ( function ( error ) {

                return error

            } )

    }
};

module.exports = Projects;
