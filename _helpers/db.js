const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../api/users/user.modal'),
    Produits: require('../api/annuaire/annuaire.model'),
    Activites: require('../api/activities/activitie.model')
};