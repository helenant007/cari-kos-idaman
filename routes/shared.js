var express = require("express");
var router = express.Router(); 
var isLoggedIn = require("../middleware/isLoggedIn");
var isAuthorized = require("../middleware/isAuthorized");
var authentication = require("../core/authentication");


router.use(isLoggedIn);
router.use(isAuthorized( ["buyer", "admin", "seller"] ));

router.get("/profile", profile);
router.get("/logout", logout);

var Comment = require("../schema/comment");
var Account = require("../schema/account");
var Post = require("../schema/post");

function profile(req,res){
    var role = req.user.role;
    var id = req.user._id;
    var posts;

if(role !== "seller"){
    Account.findById(id, function(err, acc){
        Comment.find({_account : acc.id}, function(err, comments){
            Post.find({_id: comments._post},function (err,postt){
                
                for(var i = 0; i < postt.length; i++){
                    comments.postTitle = postt.subject;
                }

                res.render("_master",{
                    pageTitle: "Profile",
                    pageBody: role+"/profile",
                    profile: req.user,
                    comments : comments
                });

            });
         });

    });
}else{

                res.render("_master",{
                    pageTitle: "Profile",
                    pageBody: role+"/profile",
                    profile: req.user,
                });
}        
}



function logout(req,res){
    authentication.logout(req.session, function(){
        res.redirect("/");
    });
}


module.exports = router;