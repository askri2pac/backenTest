const httpStatus = require('http-status-codes');
const db = require('../../_helpers/db');
const activites = db.Activites;
module.exports = {
    getActivies,
};

async function getActivies(term) {

    const options = {};
    options.activite = {'$regex': term, $options:'i'};
   // options.activite = term;

    const getallData = function () {
       // console.log(options.acticite);
        return new Promise((resolve, reject) => {
           // activites.find (options.activite)
            activites.find({ $text: { $search: term } })
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