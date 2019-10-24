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
      ref: 'Provider',
      default: null
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    creator_role: {
      type: String,
      enum: ['Doctor','Paciente']
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model('Comment', commentSchema);