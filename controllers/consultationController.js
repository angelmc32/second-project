const Consultation = require('../models/Consultation');
const Comment = require('../models/Comment');

exports.findComment = comment => {

  Comment.findById(comment._id)
  .then( comment => comment )
  .catch( error => console.log(error))

}