var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traineeTrainingPackageSchema = new Schema({
    trainingPackage:{ type: Schema.ObjectId, ref: 'TrainingPackage', required: true },
    date: { type: Date, required: true},
    quantity: { type: Number, required: true}
});
var TraineeTrainingPackage = mongoose.model('TraineeTrainingPackage', traineeTrainingPackageSchema);
module.exports = TraineeTrainingPackage;