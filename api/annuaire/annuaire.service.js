const httpStatus = require('http-status-codes');
const db = require('../../_helpers/db');
const ObjectId = require('mongodb').ObjectID;

const Annuaire = db.Produits;
module.exports = {
    findAnnuaire,
};

async function findAnnuaire(req, adresse) {

    const getallData = function () {

        const isnum = /^\d+$/.test(req);
        if (! isnum && ObjectId.isValid(req) ) {
            return new Promise((resolve, reject) => {
                Annuaire.find({ $and: [ { activite: ObjectId(req) }, { $text: { $search: adresse } } ] })
                    .exec()
                    .then(function (results) {
                        return resolve(results);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        } else if (! isnum && ! ObjectId.isValid(req) ){
            return new Promise((resolve, reject) => {
                Annuaire.find({ $and: [ { title: req }, { $text: { $search: adresse } } ] })
                    .exec()
                    .then(function (results) {
                        return resolve(results);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                Annuaire.find({ $and: [ { telephone: req }, { $text: { $search: adresse } } ] })
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
        return res.status(status).json(err);
    };
};*/
