const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    consultation_id: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation'
    },
    provider_id: {
      type: Schema.Types.ObjectId,
      ref: 'Provider'
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model('Comments', commentSchema);