var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , LocationModel = require('../models/location')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);

router.get('/api/getLocations', passport.authenticate('jwt', { session: false }), function (req, res) {
    LocationModel.find().populate('type').exec(function (err, locations) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(locations);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addLocation', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding location');
    var location = new LocationModel(req.body);
    location.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateLocation/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Location: ' + req.body.name + ' ' + req.body.value);
    LocationModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newLocation) {
            if (err) {
                res.send('Error updating Location\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteLocation/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    LocationModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newLocation) {
            if (err) {
                res.send('Error deleting Location\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
