const express = require('express');
const router = express.Router();
const activitesService = require('./activitie.service');

router.get('/getAllActivities/:term', getllActivities);
module.exports = router;
function getllActivities(req, res, next) {

    console.log('here');
    console.log('caractere is ',req.params.term );
    const term = req.params.term;

  activitesService.getActivies(term)
      .then(
          activites => {
             // console.log('activites ==>', activites);
              return res.status(200).json(activites);
          }
      )
}