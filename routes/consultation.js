const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');

router.get('/consultations', isAuth, (req, res, next) => {
  const { user } = req;
  res.render('consultation/index', { title: 'Consultations', user })
})