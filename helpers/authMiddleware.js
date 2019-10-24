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
/*
exports.isProvider = (req, res, next) => {
  const { user } = req;
  if ( user.license )
    return true;
  return false;
}
*/