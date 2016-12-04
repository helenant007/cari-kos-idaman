var express = require("express");
var router = express.Router(); 
var isLoggedIn = require("../middleware/isLoggedIn");
var isAuthorized = require("../middleware/isAuthorized");


router.use(isLoggedIn);
router.use(isAuthorized( ["buyer", "admin"] ));


router.get("/", index);


module.exports = router;


function index(req,res){

    var comments = req.user.comments;

    res.render("buyer/_master", {
        page: "dashboard"
    });

}

function profile(req,res){

    var Comment = require("../schema/comment");

    Comment.find({_account_id: req.user._id}, function(err,docs){

        res.render("buyer/profile", {
            page: "profile",
            comments: docs
        });

    });

}