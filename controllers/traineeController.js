var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , TraineeModel = require('../models/trainee')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);

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
    trainee.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addTrainingPackageToTrainee/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    TraineeModel.findOne({ _id: req.param('traineeId') })
        .exec(function (err, trainee) {
            if (err) {
                res.send('error retriving trainee\n' + err);
            }
            else {
                let newTrainingPackageId = req.param('trainingPackageId');
                let isInArray = trainee.trainingPackage_ids.some(function (trainingPackage) {
                    return trainingPackage.equals(newTrainingPackageId);
                });
                console.log('isInArray: ' + isInArray);
                if (isInArray === false) {
                    trainee.trainingPackage_ids.push(req.param('trainingPackageId'));
                    trainee.save((err, newItem) => {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).send('OK');
                    });
                }
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateTrainee/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Trainee: ' + req.body.name + ' ' + req.body.value);
    TraineeModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newTrainee) {
            if (err) {
                res.send('Error updating Trainee\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteTrainee/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    TraineeModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newTrainee) {
            if (err) {
                res.send('Error deleting Trainee\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
