var authentication = require("../core/authentication");


function middleware(req,res,next){

    authentication.isLoggedIn(req.session, function(err, isloggedin, user){
        if(err) throw err;

        if(isloggedin == true){
            req.user = user;
            res.locals.username = user.username;
            return next();  
        } 
        else res.redirect("/");

    });

}


module.exports = middleware;
