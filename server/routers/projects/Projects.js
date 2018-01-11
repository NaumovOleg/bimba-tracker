/**
 * author Oleg .
 */
const ProjectsCore = require ( '../../core/network/Projects.js' );
const Projects = {
    changeCompany: ( event, args ) => {
        'use strict';

        let companyId = args.id;

        storage.set ( 'bimba-tracker-company', args, function ( error ) {
            if ( error )  throw error;
            else {

                Projects.getDefaultProjets ( event )

            }
        } )


    },

    getDefaultProjets: ( event ) => {

        return storage.get ( 'bimba-tracker-user', function ( error, data ) {

            let uid = data.id;
            if ( !error ) {
                return storage.get ( 'bimba-tracker-company', function ( error, data ) {

                    let companyId = data.id;

                    return ProjectsCore.getList ( uid, companyId )
                        .then ( function ( response ) {
                            projects = response[ 0 ].dataValues.Projects;
                            event.returnValue = projects;


                        } )
                        .catch ( function ( error ) {

                            console.log ( error )

                        } )
                } )
            }

        } )

    },

    getProjectsTray: () => {
        'use strict';
        return storage.get ( 'bimba-tracker-user', function ( error, data ) {

            let uid = data.id;
            if ( !error ) {
                return storage.get ( 'bimba-tracker-company', function ( error, data ) {

                    let companyId = data.id;

                    return ProjectsCore.getList ( uid, companyId )
                        .then ( function ( response ) {

                            return response[ 0 ].dataValues.Projects;

                        } )
                        .catch ( function ( error ) {

                            console.log ( error )

                        } )
                } )
            }

        } )
    },

    getTasks: ( event, args ) => {
        'use strict';

        storage.get ( 'bimba-tracker-user', function ( error, data ) {

            if ( error || !data.id ) {
                return event.returnValue = error
            } else {

                ProjectsCore.getTasks ( data.id )
                    .then ( function ( response ) {

                        let projects = [];

                        for ( var i = 0; i < response.length; i++ ) {
                            var task = response[ i ].dataValues;
                        }


                        return event.returnValue = response

                    } )
                    .catch ( function ( error ) {

                    } )

            }
        } )

    }
};

module.exports = Projects;

