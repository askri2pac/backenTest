const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ref: {type: Number, unique: true, required: true },
    nom: {type: String, unique: false, required: true},
});

schema.set('toJSON',{ virtuals: true });
module.exports = mongoose.model('activites', schema);
