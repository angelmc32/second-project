const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');

router.get('/consultations', isAuth, (req, res, next) => {
  
  const { user } = req;
  
  Consultation.find()
  .then( consultations => res.render('consultation/index', { title: 'Consultas | Atencion a lesiones menores', user, consultations }) )
  .catch( errorMessage => res.render('user/home', { title: 'Home', user, errorMessage }));
  
});

router.get('/consultations/new', isAuth, (req, res, next) => {

  const { user } = req;

  res.render('consultation/new', { title: 'Nueva consulta | Atencion a lesiones menores', user });

});

module.exports = router;