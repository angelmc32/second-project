const express = require('express');
const router = express.Router();
const uploader = require('../helpers/multer');
const Consultation = require('../models/Consultation');
const { isAuth, restrictAuth, isDoctor } = require('../helpers/authMiddleware');

router.get('/consultations', isAuth, (req, res, next) => {
  
  const { user } = req;
  
  Consultation.find()
  .then( consultations => res.render('consultation/index', { title: 'Consultas | Atencion a lesiones menores', user, consultations }) )
  .catch( errorMessage => res.render('user/home', { title: 'Home', user, errorMessage }));
  
});

router.get('/consultations/new', isAuth, (req, res, next) => {

  const { user } = req;

  res.render('consultation/new', { title: 'Nueva consulta | Atencion a lesiones menores', user });

});

router.post('/consultations/new', isAuth, uploader.single('image'), (req, res, next) => {

  const { user } = req;
  const { chief_complaint, symptoms, pain_level } = req.body;
  const image_url = req.file.secure_url;

  console.log(image_url);

  const newConsultation = new Consultation({ patient_id: user._id, image_url, chief_complaint, symptoms, pain_level });

  newConsultation.save()
  .then( consultation => {
    //let url = "/consultations/".concat(JSON.stringify(consultation._id));
    res.redirect('/consultations');
  })
  .catch( errorMessage => res.render('consultation/new', { title: 'Nueva consulta | Atencion a lesiones menores', user, errorMessage }));

});

router.get('/consultations/:consultationID', isAuth, (req, res, next) => {

  const { user } = req;
  const consultationID = req.params.consultationID;

  console.log(`This is the consult ID: ${consultationID}`);

  Consultation.findById(consultationID)
  .then( consultation => res.render('consultation/show', { title: 'Ver consulta | Atencion a lesiones menores', user, consultation }))
  .catch( errorMessage => res.render('consultation/index', { title: 'Consultas | Atencion a lesiones menores', user, errorMessage }))

});

module.exports = router;