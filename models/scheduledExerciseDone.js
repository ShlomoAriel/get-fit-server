var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduledExerciseDoneSchema = new Schema({
    scheduledExercise:{ type: Schema.ObjectId, ref: 'ScheduledExercise', required: true },
    date: { type: Date, required: true}

});
var ScheduledExerciseDone = mongoose.model('ScheduledExerciseDone', scheduledExerciseDoneSchema);
module.exports = ScheduledExerciseDone;