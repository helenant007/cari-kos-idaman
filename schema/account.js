var mongoose = require("mongoose");

var AccountSchema = mongoose.Schema({
    username:  {type: String, unique: true, required:true},
    passwordhash: String,
    email: {type: String, unique: true},
    role : String,

    freetrial : Boolean,
    freetrial_exp : Date,
    premium: Boolean,
});

module.exports = mongoose.model("Account",AccountSchema);
