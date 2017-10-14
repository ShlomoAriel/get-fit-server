var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduledExreciseDoneSchema = new Schema({
    scheduledExrecise:{ type: Schema.ObjectId, ref: 'ScheduledExrecise', required: true },
    date: { type: Date, required: true}

});
var ScheduledExreciseDone = mongoose.model('ScheduledExreciseDone', scheduledExreciseDoneSchema);
module.exports = ScheduledExreciseDone;