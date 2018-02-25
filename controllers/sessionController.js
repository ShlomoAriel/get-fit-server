var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , SessionModel = require('../models/session')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);


//----------------------------------------------------------------------------------------------------
router.get('/api/getSessionByTrainee/:id', (req, res) => {
    SessionModel.find(
        { trainee: req.params.id })
        .populate('trainingPackage')
        .populate('trainee')
        .populate('location')
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
router.get('/api/getSessions', passport.authenticate('jwt', { session: false }), function (req, res) {
    SessionModel.find().populate('location').populate('trainee').exec(function (err, Sessions) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(Sessions);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addSession', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding session');
    var session = new SessionModel(req.body);
    session.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(newItem);
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/upsertSession/', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('upserting Session: ' + req.body.name + ' ' + req.body.value);
    let id = req.body._id
    if (!id) {
        var session = new SessionModel(req.body);
        session.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.json(newItem);
    });
    } else{
        SessionModel.findOneAndUpdate(
            { _id: id},
            { $set: { text: req.body.text, date: req.body.date, start: req.body.start, end: req.body.end, text: req.body.text} },
            { upsert: true },
            function (err, newSession) {
                if (err) {
                    res.send('Error upserting Session\n' + err);
                }
                else {
                    res.json(newSession);
                }
            });
    }
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateSession/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Session: ' + req.body.name + ' ' + req.body.value);
    SessionModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { text: req.body.text, date: req.body.date, start: req.body.start, end: req.body.end, achieved: req.body.done} },
        { upsert: true },
        function (err, newSession) {
            if (err) {
                res.send('Error updating Session\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteSession/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    SessionModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newSession) {
            if (err) {
                res.send('Error deleting Session\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
