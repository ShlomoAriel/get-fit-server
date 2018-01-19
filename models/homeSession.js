var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homeSessionSchema = new Schema({
    title: { type: String},
    date: { type: Date, required: true},
    sessionName:{ type: Schema.ObjectId, ref: 'SessionName', required: false },
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
    done: { type: Boolean },
});
var HomeSession = mongoose.model('HomeSession', homeSessionSchema);
module.exports = HomeSession;