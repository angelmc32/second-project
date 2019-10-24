const express = require('express');
const router = express.Router();
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');
const Consultation = require('../models/Consultation');

router.get('/providers/home', /*isAuth,*/ (req, res, next) => {
  const { user } = req;

  Consultation.find()
  .then( consultations => {
    res.render('provider/home', { title: 'Home | Me duele', user, consultations });
  })
  .catch( errorMessage => res.render('provider/home', { title: 'Home | Me duele', errorMessage }));
  
});

module.exports = router;