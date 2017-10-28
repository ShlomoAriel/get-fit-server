var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trainingPackageSchema = new Schema({
    name: { type: String, required: true, unique: false },
    amount: { type: Number, required: true, unique: false },
    sessions: { type: Number, required: true, unique: false },
    percent: { type: Number, required: true, unique: false }
});
var TrainingPackage = mongoose.model('TrainingPackage', trainingPackageSchema);
module.exports = TrainingPackage;