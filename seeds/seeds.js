var express = require("express");
var app = express();
var mongoose = require("mongoose");
var async = require("async");
var Post = require("../schema/post");

var AccountFactory = require("../schema/account-factory");


mongoose.connect("mongodb://admin:admin@ds119578.mlab.com:19578/dbcki");

console.log("Seed Database");


function begin(){
    makeDarmawan();
}

function makeAdmin(){
    var admin = AccountFactory.makeAdmin("administrator", "admin","admin");
    admin.save(function(err){
        if(err)throw err;
        console.log(admin);
        makeDarmawan();
    })
}

function makeDarmawan(){
    var darmawan = AccountFactory.makeSeller("Darmawan", "darwan", "asd123", "darwan318@gmail.com");
    darmawan.save(function(err){
        if(err) throw err;
        console.log(darmawan);
        makeDarPosts(darmawan);
    })
}

function makeDarPosts(dar){

    var post1 = new Post({
        tanggal: Date.now(),
        nama: "Kost Grahayu Denpasar",
        alamat: "Jl. Pemuda IV No. 25 Renon Denpasar",
        genderPenghuni: "Campur",
        jumlahKamar: 15,
        luas: 16,
        jamBertamu: "Dibatasi",
        hewanPeliharaan: "Tidak",
        harga: 5000000,
        _owner: dar,
        fasilitasKamar: ["AC", "Lemari","Kipas Angin", "Matras", "Meja Belajar"],
        fasilitasSekitar : ["ATM", "Tempat Ibadah", "Sekolah", "Lapangan", "Gym", "Mall", "Pom Bensin" ,"Kolam Renang", "Warteg" , "Satpam"]
    })
    post1.save(function(err){
        if (err) throw err;
        console.log(post1)
    })
}

begin();