var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , TrainingPackageModel = require('../models/trainingPackage')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);

router.get('/api/getTrainingPackages', passport.authenticate('jwt', { session: false }), function (req, res) {
    TrainingPackageModel.find().populate('type').exec(function (err, trainingPackages) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(trainingPackages);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addTrainingPackage', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding trainingPackage');
    var trainingPackage = new TrainingPackageModel(req.body);
    trainingPackage.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateTrainingPackage/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating TrainingPackage: ' + req.body.name + ' ' + req.body.value);
    TrainingPackageModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newTrainingPackage) {
            if (err) {
                res.send('Error updating TrainingPackage\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteTrainingPackage/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    TrainingPackageModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newTrainingPackage) {
            if (err) {
                res.send('Error deleting TrainingPackage\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
