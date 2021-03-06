var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , ScheduledExerciseModel = require('../models/scheduledExercise')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);

router.get('/api/getTraineeScheduledExercises', passport.authenticate('jwt', { session: false }), function (req, res) {
    ScheduledExerciseModel.find({
            trainee: req.param('trainee')
        })
    .sort('order')
    .populate('exercise').populate('trainee').exec(function (err, scheduledExercises) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(scheduledExercises);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.get('/api/getTraineeScheduledExercisesByDay', passport.authenticate('jwt', { session: false }), function (req, res) {
    ScheduledExerciseModel.find({
            trainee: req.param('trainee'),
            sessionName: req.param('sessionName')
        })
    .sort('order')
    .populate('exercise').populate('trainee').exec(function (err, scheduledExercises) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(scheduledExercises);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.get('/api/getTraineeScheduledExercisesBySessionName', passport.authenticate('jwt', { session: false }), function (req, res) {
    ScheduledExerciseModel.find({
            trainee: req.param('trainee'),
            sessionName: req.param('sessionName')
        })
    .sort('order')
    .populate('exercise').populate('trainee').exec(function (err, scheduledExercises) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(scheduledExercises);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.get('/api/getScheduledExercises', passport.authenticate('jwt', { session: false }), function (req, res) {
    ScheduledExerciseModel.find().populate('exercise').populate('trainee').exec(function (err, scheduledExercises) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(scheduledExercises);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addScheduledExercise', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding scheduledExercise');
    var scheduledExercise = new ScheduledExerciseModel(req.body);
    scheduledExercise.save((err, newItem) => {
        if (err) {
            console.log('scheduledExercise saving error ' + err);
            return next(err.code);
        }
        res.json(newItem);
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateScheduledExercise/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating ScheduledExercise: ' + req.body.name + ' ' + req.body.value);
    ScheduledExerciseModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newScheduledExercise) {
            if (err) {
                res.send('Error updating ScheduledExercise\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteScheduledExercise/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    ScheduledExerciseModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newScheduledExercise) {
            if (err) {
                res.send('Error deleting ScheduledExercise\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
