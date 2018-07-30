import * as async from 'async';
import _ from 'lodash';
const httpStatus = require('http-status-codes');
const db = require('../../_helpers/db');
const activites = db.Activites;
const annuaires = db.Produits;
module.exports = {
    getActivies,
};

async function getActivies(term) {

    const options = {};
    const array1 = [];
    const array2 = [];
    options.activite = {'$regex': term, $options:'i'};
   // options.activite = term;

    const getallData = function () {
      //  console.log('111111111');
        return new Promise((resolve, reject) => {
            activites.find({ nom: { $regex: term, $options: 'i' } })
                .exec()
                .then(function (results) {
                    return resolve(results);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
    const getallNames = function () {
     //   console.log('2222222');
        return new Promise((resolve, reject) => {
            annuaires.find({ title: { $regex: term, $options: 'i' } })
                .exec()
                .then(function (results) {
                    return resolve(results);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
    async.parallel({
        1: callback => {
            getallData()
                .then(result => callback(null, result))
                .catch(error => callback(error, null));
        },
        2: callback => {
            getallNames()
                .then(result => callback(null, result))
                .catch(error => callback(error, null));
        }
    }, (err, results) => {
        if(err) {
            return reject({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                key: 'ERROR_SOAP_REQUEST',
                error: err
            });
        }
        results[1].forEach(activite => {
            array1.push(activite.nom);
        });
        results[2].forEach(annuaire => {
            array2.push(annuaire.title);
        });
        // console.log(array2);
        const allresult = _.concat(array1, array2);
        console.log(allresult);
       /* const allTogether = allresult.map(function(value) {
            return value;
        });*/
        // resolve(allTogether);
       // console.log('all result ==>>', allTogether[0].title);
        return allresult;
    });
   /* try {
        const data = await getallData();
        return data;
    } catch (error) {
        throw error;
    }*/
}

/*
handleErrorCatch = (res, statusCode) => {
    let status = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return err => {
        console.error(err);
        return res.status(status).json(err);
    };
};*/
