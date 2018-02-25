var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DietModel = require('../models/diet')
  , TrainingSessionModel = require('../models/trainingSession')
  , TraineeTrainingPackageModel = require('../models/traineeTrainingPackage')
  , TraineeStatusModel = require('../models/traineeStatus')
  , TraineeGoalModel = require('../models/traineeGoal')
  , SessionModel = require('../models/session')
  , ScheduledExerciseModel = require('../models/scheduledExercise')
  , PaymentModel = require('../models/payment')
  , HomeSessionModel = require('../models/homeSession')

var traineeSchema = new Schema({
    identityNumber: { type: String, required: false, unique: false },
    firstName: { type: String, required: true, unique: false },
    lastName: { type: String, required: true, unique: false },
    address: { type: String, required: false, unique: false },
    birthdate: { type: Date, required: false},
    facebook: { type: String, required: false, unique: false },
    height: { type: String, required: false, unique: false },
    email: { type: String, required: false, unique: false },
    phone: { type: String, required: false, unique: false },
    medicalStatus: { type: String, required: false, unique: false },
    medicine: { type: String, required: false, unique: false },
    comment: { type: String, required: false, unique: false },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});
traineeSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    DietModel.remove({trainee: this._id}).exec();
    TrainingSessionModel.remove({trainee: this._id}).exec();
    TraineeTrainingPackageModel.remove({trainee: this._id}).exec();
    TraineeStatusModel.remove({trainee: this._id}).exec();
    TraineeGoalModel.remove({trainee: this._id}).exec();
    SessionModel.remove({trainee: this._id}).exec();
    ScheduledExerciseModel.remove({trainee: this._id}).exec();
    PaymentModel.remove({trainee: this._id}).exec();
    HomeSessionModel.remove({trainee: this._id}).exec();
    next();
});
var Trainee = mongoose.model('Trainee', traineeSchema);
module.exports = Trainee;