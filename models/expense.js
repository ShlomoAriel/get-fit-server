var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
    name: { type: String, required: true, unique: false }
    amount: { type: Number, required: true, unique: false }
    date: { type: Date, required: true, unique: false }
});
var Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;