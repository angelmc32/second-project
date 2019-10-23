const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');


router.get('/login', restrictAuth, (req, res, next) => {
  res.render('auth/user', { title: 'Inicia Sesión | Me duele' });
});

router.post('/login', restrictAuth, authControllers.login);

router.get('/signup', restrictAuth, (req, res, next) => {
  res.render('auth/signup', { title: 'Registro | Me duele' });
});

router.post('/signup', restrictAuth, authControllers.signup);

router.get('/providers', restrictAuth, (req, res, next) => {
  res.render('auth/provider', { title: 'Profesionales | Me duele' })
});

router.post('/providers/login', restrictAuth, authControllers.providerLogin);

router.post('/providers/signup', restrictAuth, authControllers.providerSignup);

router.get('/logout', isAuth, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;