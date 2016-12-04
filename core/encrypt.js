var passwordHash = require('password-hash');

module.exports.hash = hash;
module.exports.verifyHash = verifyHash;

/**
 * callback(err, hashedPassword)
 */
function hash(password){
    return passwordHash.generate(password);
}

/**
 * callback(err, valid)
 */
function verifyHash(password, hash){
    return passwordHash.verify(password, hash);
}
