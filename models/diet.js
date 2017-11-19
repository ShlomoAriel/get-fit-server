var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dietSchema = new Schema({
    name: { type: String, required: true, unique: true },
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },

});
var Diet = mongoose.model('Diet', dietSchema);
module.exports = Diet;