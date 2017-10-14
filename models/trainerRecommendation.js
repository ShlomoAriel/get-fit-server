var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var trainerRecommendationSchema = new Schema({
    text: { type: String, required: true, unique: true },
    traineeComment: { type: String, required: false, unique: true },
    trainerComment: { type: String, required: false, unique: true },
    date: { type: Date, required: true},

})
var TrainerRecommendation = mongoose.model('TrainerRecommendation', trainerRecommendationSchema)
module.exports = TrainerRecommendation