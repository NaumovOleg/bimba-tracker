/**
 * author Oleg .
 */
/*
 * @author ohmed
 * Project model
 */

var Sequelize = require ( 'sequelize' );

var TaskModel = function ( sequelize ) {

    var Task = sequelize.define ( 'Task', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        trelloLink: {
            type: Sequelize.STRING
        },
        estimatedTime: {
            type: Sequelize.INTEGER
        },
        consumedTime:{
            type:Sequelize.INTEGER
        },
        description:{
            type:Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        }

    } );

    return Task;

};

//

module.exports = TaskModel;