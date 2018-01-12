/**
 * author Oleg .
 */
const ProjectsCore = require ( '../../core/network/Projects.js' );
const EmploeeCore = require( '../../core/network/Emploee.js' );

const Projects = {

    // returns projects of company you have changed and set company as a current to json storage
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


    // returns list of projects of setted default company

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

