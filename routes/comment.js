const express = require('express');
const router = express.Router();
const { isAuth, restrictAuth } = require('../helpers/authMiddleware');
const Comment = require('../models/Comment')

router.post('/comments/new', isAuth, (req, res, next) => {
  
  const { user } = req;
  const { comment } = req.body;

  if( user.license !== undefined ) {
    
    const newComment = new Comment({  })
  }

})