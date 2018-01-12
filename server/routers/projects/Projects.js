/**
 * author Oleg .
 */
const ProjectsCore = require ( '../../core/network/Projects.js' );
const EmploeeCore = require( '../../core/network/Emploee.js' );

const Projects = {
    changeCompany: ( event, args ) => {
        'use strict';

        let companyId = args.id;

        storage.set ( 'bimba-tracker-company', args, function ( error ) {
            if ( error )  throw error;
            else {

                EmploeeCore.setCurrentEmploee( companyId );

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
                        })
                        .catch ( function ( error ) {
                            'use strict';

                        })
                } )
            }

        } )

    },


};

module.exports = Projects;

