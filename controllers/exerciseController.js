var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , ExerciseModel = require('../models/exercise')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);

router.get('/api/getExercises', passport.authenticate('jwt', { session: false }), function (req, res) {
    ExerciseModel.find().populate('type').exec(function (err, exercises) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(exercises);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addExercise', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding exercise');
    var exercise = new ExerciseModel(req.body);
    exercise.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateExercise/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Exercise: ' + req.body.name + ' ' + req.body.value);
    ExerciseModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newExercise) {
            if (err) {
                res.send('Error updating Exercise\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteExercise/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    ExerciseModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newExercise) {
            if (err) {
                res.send('Error deleting Exercise\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
