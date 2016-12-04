var express = require("express");
var router = express.Router(); 
var authentication = require("../core/authentication");

var nodemailer = require("nodemailer")


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
router.post("/emailsent", emailsentPOST);


module.exports = router;

/**
 * Controller untuk menghandle data yang dikirim dari contact.ejs ke route '/emailsent'
 * melalui html form.
 */
function emailsentPOST(req,res){

    var transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'cs.carikosidaman@gmail.com',
            pass: 'bisnissukses'
        }
    });

    var html = "";
    html = html + "Name     : " + req.body.name + " ("+req.body.email+")<br>";
    html = html + "Date     : " + Date.now().toString() + "<br>";
    html = html + "Subject  : " + req.body.subj + "<br><br>";
    html = html + "-- Message -- <br><br>" + req.body.subj + "<br><br>";
    html = html + req.body.msg;

    var mailOptionsAdmin = {
        from    : 'cs.carikosidaman@gmail.com',
        to      : 'helena_nt@live.com',
        subject : 'Cari Kos Idaman - Contact Form',
        html    : html
    };
    var mailOptionsAdminDar = {
        from    : 'cs.carikosidaman@gmail.com',
        to      : 'darwan318@gmail.com',
        subject : 'Cari Kos Idaman - Contact Form',
        html    : html
    };
    var mailOptionsSender = {
        from    : 'cs.carikosidaman@gmail.com',
        to      : req.body.email,
        subject : 'Cari Kos Idaman - Contact Form',
        html    : "Thank you for contacting us. We've received your email. Here's a copy of your mail: <br><br><br>" + html
    };
    transport.sendMail(mailOptionsAdminDar, function(err,info){
        if(err) throw err;
        res.json(info);
    });
    
}

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
var Post = require("../schema/post");
function housings(req,res){


    Post.find({}, function(err,docs){

        if(err){
            res.send(err);
            return;
        }

        docs.push(new Post({
            tanggal: Date.now(),
            nama: "Kost Grahayu Denpasar",
            alamat: "Jl. Pemuda IV No. 25 Renon Denpasar",
            genderPenghuni: "Campur",
            jumlahKamar: 15,
            luas: 16,
            jamBertamu: "Dibatasi",
            hewanPeliharaan: "Tidak",
            harga: 5000000,
            _owner: null,
            fasilitasKamar: ["AC", "Lemari","Kipas Angin", "Matras", "Meja Belajar"],
            fasilitasSekitar : ["ATM", "Tempat Ibadah", "Sekolah", "Lapangan", "Gym", "Mall", "Pom Bensin" ,"Kolam Renang", "Warteg" , "Satpam"]
        }))

        res.render("_master",{
            page: "Housings",
            posts : docs
        });
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
    var buyer = accountFactory.makeBuyer(req.body.fullname, req.body.uname, req.body.password, req.body.email, req.body.phone);

    buyer.save(function(err, acc){

        if(err) throw err;
        authentication.login(req.session, acc.username, req.body.password, function(err, account){

            
            if(err) return res.send(err);
            res.redirect("/" + acc.role);
            
        });

    });
}
