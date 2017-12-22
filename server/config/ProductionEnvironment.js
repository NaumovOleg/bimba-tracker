/*
 * @author ohmed
 * Production environment config file
*/

var config = {

    name:           'Production environment',

    mongodb: {
        host:       'mongodb://localhost',
        port:       27017,
        db:         'bimba-tools-prod'
    },

    sql: {
        username:   'root',
        database:   'bimba-tools',
        host:       '127.0.0.1',
        password:   '@loha807'
    },

    redis: {
        host:       '127.0.0.1',
        port:       6379,
        password:   ''
    },

    web: {
        host:       'http://46.101.184.85',
        port:       2222
    },

    notifications: {
        port:           3006,
        internalPort:   3007
    }

};

//

module.exports = config;
