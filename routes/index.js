const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  
  const { user } = req;
  
  res.render('index', { title: 'Me duele | Atencion a lesiones menores', user });

});

router.get('/emergency', (req, res, next) => {

  const { user } = req;

  res.render('emergency/map', { title: 'Emergencia | Atencion a lesiones menores', user});
  
})

module.exports = router;
