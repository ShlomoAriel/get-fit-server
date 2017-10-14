var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trainingSessionSchema = new Schema({
    text: { type: String, required: true, unique: true },
    weekDay: { type: Number, required: true, unique: true },
    hour: { type: Date, required: true},
    done: { type: Boolean, required: true},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
    location:{ type: Schema.ObjectId, ref: 'Location', required: true },
    date: { type: Date, required: true},
});
var TrainingSession = mongoose.model('TrainingSession', trainingSessionSchema);
module.exports = TrainingSession;