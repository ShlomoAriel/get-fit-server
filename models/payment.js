var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    text: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true }
});
var Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;