/*
 * @author ohmed
 * Redis connection manager
*/

const environment = require( '../../config/LocalEnvironment.js' )

var redis = require('redis');

var redisConfig = {
    host:       environment.redis.host,
    port:       environment.redis.port,
    password:   environment.redis.password
};

var redisClient = redis.createClient( redisConfig );

redisClient.on( 'connect', function () {

    console.log( 'Bimba-tools: Redis connection succeeded.' );

});

redisClient.on( 'error', function ( err ) {

    console.log( 'Error with redis:' + err );

});

//

module.exports = redisClient;
