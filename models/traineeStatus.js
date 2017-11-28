var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traineeStatusSchema = new Schema({
    name: { type: String, required: false, unique: false },
    weight: { type: Number, required: false, unique: false },
    armCirc: { type: Number, required: false, unique: false },
    chestCirc: { type: Number, required: false, unique: false },
    legCirc: { type: Number, required: false, unique: false },
    assCirc: { type: Number, required: false, unique: false },
    soulderCirc: { type: Number, required: false, unique: false },
    waistCirc: { type: Number, required: false, unique: false },
    image: { type: String, required: false, unique: false },
    date: { type: Date, required: true},
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },
});
var TraineeStatus = mongoose.model('TraineeStatus', traineeStatusSchema);
module.exports = TraineeStatus;