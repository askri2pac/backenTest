const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    ref: {type: Number, unique: true, required: true },
    status: {type: Boolean, unique:true, required:true},
    email: {type: String, unique: true, required: true},
    adresse: {type: String, unique: true, required: true},
    phone: { type: String, unique: true, required: false},
    title: {type: String, unique: true, required: true}
});

schema.set('toJSON',{ virtuals: true });
module.exports = mongoose.model('annuaire', schema);