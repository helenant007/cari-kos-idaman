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


app.use("/", routes.home); 
app.use("/admin", routes.admin);
app.use("/buyer", routes.buyer);


app.listen(3000, function(){
    console.log("App started on port 3000");
});
