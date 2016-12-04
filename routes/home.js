var express = require("express");
var router = express.Router(); 
var authentication = require("../core/authentication");


router.use(function(req,res,next){
    res.locals.username = req.session.username;
    next();
})


router.get("/", index);
router.get("/freetrial", freetrial);
router.get("/villas", villas); 
router.get("/housings", housings);
router.get("/apartments", apartments);
router.get("/login", login);
router.get("/register", register);
router.get("/about", about);
router.get("/contact", contact);


router.post("/login", loginPOST);
router.post("/register", registerPOST);


module.exports = router;


function index(req,res){

    res.render("_master", {
        page: "Home"
    });

    //res.render("index");
}

function freetrial(req,res){
    res.render("ok", {
        page: "Free Trial"
    })
}

function villas(req,res){
    res.send("ok")
}

function housings(req,res){
    res.render("_master",{
        page: "Housings"
    });
}

function  apartments(req, res){
    res.send("ok")
}

function about(req, res){
    res.render("_master",{
        page: "About"
    });
}

function contact(req, res){
    
    res.render("_master", {
        page: "Contact"
    });

}

function login(req, res){
   

    res.render("_master", {
        page: "Login"
    });
    
}

function register(req, res){
    res.render("_master",{
        page: "Register",
    });
} 

function loginPOST(req,res){
    console.log(req.body);
    var uname = req.body.uname;
    var pass = req.body.pass;

    authentication.login(req.session, uname, pass, function(err, account, role){

        if(err) return res.send(err);
        res.redirect("/" + role);

    });
}

var accountFactory = require("../schema/account-factory");

function registerPOST(req,res){
    accountFactory.makeBuyer( req.body.uname, req.body.password, req.body.email,  function(err,buyer){
        buyer.save(function(err, acc){

            if(err) throw err;
            authentication.login(req.session, acc.username, req.body.password, function(err, account){
                
                if(err) return res.send(err);
                res.redirect("/" + acc.role);
                
            });

        });
    });
}
