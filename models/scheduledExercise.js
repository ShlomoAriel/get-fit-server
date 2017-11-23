var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduledExerciseSchema = new Schema({
    order: { type: Number, required: true, unique: false },
    weekDay: { type: Number, required: true, unique: false },
    sets: { type: Number, required: true, unique: false },
    reps: { type: Number, required: true, unique: false },
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true, unique: false},
    exercise:{ type: Schema.ObjectId, ref: 'Exercise', required: true, unique: false},
});
var ScheduledExercise = mongoose.model('ScheduledExercise', scheduledExerciseSchema);
module.exports = ScheduledExercise;