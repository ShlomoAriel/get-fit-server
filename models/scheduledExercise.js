var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduledExerciseSchema = new Schema({
    order: { type: Number, required: true, unique: true },
    weekDay: { type: Number, required: true, unique: false },
    sets: { type: Number, required: true, unique: false },
    reps: { type: Number, required: true, unique: false },
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: false },
    exercise:{ type: Schema.ObjectId, ref: 'Exercise', required: true },
});
var ScheduledExercise = mongoose.model('ScheduledExercise', scheduledExerciseSchema);
module.exports = ScheduledExercise;