var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , TraineeTrainingPackageModel = require('../models/traineeTrainingPackage')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);


//----------------------------------------------------------------------------------------------------
router.get('/api/getTraineeTrainingPackageByTrainee/:id', (req, res) => {
    TraineeTrainingPackageModel.find(
        { trainee: req.params.id })
        .populate('trainee')
        .exec(function (err, packageList) {
            if (err) {
                res.send('Error updating Resource\n' + err);
            }
            else {
                res.send(packageList);
            }
        });
})
//-------------------------------------------------------------------------------------------------
router.get('/api/getTraineeTrainingPackages', passport.authenticate('jwt', { session: false }), function (req, res) {
    TraineeTrainingPackageModel.find().exec(function (err, TraineeTrainingPackages) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(TraineeTrainingPackages);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addTraineeTrainingPackage', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding traineeTrainingPackage');
    var traineeTrainingPackage = new TraineeTrainingPackageModel(req.body);
    traineeTrainingPackage.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateTraineeTrainingPackage/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating TraineeTrainingPackage: ' + req.body.name + ' ' + req.body.value);
    TraineeTrainingPackageModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newTraineeTrainingPackage) {
            if (err) {
                res.send('Error updating TraineeTrainingPackage\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteTraineeTrainingPackage/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    TraineeTrainingPackageModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newTraineeTrainingPackage) {
            if (err) {
                res.send('Error deleting TraineeTrainingPackage\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
