var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
    text: { type: String, required: true },
    date: { type: Date, required: true},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
    achieved: { type: Boolean, required: true },
});
var Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;