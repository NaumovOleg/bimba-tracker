/*
 * @author ohmed
 * Local environment config file
*/

var config = {

    name:           'Local dev environment',

    mongodb: {
        host:       'mongodb://bimba-remote:aloha123x@188.166.164.236:27017',
        port:       27017,
        db:         'bimba-tools'
    },

    sql: {
        username:   'root',
        database:   'bimba-tools',
        host:       '188.166.164.236',
        password:   'aloha123'
    },

    redis: {
        host:       '188.166.164.236',
        port:       6379,
        password:   'b155646ce2adeadf8581ab71a71a2719f435763354bb343bd058f5ad141b4da4'
    },

    web: {
        host:       'http://localhost',
        port:       3005
    },

    notifications: {
        port:           3006,
        internalPort:   3007
    }

};

//

module.exports = config;
