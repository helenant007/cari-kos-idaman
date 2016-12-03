var mongoose = require("mongoose");
var Account = require("./account");
var encrypt = require("../core/encrypt");

module.exports.makeAdmin = makeAdmin;
module.exports.makeBuyer = makeBuyer;
module.exports.makeSeller = makeSeller;


function makeAdmin(username, password, callback){
    encrypt.hash(password, function(err,hash){

        var account = new Account({
            username: username,
            passwordhash: hash,
            role: "admin",
        });
        callback(null, account);

    });
}

function makeBuyer(username, password, email, callback){
    encrypt.hash(password, function(err,hash){

        var now = Date.now();
        var duration = 15768000000;  

        var account = new Account({
            username: username,
            passwordhash: hash,
            email: email,
            role: "buyer",
            freetrial: true,
            freetrial_exp: (now + duration),
        });

        callback(null, account);

    });
}

function makeSeller(username, password, email, callback){
    encrypt.hash(password, function(err,hash){
        var account = new Account({
            username: username,
            passwordhash: hash,
            email: email,
            role: "seller",
            premium: false,
        });
        callback(null, account);
    });
}
