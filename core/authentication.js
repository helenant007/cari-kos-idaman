var Account = require("../schema/account");
var encrypt = require("../core/encrypt");

module.exports.isLoggedIn = isLoggedIn;
module.exports.login = login;
module.exports.logout = logout;

/**
 * callback(err, isloggedin, userModel)
 */
function isLoggedIn(session, callback){
    if( session.login == true){
        callback(null, true, session.user);
    } else {
        callback(null, false);
    }
}

/**
 * @example function(err, account)
 */
function login(session, username, password, callback){
    Account.findOne({username: username}, function(err, acc){

        if(err) throw err;
        if(acc==null) return callback("User not found");

        encrypt.verifyHash(password, acc.passwordhash, function(err,valid){

            if (err) throw err;

            if(valid == true){
                session.login = true;
                session.user = acc;
                session.username = acc.username;
                callback(null, acc, acc.role); 
            } else {
                return callback("Password doesn't match");
            }

        });

    });
}

/**
 * @example function(err)
 */
function logout(session, callback){
    session.login = false;
    session.user = null;
    session.username = null;
    callback(null);
}