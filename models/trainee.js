var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traineeSchema = new Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    birthdate: { type: Date, required: true},
    email: { type: String, required: true, unique: true },
    facebook: { type: String, required: true, unique: true },
    height: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    medicalStatus: { type: String, required: true, unique: true },
    medicine: { type: String, required: true, unique: true },
    trainingPackages: [{type: Schema.Types.ObjectId, ref: 'TrainingPackage'}]
    goals: [{type: Schema.Types.ObjectId, ref: 'Goal'}]
    trainingSessions: [{type: Schema.Types.ObjectId, ref: 'TrainingSession'}]
});
var Trainee = mongoose.model('Trainee', traineeSchema);
module.exports = Trainee;