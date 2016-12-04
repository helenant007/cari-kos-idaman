var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
    tanggal          : Date,
    nama             : String,
    alamat           : String,
    genderPenghuni   : String,
    jumlahKamar      : Number,
    luas             : Number,
    jamBertamu       : String,
    hewanPeliharaan  : String,
    harga            : Number,
    _owner           : mongoose.SchemaTypes.ObjectId,
    fasilitasKamar   : [String],
    fasilitasSekitar : [String]
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
