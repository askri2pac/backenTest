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
    const options1 = {};
    const array1 = [];
    const array2 = [];
    const array3 = [];
    options.activite = {'$regex': term, $options: 'i'};

    const getallData = function () {
        return new Promise((resolve, reject) => {
            activites.find({nom: {$regex: term, $options: 'i'}})
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
        return new Promise((resolve, reject) => {
            annuaires.find({title: {$regex: term, $options: 'i'}})
                .exec()
                .then(function (results) {
                    return resolve(results);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
 const data =  await Promise.all([getallNames(),getallData()]);

    if (data[0].length != null){
        data[0].forEach(function (value) {
            array1.push(value.title);
        });
    }
    if (data[1].length != null){
        data[1].forEach(function (value) {
            options1.title = value.nom;
            options1.id = value._id;
            array1.push(options1);
        });
    }

    console.log('array1 ===>', array1);


    const merge = _.concat(array1, array2);

 return merge;
}









/*
handleErrorCatch = (res, statusCode) => {
    let status = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return err => {
        console.error(err);
        return res.status(status).json(err);
    };
};*/
