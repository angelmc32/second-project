const express = require('express');
const router = express.Router();
const { isAuth, restrictAuth, isProvider } = require('../helpers/authMiddleware');
const User = require('../models/User');
const Provider = require('../models/Provider');

router.get('/home', isAuth, (req, res, next) => {
  const { user } = req;
  res.render('user/home', { title: 'Home', user });
});

router.get('/profile', isAuth, (req, res, next) => {
  const { user } = req;
  console.log(`This is the user license: ${user.license}`)
  if( user.license !== undefined ) {
    Provider.findById(user.id)
    .then( provider => {
      res.render('provider/profile', { title: 'Mi Perfil | Atencion a lesiones menores', user: provider })
    })
    .catch( errorMessage => res.render('provider/profile', { title: 'Mi Perfil | Atencion a lesiones menores', provider, errorMessage }));
  } else {

    User.findById(user.id)
    .then( user => {
      res.render('user/profile', { title: 'Mi Perfil | Atencion a lesiones menores', user })
    })
    .catch( errorMessage => res.render('user/profile', { title: 'Mi Perfil | Atencion a lesiones menores', user, errorMessage }));
  }
});

router.get('/profile/preferences', (req, res, next) => {
  
  const { user } = req;

  if( user.license !== undefined ) {
    Provider.findById(user.id)
    .then( provider => {
      res.render('provider/profile', { title: 'Mi Perfil | Atencion a lesiones menores', provider })
    })
    .catch( errorMessage => res.render('provider/profile', { title: 'Mi Perfil | Atencion a lesiones menores', provider, errorMessage }));
  } else {

    User.findById(user.id)
    .then( user => {
      res.render('user/profile', { title: 'Mi Perfil | Atencion a lesiones menores', user })
    })
    .catch( errorMessage => res.render('user/profile', { title: 'Mi Perfil | Atencion a lesiones menores', user, errorMessage }));
  }

})

module.exports = router;