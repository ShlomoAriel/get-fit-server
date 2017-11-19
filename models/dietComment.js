var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dietCommentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    date: { type: Date, required: true}
    user:{ type: Schema.ObjectId, ref: 'User', required: true },
    diet:{ type: Schema.ObjectId, ref: 'Diet', required: true },

});
var DietComment = mongoose.model('DietComment', dietCommentSchema);
module.exports = DietComment;