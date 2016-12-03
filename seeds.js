var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://admin:admin@ds119578.mlab.com:19578/dbcki");

console.log("Seed Database");

var Account = require("./schema/account");
Account.findOne({username: "Darmawan"}, function(err, u){

    var Comment = require("./schema/comment");

    var c1 = new Comment({
        _account_id : u._id,
        _post_id : u._id,
        comment: "Nice nih kamarnya" 
    });

    var c2 = new Comment({
        _account_id : u._id,
        _post_id : u._id,
        comment: "Mevvah sekali kamarnya" 
    });

    Comment.insertMany([c1,c2], function(err, cs){

        if (err) throw err;

        console.log(cs);
        

    });
});

return;

var AccountFactory = require("./schema/account-factory");

AccountFactory.makeAdmin("admin", "admin", function(err, admin){

    admin.save(function(err, a){

        if(err) throw err;
        console.log("Ok");
        process.exit(0);

    });

});
