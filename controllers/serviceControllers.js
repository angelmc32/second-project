const Service = require('../models/Service');

exports.index = (req, res, next) => {
  const { user } = req;

  res.render('service/index', { title: 'Servicios', user });

  /*
  Service.find()
  .then( services => {
    res.render('service/index', { user, services });
  })
  .catch( errorMessage => res.render('index', { title: 'Registro', errorMessage }));
  */

}