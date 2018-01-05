/**
 * author Oleg .
 */
const ProjectsCore = require( '../../core/network/Projects.js' );
const Projects = {
    getList:(event,args) =>{
        'use strict';

        // let companiesId = args.companies;

        storage.get('bimba-tracker-user', function(error, data) {

            if (error || ! data.id)  throw error;
            else {
                ProjectsCore.getList(data.id )
                    .then( function ( employees  ) {

                        let projects = [];

                        for ( var i = 0; i < employees.length; i++ ) {
                            var emploee = employees[ i ].dataValues;

                            for ( var j = 0; j < emploee.Projects.length; j++ ) {
                                var project = emploee.Projects[ j ].dataValues;

                                var emploeesProject = {};

                                emploeesProject.id = project.id;
                                emploeesProject.name = project.name;
                                emploeesProject.internalName = project.internalName;
                                emploeesProject.startDate = project.startDate;
                                emploeesProject.endDate = project.endDate;
                                emploeesProject.company = project.Company.dataValues;

                                projects.push( emploeesProject )

                            }

                        };

                        return event.returnValue = projects;

                    })
                    .catch( function ( error ) {
                        return event.returnValue = error;
                    })

            }
        })

    },

    getTasks:( event,args)=>{
        'use strict';

        storage.get('bimba-tracker-user',function ( error,data ) {

            if( error || !data.id ) {
                return  event.returnValue = error
            } else {
                
                ProjectsCore.getTasks( data.id  )
                    .then( function ( response  ) {

                        let projects = [];

                        for ( var i = 0; i < response.length; i++ ) {
                            var task = response[ i ].dataValues;
                            console.log('---------------' );
                            console.log( task );
                            console.log('---------------' )
                        }


                        return event.returnValue = response
                        
                    })
                    .catch( function ( error ) {
                        
                    })

            }
        })

    }
};

module.exports = Projects;