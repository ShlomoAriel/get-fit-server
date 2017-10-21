var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduledExerciseDoneSchema = new Schema({
    scheduledExercise:{ type: Schema.ObjectId, ref: 'ScheduledExrecise', required: true },
    date: { type: Date, required: true}

});
var ScheduledExreciseDone = mongoose.model('ScheduledExreciseDone', scheduledExerciseDoneSchema);
module.exports = ScheduledExreciseDone;