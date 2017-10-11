var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trainingPackageSchema = new Schema({
    name: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, unique: true },
    sessions: { type: Number, required: true, unique: true }
});
var TrainingPackage = mongoose.model('TrainingPackage', trainingPackageSchema);
module.exports = TrainingPackage;