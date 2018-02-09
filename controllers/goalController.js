var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , GoalModel = require('../models/goal')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);


//-------------------------------------------------------------------------------------------------
router.get('/api/getGoals', passport.authenticate('jwt', { session: false }), function (req, res) {
    GoalModel.find().exec(function (err, Goals) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(Goals);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addGoal', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding goal');
    var goal = new GoalModel(req.body);
    goal.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateGoal/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Goal: ' + req.body.name + ' ' + req.body.value);
    GoalModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name, date: req.body.date, achieved: req.body.achieved} },
        { upsert: true },
        function (err, newGoal) {
            if (err) {
                res.send('Error updating Goal\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteGoal/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    GoalModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newGoal) {
            if (err) {
                res.send('Error deleting Goal\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
