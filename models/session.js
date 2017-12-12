var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    text: { type: String},
    start: { type: Date, required: true},
    end: { type: Date, required: true},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
    location:{ type: Schema.ObjectId, ref: 'Location', required: true },
    done: { type: Boolea },
});
var Session = mongoose.model('Session', sessionSchema);
module.exports = Session;