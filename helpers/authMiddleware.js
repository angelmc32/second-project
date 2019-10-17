exports.isAuth = (req, res, next) => {
  if( req.isAuthenticated() )
    return next();
  return res.redirect('/login');
}

exports.restrictAuth = (req, res, next) => {
  if( req.isAuthenticated() )
    return res.redirect('/home');
  return next();
}

exports.isDoctor = (req, res, next) => {
  if ( req.user.medic_license )
    return true;
  return false;
}