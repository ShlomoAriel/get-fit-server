var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , ScheduledExreciseModel = require('../models/scheduledExercise')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);

router.get('/api/getScheduledExrecises', passport.authenticate('jwt', { session: false }), function (req, res) {
    ScheduledExreciseModel.find().populate('type').exec(function (err, scheduledExercises) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(scheduledExercises);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addScheduledExrecise', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding scheduledExercise');
    var scheduledExercise = new ScheduledExreciseModel(req.body);
    scheduledExercise.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateScheduledExrecise/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating ScheduledExrecise: ' + req.body.name + ' ' + req.body.value);
    ScheduledExreciseModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newScheduledExrecise) {
            if (err) {
                res.send('Error updating ScheduledExrecise\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteScheduledExrecise/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    ScheduledExreciseModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newScheduledExrecise) {
            if (err) {
                res.send('Error deleting ScheduledExrecise\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
