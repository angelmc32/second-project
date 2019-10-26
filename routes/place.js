const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');

router.get('/places', (req,res) => {
  res.render('emergency/map');
});

/* router.get('/places/index', (req,res) => {
  res.render('places/new');
}); */
router.get('/places/index', isAuth, (req,res) => {
  
  const { user } = req;
  res.render('places/new', { title: 'Agregar clinica | Atencion a lesiones menores', user });
});

router.post('/places/new', isAuth, (req,res) => {
/* console.log(req.body);
res.send('ok'); */
  // Detectar inputs vacios 
  const errors = [];
  if(!location_name) {
    errors.push({text: 'Por Favor Escribe un Nombre del lugar'});
  }
  if(!category){
    errors.push({text: 'Por Favor Selecciona una Categoría'})
  }
  if(!address){
    errors.push({text: 'Por Favor Agrega una Dirección'})
  } 
  if(errors.length>0) {
    res.render('/places/new', {
      loacation_name,
      category,
      address
    });
  } else {
    const newplace = new Place({ loacation_name, category, address, phone_number, coords, web_site});
    newplace.save();
    res.redirect('/places')
  }

});


/* router.post('/places/index', isAuth, (req,res) => {
  
  const { user } = req;

  res.render('places/new', { title: 'Agregar clinica | Atencion a lesiones menores', user });

}); */

module.exports = router;