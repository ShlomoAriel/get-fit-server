var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traineeGoalSchema = new Schema({
    date: { type: Date, required: true},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
    goal:{ type: Schema.ObjectId, ref: 'Goal', required: true },
    achieved: { type: Boolean, required: true },
});
var TraineeGoal = mongoose.model('TraineeGoal', traineeGoalSchema);
module.exports = TraineeGoal;