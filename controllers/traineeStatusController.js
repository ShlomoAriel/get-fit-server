var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , TraineeStatusModel = require('../models/traineeStatus')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);


//----------------------------------------------------------------------------------------------------
router.get('/api/getTraineeStatusByTrainee/:id', (req, res) => {
    TraineeStatusModel.find(
        { trainee: req.params.id })
        .populate('trainingPackage').populate('trainee')
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
router.get('/api/getTraineeStatuss', passport.authenticate('jwt', { session: false }), function (req, res) {
    TraineeStatusModel.find().exec(function (err, TraineeStatuss) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(TraineeStatuss);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addTraineeStatus', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding traineeStatus');
    var traineeStatus = new TraineeStatusModel(req.body);
    traineeStatus.save((err, newItem) => {
        if (err) {
            return next(err);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateTraineeStatus/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating TraineeStatus: ' + req.body.name + ' ' + req.body.value);
    TraineeStatusModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newTraineeStatus) {
            if (err) {
                res.send('Error updating TraineeStatus\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteTraineeStatus/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    TraineeStatusModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newTraineeStatus) {
            if (err) {
                res.send('Error deleting TraineeStatus\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
