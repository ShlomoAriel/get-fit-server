var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , SessionNameModel = require('../models/sessionName')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);
//----------------------------------------------------------------------------------------------------
router.get('/api/getSessionNameByTrainee/:id', (req, res) => {
    SessionNameModel.find(
        { trainee: req.params.id })
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
router.get('/api/getSessionNames', passport.authenticate('jwt', { session: false }), function (req, res) {
    SessionNameModel.find().populate('type').exec(function (err, sessionNames) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(sessionNames);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addSessionName', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding sessionName');
    var sessionName = new SessionNameModel(req.body);
    sessionName.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.json(newItem);
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateSessionName/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating SessionName: ' + req.body.name + ' ' + req.body.value);
    SessionNameModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newSessionName) {
            if (err) {
                res.send('Error updating SessionName\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteSessionName/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    SessionNameModel.findById(req.params.id, function (err, sessionName) {
            if (err) {
                res.send('Error finding for delete SessionName\n' + err);
            }
            else {
                sessionName.remove( (err, response) =>{
                    if (err) {
                        res.send('Error deleting SessionName\n' + err);
                    } else{
                        res.json(response)
                    }
                } )
            }
        });
});

module.exports = router
