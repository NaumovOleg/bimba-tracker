/*
 * @author ohmed, Illya
 * MySQL connection manager
*/

var Sequelize = require('sequelize');
var mysql = require('mysql');
var environment = require( '../../config/LocalEnvironment.js');

//

var sequelize = new Sequelize( environment.sql.database, environment.sql.username, environment.sql.password,
    {
        host: environment.sql.host,
        dialect: 'mysql',
        logging: false
    }
);

var con = mysql.createConnection({

    host:       environment.sql.host,
    user:       environment.sql.username,
    password:   environment.sql.password

});

con.connect( function( err ) {

    if ( err ) {

        console.log( err );
        return;

    }

    console.log('Bimba-tools: MySQL connection succeeded.');

    //

    con.query( 'CREATE DATABASE `' + environment.sql.database + '`', function ( err, result ) {

        if ( err ) {

            return;

        }

    });

});

//

var models = {
    users:                      require( './models/User.js' )( sequelize ),
};


module.exports = {
    sequelize:  sequelize,
    models:     models
};
