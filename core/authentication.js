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


        if (encrypt.verifyHash(password, acc.passwordhash)){

                session.login = true;
                session.user = acc;
                session.username = acc.username;
                session.role = acc.role;
                callback(null, acc, acc.role); 
            
        }   else {
                return callback("Password doesn't match");
        }

    });
}

/**
 * @example function(err)
 */
function logout(session, callback){
    session.login = false;
    session.user = undefined;
    session.username = undefined;
    callback(null);
}