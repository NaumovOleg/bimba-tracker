/*
 * @author ohmed
 * Company model
*/

var Sequelize = require( 'sequelize' );

var CompanyModel = function ( sequelize ) {

    var Company = sequelize.define( 'Company', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        title: {
            type: Sequelize.STRING
        },
        shortTitle: {
            type: Sequelize.STRING
        },

        owner: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },

        color: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        fieldOfWork: {
            type: Sequelize.STRING
        },
        createDate: {
            type: Sequelize.DATE
        }

    });

    return Company;

};

//

module.exports = CompanyModel;
