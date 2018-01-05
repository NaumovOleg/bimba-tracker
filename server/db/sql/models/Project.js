/*
 * @author ohmed
 * Project model
*/

var Sequelize = require('sequelize');

var ProjectModel = function ( sequelize ) {

    var Project = sequelize.define('Project', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        name: {
            type: Sequelize.STRING
        },
        internalName: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.TEXT
        },
        totalPrice: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.ENUM,
            values: [ 'hourly', 'fixed', 'notspecified' ]
        },

        // current values ['latest'], will be used for next EmployeeHistory item

        status: {
            type: Sequelize.STRING
        }

    });

    return Project;

};

//

module.exports = ProjectModel;
