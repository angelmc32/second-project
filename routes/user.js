const express = require('express');
const router = express.Router();
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');

router.get('/home', isAuth, (req, res, next) => {
  res.render('user/home', { title: 'Home' });
});

module.exports = router;