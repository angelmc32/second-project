const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const serviceSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Internet','Phone','Repair','Restroom','Transportation','Water'],
    required: true
  },
  description: {
    type: String
  }
})

module.exports = model('Service', serviceSchema);