const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

router.get('/places', (req,res) => {
  res.render('places/index');
});

router.get('/places/new', (req,res) => {
  res.render('places/new');
});

module.exports = router;