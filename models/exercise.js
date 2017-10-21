var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    name: { type: String, required: true, unique: true },
    text: { type: String, required: true, unique: false },
    link: { type: String, required: false, unique: false }
})
var Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise