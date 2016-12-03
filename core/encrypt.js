var passwordHash = require('password-hash');

module.exports.hash = hash;
module.exports.verifyHash = verifyHash;

/**
 * callback(err, hashedPassword)
 */
function hash(password, callback){

    callback(null, passwordHash.generate(password));

}

/**
 * callback(err, valid)
 */
function verifyHash(password, hash, callback){
    
    var valid = passwordHash.verify(password, hash);

    callback(null, valid);
}
