/*
 * @author ohmed, Illya
 * MySQL User model
*/

var Sequelize = require('sequelize');

var UserModel = function ( sequelize ) {

    var User = sequelize.define('User', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        firstname: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        lastname: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        userpic: {
            type: Sequelize.STRING
        },
        hash: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        session: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATE
        },
        gender: {
            type: Sequelize.STRING
        }

    });

    return User;

};

//

module.exports = UserModel;
