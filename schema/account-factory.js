var mongoose = require("mongoose");
var Account = require("./account");
var encrypt = require("../core/encrypt");

module.exports.makeAdmin = makeAdmin;
module.exports.makeBuyer = makeBuyer;
module.exports.makeSeller = makeSeller;



function makeAdmin(fullname, username, password){

    return new Account({
        fullname: fullname,
        username: username,
        passwordhash: encrypt.hash(password),
        role: "admin",
    });

}

function makeBuyer(fullname, username, password, email, phone){
    return new Account({
        fullname: fullname,
        username: username,
        passwordhash: encrypt.hash(password),
        email: email,
        phone: phone,
        role: "buyer",
        freetrial: true,
        freetrial_exp: (Date.now() + 15768000000),
    });
}

function makeSeller(fullname, username, password, email, phone){
    return new Account({
        fullname: fullname,
        username: username,
        passwordhash: encrypt.hash(password),
        email: email,
        phone: phone,
        role: "seller",
        premium: false,
    });
}
