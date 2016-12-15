var express = require("express");
var router = express.Router(); 
var isLoggedIn = require("../middleware/isLoggedIn");
var isAuthorized = require("../middleware/isAuthorized");


router.use(isLoggedIn);
//router.use(isAuthorized( ["buyer", "admin"] ));


router.get("/", index);

//btw hati hati ini cara akses route ini URL nya apa? /buyer/postcomment ? yap betull
router.post("/postcomment",commentPOST);


module.exports = router;

var Comment = require("../schema/comment");

function commentPOST(req, res){
    var postID = req.body.postID;
    var subject = req.body.subject;
    var body = req.body.body;
    var acc = req.user;

    var comment = new Comment({
        _account : acc,
        _post :postID,
        subject: subject,
        body: body
    });

    comment.save(function(err, comment, num){
        if(err) throw err;
        res.redirect("/postdetail/" + comment._post);
    });

}

function index(req,res){

    var comments = req.user.comments;

    res.redirect("/");

}

