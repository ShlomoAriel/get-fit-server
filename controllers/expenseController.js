var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , ExpenseModel = require('../models/expense')
  , app = express()

app.use(passport.initialize());
require('../config/passport')(passport);

router.get('/api/getExpenses', passport.authenticate('jwt', { session: false }), function (req, res) {
    ExpenseModel.find().populate('type').exec(function (err, expenses) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(expenses);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addExpense', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding expense');
    var expense = new ExpenseModel(req.body);
    expense.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateExpense/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Expense: ' + req.body.name + ' ' + req.body.value);
    ExpenseModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { upsert: true },
        function (err, newExpense) {
            if (err) {
                res.send('Error updating Expense\n' + err);
            }
            else {
                res.send(204);
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteExpense/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    ExpenseModel.findOneAndRemove(
        { _id: req.params.id },
        function (err, newExpense) {
            if (err) {
                res.send('Error deleting Expense\n' + err);
            }
            else {
                res.send(204);
            }
        });
});

module.exports = router
