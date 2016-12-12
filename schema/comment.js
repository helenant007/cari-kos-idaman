var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    
    _account : mongoose.SchemaTypes.ObjectId,
    _post : mongoose.SchemaTypes.ObjectId,

    subject: String,
    body: String,

});

module.exports = mongoose.model("Comment", CommentSchema);