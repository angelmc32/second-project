const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');

router.get('/places', (req,res) => {
  res.render('emergency/map');
});

router.get('/places/new', isAuth, (req,res) => {

  const { user } = req;

  res.render('places/new', { title: 'Agregar clinica | Atencion a lesiones menores', user });

});

module.exports = router;