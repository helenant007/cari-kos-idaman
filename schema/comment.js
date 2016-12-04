var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    
    _account : mongoose.SchemaTypes.ObjectId,
    _post : mongoose.SchemaTypes.ObjectId,

    comment: String,

});

module.exports = mongoose.model("Comment", CommentSchema);