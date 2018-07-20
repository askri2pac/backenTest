const express = require('express');
const router = express.Router();
const activitesService = require('./activitie.service');

router.get('/getAllActivities', getllActivities);
module.exports = router;
function getllActivities(req, res, next) {

    console.log('here');

  activitesService.getActivies()
      .then(
          activites => {
              console.log('activites ==>', activites);
              return res.status(200).json(activites);
          }
      )
}