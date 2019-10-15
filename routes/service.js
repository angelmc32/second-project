const express = require('express');
const router = express.Router();
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');
const serviceControllers = require('../controllers/serviceControllers');

router.get('/services', serviceControllers.index);

router.get('/services/new', isAuth, (req, res, next) => {
  const { user } = req;
  res.render('service/new', { title: 'Nuevo Servicio', user });
});

router.get('/services/:serviceID', (req, res, next) => {
  const { user } = req;
  const serviceID = req.params.serviceID;
  res.render('service/new', { title: 'Ver Servicio', user });
});

router.get('/services/:serviceID/edit', isAuth, (req, res, next) => {
  const { user } = req;
  const serviceID = req.params.serviceID;
  res.render('service/edit', { title: 'Editar Servicio', user });
});

module.exports = router;