/**
 * author Oleg .
 */
var utils = require ( '../utils/Utils.js' );
var UserModel = require('../../db/sql/Connection.js').models.users;


var Auth = {
    login: function ( userParams ) {
       return UserModel
            .findOne ({
                where: {
                    $or: [
                        {
                            email: userParams.email
                        },
                        {
                            username: userParams.email
                        }
                    ]
                }
            })
            .then ( function ( user ) {

                if ( !user ) {

                    return { error:'user is not found'}

                }

                var passwordHashData = utils.passwordHashing ( userParams.password, user.salt );
                var hashedPass = passwordHashData.passwordHash;

                if ( user.hash !== hashedPass && hashedPass ) {

                    return { error:'password doesnt match ' }

                }

                if ( user.disabled ) {

                    return { error:'Account is disabled.' };

                } else {
                    return user.dataValues ;
                }

                //

            } )
            .catch ( function ( err ) {

                return { error:err }

            } );

    }
};

module.exports = Auth;
