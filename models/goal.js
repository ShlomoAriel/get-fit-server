var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
    name: { type: String, required: true},
});
var Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;