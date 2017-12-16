var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    title: { type: String},
    date: { type: Date, required: true},
    start: { type: Date, required: true},
    end: { type: Date, required: true},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
    location:{ type: Schema.ObjectId, ref: 'Location', required: false },
    done: { type: Boolean },
});
var Session = mongoose.model('Session', sessionSchema);
module.exports = Session;