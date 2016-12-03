var express = require("express");
var router = express.Router(); 
var isLoggedIn = require("../middleware/isLoggedIn");


router.use(isLoggedIn);


router.get("/", index);

module.exports = router;


function index(req,res){

    var user = req.user;
    
    res.render("admin_test");


}
