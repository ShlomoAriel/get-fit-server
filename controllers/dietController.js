var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , DietModel = require('../models/diet')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);


//----------------------------------------------------------------------------------------------------
router.get('/api/getDietByTrainee/:id', (req, res) => {
    DietModel.find(
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
router.get('/api/getDiets', passport.authenticate('jwt', { session: false }), function (req, res) {
    DietModel.find().exec(function (err, Diets) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(Diets);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addDiet', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding diet');
    var diet = new DietModel(req.body);
    diet.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.json(newItem);
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateDiet/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Diet: ' + req.body.name + ' ' + req.body.value);
    DietModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newDiet) {
            if (err) {
                res.send('Error updating Diet\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteDiet/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    DietModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newDiet) {
            if (err) {
                res.send('Error deleting Diet\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
