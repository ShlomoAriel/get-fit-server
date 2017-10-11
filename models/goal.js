var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
    text: { type: String, required: true, unique: true },
});
var Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;