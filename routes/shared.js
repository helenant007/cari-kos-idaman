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
    let dt = {}
    
    Account.findById(id).then(a => {
        dt.account = a
        console.log(dt)
        return Comment.find({_account:a.id})
    }).then(c => {
        dt.comments = c
        console.log(dt)
        return Post.find()
    }).then(posts => {
        dt.posts = posts
        console.log(dt)
        return dt
    }).then(data => {
        for(let comment of data.comments){
            let post = data.posts.find(p => p._id.toString() == comment._post.toString())
            comment.postTitle = post.nama
        }

        res.render("_master",{
            pageTitle: "Profile",
            pageBody: role+"/profile",
            profile: req.user,
            comments : data.comments
        });
    }).catch(err => {
        throw err
    })
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