var express = require("express");
var router = express.Router(); 
var isLoggedIn = require("../middleware/isLoggedIn");


router.use(isLoggedIn);

router.get("/", index);
router.get("/addNewHouse",addNewHouse);

router.post("/postnewhouse", postnewhouse);

module.exports = router;

function index(req,res){
    res.redirect("/housings");
}

function profile(req, res){

    var user = req.user;
    
    res.render("_master",{
        pageTitle: "Profile",
        pageBody: "seller/profile"
    });
}

function addNewHouse(req,res){
    
    var user = req.user;
    
    res.render("_master",{
        pageTitle: "New House",
        pageBody: "/housings"
    });
}

var mongoose = require("mongoose");
var Post = require("../schema/post");

function postnewhouse(req, res){

    var post = new Post({
        tanggal          : Date.now(),
        nama             : req.body.nama,
        alamat           : req.body.alamat,
        genderPenghuni   : req.body.genderPenghuni,
        jumlahKamar      : req.body.jumlahKamar,
        luas             : req.body.luas,
        jamBertamu       : req.body.jamBertamu,
        hewanPeliharaan  : req.body.hewanPeliharaan,
        harga            : req.body.harga,
        _owner           : req.user,
        fasilitasKamar   : [req.body.fasilitasKamar],
        fasilitasSekitar : [req.body.fasilitasSekitar]
    });

    post.save().then(function(p){
        res.redirect("/housings");
    }, function(e){
        throw e;
    })

}
