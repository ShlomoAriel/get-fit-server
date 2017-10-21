var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , ScheduledExerciseModel = require('../models/scheduledExercise')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);

router.get('/api/getScheduledExercises', passport.authenticate('jwt', { session: false }), function (req, res) {
    ScheduledExerciseModel.find().populate('type').exec(function (err, scheduledExercises) {
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
            return next(err.code);
        }
        res.status(200).send('OK');
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
