var express = require("express");
var app = express();
var session = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var routes = require("./routes"); 

mongoose.connect("mongodb://admin:admin@ds119578.mlab.com:19578/dbcki");
app.use(session({
  secret: '@*(69^&$39(&%($%&$#^@3453)))',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

/*
var auth = require("./core/authentication");
app.use(function(req,res,next){
  auth.isLoggedIn(req.session, function(err,isLoggedIn, model){
    if(isLoggedIn){
      next();
    } else {
      auth.login(req.session, "darwan", "asd123", function(err,account){
        next();
      });
    }
  })
})
*/

app.use("/", routes.home); 
app.use("/", routes.shared);
app.use("/seller", routes.seller);
app.use("/admin", routes.admin);
app.use("/buyer", routes.buyer);


app.listen(process.env.PORT, function(){
    console.log("App started on port 3000");
});
