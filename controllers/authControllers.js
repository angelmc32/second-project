const passport = require('../helpers/passport');
const User = require('../models/User');
const Provider = require('../models/Provider');

exports.login = (req, res, next) => {
  passport.authenticate('local-user', (error, user, info = {}) => {
    const { message: errorMessage } = info;
    if( errorMessage )
      return res.render('auth/login', { title: 'Inicia Sesión | Me duele', errorMessage });

    req.login( user, error => {
      res.redirect('/home');
    });
  })(req, res);
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if( !password || !email ) {
    let errorMessage = 'Todos los campos son requeridos';
    res.render('auth/signup', { title: 'Registro | Me duele', errorMessage });
  }

  if( password !== req.body['confirm-password'] ) {
    let errorMessage = 'Asegura que la contraseña sea la misma en ambos campos';
    res.render('auth/signup', { title: 'Registro | Me duele', errorMessage });
  }

  User.register({ email }, password)
  .then( user => {
    req.login(user, errorMessage => {
      if( errorMessage ) return res.render('auth/signup', { title: 'Registro | Me duele', errorMessage });
      res.redirect('/home');
    })
  })
  .catch( errorMessage => res.render('auth/signup', { title: 'Registro | Me duele', errorMessage }));
}

exports.providerLogin = (req, res, next) => {
  passport.authenticate('local-provider', (error, user, info = {}) => {
    const { message: errorMessage } = info;
    if( errorMessage )
      return res.render('auth/provider', { title: 'Inicia Sesión | Me duele', errorMessage });

    req.login( user, error => {
      res.redirect('/providers/home');
    });
  })(req, res);
};

exports.providerSignup = (req, res, next) => {
  const { email, password } = req.body;

  if( !password || !email ) {
    let errorMessage = 'Todos los campos son requeridos';
    res.render('auth/provider', { title: 'Registro | Me duele', errorMessage });
  }

  if( password !== req.body['confirm-password'] ) {
    let errorMessage = 'Asegura que la contraseña sea la misma en ambos campos';
    res.render('auth/provider', { title: 'Registro | Me duele', errorMessage });
  }

  Provider.register({ email }, password)
  .then( provider => {
    req.login(provider, errorMessage => {
      if( errorMessage ) return res.render('auth/provider', { title: 'Registro | Me duele', errorMessage });
      res.redirect('/home');
    })
  })
  .catch( errorMessage => res.render('auth/provider', { title: 'Registro | Me duele', errorMessage }));
}