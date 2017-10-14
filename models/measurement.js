var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var measurementSchema = new Schema({
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true, unique: true },
    traineeStatus:{ type: Schema.ObjectId, ref: 'TraineeStatus', required: true },
});
var Measurement = mongoose.model('Measurement', measurementSchema);
module.exports = Measurement;