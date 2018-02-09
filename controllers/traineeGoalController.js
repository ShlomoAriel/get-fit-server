var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , TraineeGoalModel = require('../models/traineeGoal')
  , app = express()

app.use(passport.initialize())
require('../config/passport')(passport)


//----------------------------------------------------------------------------------------------------
router.get('/api/getTraineeGoals/:id', (req, res) => {
    TraineeGoalModel.find(
        { trainee: req.params.id })
        .populate('trainee').populate('goal')
        .exec(function (err, goalList) {
            if (err) {
                res.send('Error updating Resource\n' + err)
            }
            else {
                res.send(goalList)
            }
        })
})
//-------------------------------------------------------------------------------------------------
router.post('/api/addTraineeGoal', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding traineeGoal')
    var traineeGoal = new TraineeGoalModel(req.body)
    traineeGoal.save((err, newItem) => {
        if (err) {
            return next(err.code)
        }
        res.status(200).send('OK')
    })
})
//-------------------------------------------------------------------------------------------------
router.post('/api/addTraineeGoals', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding traineeGoal')

    function traineeGoalObject(goalId) { 
        return {
            achieved:req.body.achieved,
            trainee:req.body.trainee,
            date:req.body.date,
            goal:goalId,
        }
    }

    let goals = req.body.values.split(',').reduce( (traineeGoals, goalId) =>{
        traineeGoals.push(traineeGoalObject(goalId))
        return traineeGoals
    }, [])

    console.log(goals)
    var traineeGoal = new TraineeGoalModel(req.body)
    traineeGoal.save((err, newItem) => {
        if (err) {
            return next(err.code)
        }
        res.status(200).send('OK')
    })
})
//----------------------------------------------------------------------------------------------------
router.put('/api/updateTraineeGoal/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating TraineeGoal: ' + req.body.name + ' ' + req.body.value)
    TraineeGoalModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { date: req.body.date, achieved: req.body.achieved} },
        { upsert: true },
        function (err, newTraineeGoal) {
            if (err) {
                res.send('Error updating TraineeGoal\n' + err)
            }
            else {
                res.send(204)
            }
        })
})
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteTraineeGoal/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    TraineeGoalModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newTraineeGoal) {
            if (err) {
                res.send('Error deleting TraineeGoal\n' + err)
            }
            else {
                res.send(204)
            }
        })
})

module.exports = router
