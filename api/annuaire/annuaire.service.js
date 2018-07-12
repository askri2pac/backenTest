const httpStatus = require('http-status-codes');
const db = require('../../_helpers/db');
// import annuaire from './annuaire.model';
module.exports = {
    findAnnuaire,
};

async function findAnnuaire(title, adresse) {
    console.log('title ==> ',title);
    console.log('adresse ==> ',adresse);
    let option = null;
    option = { title: title };
    return new Promise(function (resolve, reject) {
        db.Annuaire.findOne(option)
            .exec()
            .then(result => {
                console.log('111');
                if(!result){
                    reject(false);
                    console.log('errrrrrrr');
                }else {
                    console.log('222');
                    resolve(result);
                    console.log('greaaaat');
                }
            })
            .catch(function(err) {
                console.log('il y a un erreur', err);
            });
    })
}

handleErrorCatch = (res, statusCode) => {
    let status = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return err => {
        console.error(err);
        return res.status(status).json(err);
    };
};