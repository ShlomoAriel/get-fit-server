var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , HomeSessionModel = require('../models/homeSession')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);
//----------------------------------------------------------------------------------------------------
router.get('/api/getHomeSessionByTrainee/:id', (req, res) => {
    HomeSessionModel.find(
        { trainee: req.params.id })
        .populate('sessionName')
        .populate('trainee')
        .exec(function (err, sessionList) {
            if (err) {
                res.send('Error updating Resource\n' + err);
            }
            else {
                res.send(sessionList);
            }
        });
})
//----------------------------------------------------------------------------------------------------
router.put('/api/upsertHomeSession/', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('upserting HomeSession: ' + req.body.name + ' ' + req.body.value);
    let id = req.body._id
    if (!id) {
        var homeSession = new HomeSessionModel(req.body);
        homeSession.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
    } else{
        HomeSessionModel.findOneAndUpdate(
            { _id: id},
            { $set: { text: req.body.text, date: req.body.date, done: req.body.done} },
            { upsert: true },
            function (err, newHomeSession) {
                if (err) {
                    res.send('Error upserting HomeSession\n' + err);
                }
                else {
                    res.send(204);
                }
            });
    }
});
//----------------------------------------------------------------------------------------------------
router.get('/api/getHomeSessions', passport.authenticate('jwt', { session: false }), function (req, res) {
    HomeSessionModel.find().populate('type').exec(function (err, homeSessions) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(homeSessions);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addHomeSession', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding homeSession');
    var homeSession = new   (req.body);
    homeSession.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addHomeSessions', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding homeSessions');
    HomeSessionModel.insertMany(req.body,(err, newItems) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateHomeSession/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating HomeSession: ' + req.body.name + ' ' + req.body.value);
    HomeSessionModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { done: req.body.done, date: req.body.date, title: req.body.title } },
        { upsert: true },
        function (err, newHomeSession) {
            if (err) {
                res.send('Error updating HomeSession\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteHomeSession/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    HomeSessionModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newHomeSession) {
            if (err) {
                res.send('Error deleting HomeSession\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
