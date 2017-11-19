var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dietSchema = new Schema({
    text: { type: String, required: true, unique: false },
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
    date: { type: Date, required: true}

});
var Diet = mongoose.model('Diet', dietSchema);
module.exports = Diet;