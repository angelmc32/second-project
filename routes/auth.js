const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');


router.get('/login', restrictAuth, (req, res, next) => {
  res.render('auth/login', { title: 'Inicia Sesión' });
});

router.post('/login', restrictAuth, authControllers.login);

router.get('/signup', restrictAuth, (req, res, next) => {
  res.render('auth/signup', { title: 'Registro' });
});

router.post('/signup', restrictAuth, authControllers.signup);

router.get('/logout', isAuth, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;