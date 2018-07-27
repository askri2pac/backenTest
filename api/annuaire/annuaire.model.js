const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    ref: {type: Number, unique: false, required: true },
    status: {type: Boolean, unique:false, required:true},
    email: {type: String, unique: false, required: true},
    adresse: {type: String, unique: false, required: true},
    phone: { type: String, unique: false, required: false},
    title: {type: String, unique: false, required: true}
});
schema.index( { adresse: "text" } );
schema.set('toJSON',{ virtuals: true });
module.exports = mongoose.model('produit', schema);
