var express = require("express");
var router = express.Router(); 
var isLoggedIn = require("../middleware/isLoggedIn");
var isAuthorized = require("../middleware/isAuthorized");
var authentication = require("../core/authentication");


router.use(isLoggedIn);
router.use(isAuthorized( ["buyer", "admin", "seller"] ));


router.get("/profile", profile);
router.get("/logout", logout);

function profile(req,res){
    var role = req.user.role;

    res.render(role+"/profile"); //dar klo gini kira2 bisa ga ya?
    //bsa hausnya cb deh
}

function logout(req,res){
    authentication.logout(req.session, function(){
        res.redirect("/");
    });
}


module.exports = router;