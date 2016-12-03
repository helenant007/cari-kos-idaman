var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    
    _account_id : mongoose.SchemaTypes.ObjectId,
    _post_id : mongoose.SchemaTypes.ObjectId,

    comment: String,

});

module.exports = mongoose.model("Comment", CommentSchema);