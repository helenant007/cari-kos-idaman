var express = require("express");
var router = express.Router(); 
var isLoggedIn = require("../middleware/isLoggedIn");


router.use(isLoggedIn);

router.get("/", index);
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

res.redirect("/");


}


