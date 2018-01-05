/**
 * author Oleg .
 */
const ProjectModel = require ( '../../db/sql/Connection.js' ).models.projects;
const EmploeeModel = require ( '../../db/sql/Connection.js' ).models.employees;
const CompanyModel = require ( '../../db/sql/Connection.js' ).models.companies;
const TaskModel = require ( '../../db/sql/Connection.js' ).models.tasks;

const Projects = {
    getList: ( uid ) => {
        'use strict';

        return EmploeeModel.findAll ( {
            where: { UserId: uid },
            attributes: [ 'id', 'CompanyId' ],
            include: [ {
                model: ProjectModel,
                as: 'Projects',
                where: {
                    status: 'in progress'
                },
                attributes: [ 'id', 'name', 'internalName', 'startDate', 'endDate' ],
                include: [ {
                    model: CompanyModel,
                    as: 'Company',
                    attributes: [ 'id', 'title', 'shortTitle', 'owner' ]
                } ],
            } ],
        } )

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

                return TaskModel.findAll ( {
                    include: [
                        {
                            model: EmploeeModel,
                            as: 'Emploees',
                            required: true,
                            where: {
                                id: {
                                    $in: ids
                                }
                            }
                        },
                        {
                            model: ProjectModel,
                            as: 'Project',
                            attributes:['name','internalName','status'],
                            where:{
                                status:'in progress'
                            },
                            required: true,
                            include: [ {
                                model: CompanyModel,
                                as: 'Company',
                                attributes: [ 'title', 'shortTitle' ]
                            } ],
                        }
                    ],

                } );

            } )
            .catch ( function ( error ) {

                return error

            } )

    }
};

module.exports = Projects;
