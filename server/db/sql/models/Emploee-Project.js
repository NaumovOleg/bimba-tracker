/**
 * author Oleg .
 */
var Sequelize = require('sequelize');

var Employee_ProjectModel = function ( sequelize ) {

    var EmployeeProject = sequelize.define('employee-projects', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ProjectId: {
            type: Sequelize.INTEGER,
            references: 'Project',
            referencesKey: 'id',
            allowNull: false
        },
        EmploeeId: {
            type: Sequelize.INTEGER,
            references: 'Emploee',
            referencesKey: 'id',
            allowNull: false
        },


    });

    return EmployeeProject;

};

//

module.exports = Employee_ProjectModel;