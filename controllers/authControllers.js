const passport = require('../helpers/passport');
const User = require('../models/User');

exports.login = (req, res, next) => {
  passport.authenticate('local', (error, user, info = {}) => {
    const { message: errorMessage } = info;
    if( errorMessage )
      return res.render('auth/login', { title: 'Inicia Sesión', errorMessage });

    req.login( user, error => {
      res.redirect('/home');
    });
  })(req, res);
};

exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  if( !password || !username || !email ) {
    let errorMessage = 'Todos los campos son requeridos';
    res.render('auth/signup', { title: 'Registro', errorMessage });
  }

  if( password !== req.body['confirm-password'] ) {
    let errorMessage = 'Asegura que la contraseña sea la misma en ambos campos';
    res.render('auth/signup', { title: Registro, errorMessage });
  }

  User.register({ username, email }, password)
  .then( user => {
    req.login(user, errorMessage => {
      if( errorMessage ) return res.render('/signup', { title: 'Registro', errorMessage });
      res.redirect('/home');
    })
  .catch( errorMessage => res.render('auth/signup', { title: 'Registro', errorMessage }));
  });
}