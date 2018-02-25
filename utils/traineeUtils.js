var DietModel = require('../models/diet')
  , TrainingSessionModel = require('../models/trainingSession')
  , TraineeTrainingPackageModel = require('../models/traineeTrainingPackage')
  , TraineeStatusModel = require('../models/traineeStatus')
  , TraineeGoalModel = require('../models/traineeGoal')
  , SessionModel = require('../models/session')
  , SessionNameModel = require('../models/sessionName')
  , ScheduledExerciseModel = require('../models/scheduledExercise')
  , PaymentModel = require('../models/payment')
  , HomeSessionModel = require('../models/homeSession')
  , TraineeModel = require('../models/trainee')
var async = require("async")

exports.getTraineeInfo = function (trainee, callback){

  console.log('traineeId: ' + trainee._id)
    async.parallel({
        Diet: function (cb){ DietModel.find({trainee:trainee._id}).exec(cb); },
        TrainingSession: function (cb){ TrainingSessionModel.find({trainee:trainee._id}).exec(cb); },
        TraineeTrainingPackage: function (cb){ TraineeTrainingPackageModel.find({trainee:trainee._id}).exec(cb); },
        TraineeStatus: function (cb){ TraineeStatusModel.find({trainee:trainee._id}).exec(cb); },
        TraineeGoal: function (cb){ TraineeGoalModel.find({trainee:trainee._id}).exec(cb); },
        Session: function (cb){ SessionModel.find({trainee:trainee._id}).exec(cb); },
        SessionName: function (cb){ SessionNameModel.find({trainee:trainee._id}).exec(cb); },
        ScheduledExercise: function (cb){ ScheduledExerciseModel.find({trainee:trainee._id}).exec(cb); },
        Payment: function (cb){ PaymentModel.find({trainee:trainee._id}).exec(cb); },
        HomeSesssion: function (cb){ HomeSessionModel.find({trainee:trainee._id}).exec(cb); },
    }, function(err, result){
      let finalResult = {
      }
      finalResult.trainee = trainee
      finalResult.models = result
      callback(err, finalResult)
    });
}