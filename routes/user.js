const express = require('express');
const router = express.Router();
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');

router.get('/home', isAuth, (req, res, next) => {
  const { user } = req;
  res.render('user/home', { title: 'Home', user });
});

module.exports = router;