const express = require('express');
const router = express.Router();
const annuaireService = require('./annuaire.service');

// routes

router.post('/find',findAnnuaire);

module.exports = router;

function findAnnuaire(req, res, next){
    console.log('req ==> ',req.body);
    const title = req.body.annuaire;
    const adresse = req.body.adresse;
    annuaireService.findAnnuaire(title, adresse)
        .then(annuaire => console.log(annuaire))
        .catch(err => next(err));
}