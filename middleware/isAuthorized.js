
function makeMiddleware (roles){

    var roles = roles;
    
    return function middleware (req,res,next){

        for(i = 0; i < roles.length; i++)
            if(roles[i] == req.user.role) 
                return next();

        //res.send("You are not authorized to access this page");

    }    
}

module.exports = makeMiddleware;
