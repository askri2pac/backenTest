const httpStatus = require('http-status-codes');
const db = require('../../_helpers/db');
const ObjectId = require('mongodb').ObjectID;

const Annuaire = db.Produits;
module.exports = {
    findAnnuaire,
};

async function findAnnuaire(id, adresse) {

    const getallData = function () {

        const isnum = /^\d+$/.test(id);

        if (! isnum ) {
            return new Promise((resolve, reject) => {
                Annuaire.find({ $and: [ { activite: ObjectId(id) }, { $text: { $search: adresse } } ] })
                    .exec()
                    .then(function (results) {
                        return resolve(results);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        } else {
            console.log('num');
            return new Promise((resolve, reject) => {
                Annuaire.find({ $and: [ { telephone: id }, { $text: { $search: adresse } } ] })
                    .exec()
                    .then(function (results) {
                        return resolve(results);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        }

    };
    try {
        const data = await getallData();
        return data;
    } catch (error) {
        throw error;
    }
}

/*
handleErrorCatch = (res, statusCode) => {
    let status = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return err => {
        console.error(err);
        return res.status(status).json(err);
    };
};*/
