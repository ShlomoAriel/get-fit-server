var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traineeStatusSchema = new Schema({
    name: { type: String, required: true, unique: true },
});
var TraineeStatus = mongoose.model('TraineeStatus', traineeStatusSchema);
module.exports = TraineeStatus;