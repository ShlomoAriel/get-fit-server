var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ScheduledExerciseModel = require('../models/scheduledExercise')
  , HomeSessionModel = require('../models/homeSession')

var sessionNameSchema = new Schema({
    name: { type: String},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true, unique: false},
})
sessionNameSchema.pre('remove', function(next) {
    ScheduledExerciseModel.remove({sessionName: this._id}).exec()
    HomeSessionModel.remove({sessionName: this._id}).exec()
    next()
})
var SessionName = mongoose.model('SessionName', sessionNameSchema)
module.exports = SessionName