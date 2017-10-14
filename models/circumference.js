var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var circumferenceSchema = new Schema({
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true, unique: true },
    traineeStatus:{ type: Schema.ObjectId, ref: 'TraineeStatus', required: true },
});
var Circumference = mongoose.model('Circumference', circumferenceSchema);
module.exports = Circumference;