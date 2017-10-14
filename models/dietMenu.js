var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dietSchema = new Schema({
    name: { type: String, required: true, unique: true },
    trainee:{ type: Schema.ObjectId, ref: 'Trainee', required: true },

});
var DietMenu = mongoose.model('DietMenu', dietSchema);
module.exports = DietMenu;