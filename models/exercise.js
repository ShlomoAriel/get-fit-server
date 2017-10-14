var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    text: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
    sets: { type: Number, required: true, unique: true },
    reps: { type: Number, required: true, unique: true }
})
var Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise