var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traineeStatusSchema = new Schema({
    name: { type: String, required: false, unique: false },
    weight: { type: Number, required: false, unique: false },
    image: { type: String, required: false, unique: false },
    date: { type: Date, required: true},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
});
var TraineeStatus = mongoose.model('TraineeStatus', traineeStatusSchema);
module.exports = TraineeStatus;