var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traineeTrainingPackageSchema = new Schema({
    name: { type: String, required: true, unique: false },
    amount: { type: Number, required: true, unique: false },
    sessions: { type: Number, required: true, unique: false },
    percent: { type: Number, required: true, unique: false },
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
    date: { type: Date, required: true},
    quantity: { type: Number, required: true}
});
var TraineeTrainingPackage = mongoose.model('TraineeTrainingPackage', traineeTrainingPackageSchema);
module.exports = TraineeTrainingPackage;