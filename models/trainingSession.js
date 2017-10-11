var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trainingSessionSchema = new Schema({
    text: { type: String, required: true, unique: true },
    date: { type: Date, required: true},
});
var TrainingSession = mongoose.model('TrainingSession', trainingSessionSchema);
module.exports = TrainingSession;