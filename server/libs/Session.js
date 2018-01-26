var crypto = require('crypto');

const Utils = {};

Utils.generateKey = function () {

    var sha = crypto.createHash( 'sha256' );
    sha.update( Math.random().toString() );

    return sha.digest( 'hex' );

};

module.exports = Utils;