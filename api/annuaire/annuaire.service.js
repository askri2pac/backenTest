const httpStatus = require('http-status-codes');
const db = require('../../_helpers/db');
const Annuaire = db.Annuaire;
const User = db.User;
module.exports = {
    findAnnuaire,
};

async function findAnnuaire(title, adresse) {

    const getallData = function () {
        return new Promise((resolve, reject) => {
            Annuaire.findOne({title: title})
                .exec()
                .then(function (results) {
                    return resolve(results);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
    try {
        const data = await getallData();
        return data;
    } catch (error) {
        throw error;
    }
}

handleErrorCatch = (res, statusCode) => {
    let status = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return err => {
        console.error(err);
        return res.status(status).json(err);
    };
};