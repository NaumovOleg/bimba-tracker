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

    console.log('Bimba-tracker: MySQL connection succeeded.');

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
    projects:                   require( './models/Project.js')( sequelize ),
    employees:                  require( './models/Employee.js')( sequelize ),

    companies:                  require( './models/Company.js' )( sequelize ),

    employee_project:           require( './models/Emploee-Project')( sequelize ),

};

models.users.hasMany( models.employees );
models.employees.belongsTo( models.users, { as: 'User', foreignKey: 'UserId' } );

models.employees.belongsToMany( models.projects, {as:'Projects',through: { model: models.employee_project, unique: false }, foreignKey: 'EmploeeId' });
models.projects.belongsToMany( models.employees, {as:'Emploees',through: { model: models.employee_project, unique: false }, foreignKey: 'ProjectId'});


models.companies.hasMany( models.employees );
models.employees.belongsTo( models.companies, { as: 'Company', foreignKey: 'CompanyId' } );

models.companies.hasMany( models.projects );
models.projects.belongsTo( models.companies, { as: 'Company', foreignKey: 'CompanyId' } );

sequelize.sync();

module.exports = {
    sequelize:  sequelize,
    models:     models
};
