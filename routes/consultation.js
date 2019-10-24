const express = require('express');
const router = express.Router();
const uploader = require('../helpers/multer');
const Consultation = require('../models/Consultation');
const Comment = require('../models/Comment')
const { isAuth, restrictAuth, isDoctor } = require('../helpers/authMiddleware');

router.get('/consultations', isAuth, (req, res, next) => {
  
  const { user } = req;
  
  Consultation.find({patient_id: user._id})
  .then( consultations => res.render('consultation/index', { title: 'Consultas | Atencion a lesiones menores', user, consultations }) )
  .catch( errorMessage => res.render('user/home', { title: 'Home', user, errorMessage }));
  
});

router.get('/consultations/new', isAuth, (req, res, next) => {

  const { user } = req;

  res.render('consultation/new', { title: 'Nueva consulta | Atencion a lesiones menores', user });

});

router.post('/consultations/new', isAuth, uploader.single('image'), (req, res, next) => {

  const { user } = req;
  const { chief_complaint, symptoms, pain_level, description } = req.body;
  const image_url = req.file.secure_url;

  const newConsultation = new Consultation({ patient_id: user._id, image_url, chief_complaint, symptoms, pain_level, description });

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
  .populate('comments')
  .then( consultation => {
    console.log(consultation.comments);
    res.render('consultation/show', { title: 'Ver consulta | Atencion a lesiones menores', user, consultation })
  })
  .catch( errorMessage => res.render('consultation/index', { title: 'Consultas | Atencion a lesiones menores', user, errorMessage }))

});

router.post('/consultations/:consultationID/comment', (req, res, next) => {

  const { user } = req;
  const { content } = req.body;
  const consultationID = req.params.consultationID;

  console.log(content);

  if( user.license !== undefined ) {
    const newComment = new Comment({ consultation_id: consultationID, provider_id: user._id, creator_role: 'Doctor', content });
    newComment.save()
    .then( comment => {
      Consultation.findByIdAndUpdate(consultationID, {
        $push: { comments: comment }
      })
      .then( consultation => {
        console.log('created new comment');
        res.redirect(`/consultations/${consultationID}`);
      })
      .catch( errorMessage => {
        console.log(errorMessage)
        res.redirect(`/consultations/${consultationID}`)
      });
    })
    .catch( errorMessage => {
      console.log(errorMessage)
      res.redirect(`/consultations/${consultationID}`)
    });
  }
  else {
    const newComment = new Comment({ consultation_id: consultationID, patient_id: user._id, creator_role: 'Paciente', content });
    newComment.save()
    .then( comment => {
      Consultation.findByIdAndUpdate(consultationID, {
        $push: { comments: comment }
      })
      .then( consultation => {
        console.log('created new comment');
        res.redirect(`/consultations/${consultationID}`);
      })
      .catch( errorMessage => {
        console.log(errorMessage)
        res.redirect(`/consultations/${consultationID}`)
      });
    })
    .catch( errorMessage => {
      console.log(errorMessage)
      res.redirect(`/consultations/${consultationID}`)
    });
  }
});

module.exports = router;