var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , TrainingSessionModel = require('../models/trainingSession')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);


//----------------------------------------------------------------------------------------------------
router.get('/api/getTrainingSessionByTrainee/:id', (req, res) => {
    TrainingSessionModel.find(
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
router.get('/api/getTrainingSessions', passport.authenticate('jwt', { session: false }), function (req, res) {
    TrainingSessionModel.find().exec(function (err, TrainingSessions) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(TrainingSessions);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addTrainingSession', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding trainingSession');
    var trainingSession = new TrainingSessionModel(req.body);
    trainingSession.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateTrainingSession/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating TrainingSession: ' + req.body.name + ' ' + req.body.value);
    TrainingSessionModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newTrainingSession) {
            if (err) {
                res.send('Error updating TrainingSession\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteTrainingSession/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    TrainingSessionModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newTrainingSession) {
            if (err) {
                res.send('Error deleting TrainingSession\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
