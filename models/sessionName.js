var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionNameSchema = new Schema({
    name: { type: String},
    trainee: { type: Date, required: true},
});
var SessionName = mongoose.model('SessionName', sessionNameSchema);
module.exports = SessionName;