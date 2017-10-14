var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traineeSchema = new Schema({
    firstName: { type: String, required: true, unique: false },
    lastName: { type: String, required: true, unique: false },
    address: { type: String, required: false, unique: false },
    birthdate: { type: Date, required: false},
    facebook: { type: String, required: false, unique: false },
    height: { type: String, required: false, unique: false },
    phone: { type: String, required: false, unique: false },
    medicalStatus: { type: String, required: false, unique: false },
    medicine: { type: String, required: false, unique: false },
    trainingPackageList: [{type: Schema.Types.ObjectId, ref: 'TrainingPackage'}],
    trainingStatusList: [{type: Schema.Types.ObjectId, ref: 'TrainingStatus'}],
    goalList: [{type: Schema.Types.ObjectId, ref: 'Goal'}],
    trainingSessionList: [{type: Schema.Types.ObjectId, ref: 'TrainingSession'}],
    trainerRecommendationList: [{type: Schema.Types.ObjectId, ref: 'TrainerRecommendation'}]
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]
});
var Trainee = mongoose.model('Trainee', traineeSchema);
module.exports = Trainee;