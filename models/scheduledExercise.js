var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduledExerciseSchema = new Schema({
    order: { type: Number, required: true, unique: false },
    sets: { type: Number, required: false, unique: false },
    reps: { type: Number, required: false, unique: false },
    description: { type: String, required: false, unique: false },
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true, unique: false},
    sessionName:{ type: Schema.ObjectId, ref: 'SessionName', required: true, unique: false},
    exercise:{ type: Schema.ObjectId, ref: 'Exercise', required: true, unique: false},
    done: { type: Boolean },
});
var ScheduledExercise = mongoose.model('ScheduledExercise', scheduledExerciseSchema);
module.exports = ScheduledExercise;