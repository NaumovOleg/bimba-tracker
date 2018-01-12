/**
 * author Oleg .
 */
var Sequelize = require('sequelize');

var Employee_Tasks = function ( sequelize ) {

    var EmployeeTask = sequelize.define('employee-tasks', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        TaskId: {
            type: Sequelize.INTEGER,
            references: 'Task',
            referencesKey: 'id',
            allowNull: false
        },
        EmploeeId: {
            type: Sequelize.INTEGER,
            references: 'Emploee',
            referencesKey: 'id',
            allowNull: false
        },
        consumedTime: {
            type: Sequelize.TIME
        },



    });

    return EmployeeTask;

};

//

module.exports = Employee_Tasks;