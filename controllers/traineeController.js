var express = require('express')
  , router = express.Router()
  , UserModel = require('../models/user')
  , DietModel = require('../models/diet')
  , TrainingSessionModel = require('../models/trainingSession')
  , TraineeTrainingPackageModel = require('../models/traineeTrainingPackage')
  , TraineeStatusModel = require('../models/traineeStatus')
  , TraineeGoalModel = require('../models/traineeGoal')
  , SessionModel = require('../models/session')
  , ScheduledExerciseModel = require('../models/scheduledExercise')
  , PaymentModel = require('../models/payment')
  , HomeSessionModel = require('../models/homeSession')
  , TraineeModel = require('../models/trainee')
  , passport = require('passport')
  , app = express()

var traineeUtils = require('../utils/traineeUtils')
app.use(passport.initialize());
require('../config/passport')(passport);

router.get('/api/getTrainee/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    let getTraineeInfo =  (err, result) => {
        if(result.err){
            console.log('trainee info error: ' + result.err)
            res.send('find no good' + result.err);
        } else{
            console.log('trainee info: ' + result)
            res.json(result);
        }
    }
    TraineeModel.findOne({_id:req.params.id}).exec(function (err, trainee) {
        if (err) {
            res.send('find no good' + err)
        }
        else {
            traineeUtils.getTraineeInfo(trainee,getTraineeInfo)
        }
    })    
});
//-------------------------------------------------------------------------------------------------
router.get('/api/getTrainees', passport.authenticate('jwt', { session: false }), function (req, res) {
    TraineeModel.find().populate('type').exec(function (err, trainees) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(trainees);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addTrainee', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding trainee');
    var trainee = new TraineeModel(req.body);
    resultObject = {}
    if (!req.body.email || !req.body.password || !req.body.role) {
        res.json({ success: false, msg: 'Please pass email and password.' });
    } else {
        var newUser = new UserModel({
            email: req.body.email.toLowerCase(),
            name: req.body.firstName + ' ' + req.body.lastName,
            role: req.body.role,
            password: req.body.password
        });
        // save the user
        newUser.save(function (err, createdUser) {
            if (err) {
                return res.json({ success: false, msg: 'Username already exists. ' + err });
            }
            console.log('createdUser: ' + createdUser)
            trainee.user = createdUser._id;
            trainee.save((err, newItem) => {
                if (err) {
                    return next(err.code);
                }
                res.status(200).send('OK');
            });
        });
    }
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateTrainee/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Trainee: ' + req.body.name + ' ' + req.body.value);
    TraineeModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { 
            phone: req.body.phone,
            identityNumber: req.body.identityNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            birthdate: req.body.birthdate,
            facebook: req.body.facebook,
            height: req.body.height,
            medicalStatus: req.body.medicalStatus,
            medicine: req.body.medicine,
            comment: req.body.comment,
            email: req.body.email
        } 
        },
        { upsert: true },
        function (err, trainee) {
            if (err) {
                res.send('Error updating Trainee\n' + err);
            }
            else {
                res.json(trainee)
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteTrainee/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    TraineeModel.findById(req.params.id, function (err, newTrainee) {
            if (err) {
                res.send('Error deleting Trainee\n' + err);
            }
            else {
                trainee.remove( (err, response) =>{
                    if (err) {
                        res.send('Error deleting trainee\n' + err);
                    } else{
                        res.json(response)
                    }
                } )
            }
        });
});

module.exports = router
