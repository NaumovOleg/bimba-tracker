/*
 * @author ohmed
 * Employee model
*/

var Sequelize = require('sequelize');

var EmployeeModel = function ( sequelize ) {

    var Employee = sequelize.define('Employee', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        disabled: {
            type: Sequelize.STRING
        },
        summary: {
            type: Sequelize.TEXT
        },
        skills: {
            type: Sequelize.STRING
        },

        contacts_country: {
            type: Sequelize.STRING
        },
        contacts_city: {
            type: Sequelize.STRING
        },
        contacts_address: {
            type: Sequelize.STRING
        },
        contacts_phone: {
            type: Sequelize.STRING
        },
        contacts_email: {
            type: Sequelize.STRING
        },

        // sn_trello_enabled: {
        //     type: Sequelize.BOOLEAN
        // },
        sn_trello: {
            type: Sequelize.STRING
        },
        sn_bitbucket: {
            type: Sequelize.STRING
        },
        sn_github: {
            type: Sequelize.STRING
        },
        sn_facebook: {
            type: Sequelize.STRING
        },
        sn_twitter: {
            type: Sequelize.STRING
        },
        sn_skype: {
            type: Sequelize.STRING
        },
        sn_telegram: {
            type: Sequelize.STRING
        },
        sn_slack: {
            type: Sequelize.STRING
        },
        sn_linkedin: {
            type: Sequelize.STRING
        },

        // current values ['latest'], will be used for next EmployeeHistory item

        status: {
            type:           Sequelize.ENUM,
            values:         [ 'active', 'deactivated' ],
            defaultValue:   'active'
        },
        salary: {
            type: Sequelize.INTEGER
        }

    });

    return Employee;

};

//

module.exports = EmployeeModel;
