var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    text: { type: String, required: true, unique: true },
    link: { type: String, required: false, unique: false }
})
var Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise