var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , PaymentModel = require('../models/payment')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);


//----------------------------------------------------------------------------------------------------
router.get('/api/getPaymentByTrainee/:id', (req, res) => {
    PaymentModel.find(
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
router.get('/api/getPayments', passport.authenticate('jwt', { session: false }), function (req, res) {
    PaymentModel.find().exec(function (err, Payments) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(Payments);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addPayment', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding payment');
    var payment = new PaymentModel(req.body);
    payment.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updatePayment/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Payment: ' + req.body.name + ' ' + req.body.value);
    PaymentModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newPayment) {
            if (err) {
                res.send('Error updating Payment\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deletePayment/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    PaymentModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newPayment) {
            if (err) {
                res.send('Error deleting Payment\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
