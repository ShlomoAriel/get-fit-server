var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionNameSchema = new Schema({
    name: { type: String},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true, unique: false},
});
var SessionName = mongoose.model('SessionName', sessionNameSchema);
module.exports = SessionName;