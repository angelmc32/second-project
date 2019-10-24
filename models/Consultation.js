const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const consultationSchema = new Schema(
  {
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    provider_id: {
      type: Schema.Types.ObjectId,
      ref: 'Provider'
    },
    image_url: {
      type: String,
      required: true
    },
    chief_complaint: {
      type: String,
      enum: ['Cortada','Quemadura','Erupcion','Lunar','Hongo','Desconocido'],
      required: true
    },
    symptoms: {
      type: [String],
      enum: ['Ardor','Comezon','Dolor','Piel seca','Secreciones','Ampollas','Granos','Moreton','Sangrado','Inflamacion']
    },
    pain_level: {
      type: Number,
      enum: [1,2,3,4,5,6,7,8,9,10]
    },
    description: {
      type: String
    },
    start_date: {
      type: Date
    },
    diagnosis: {
      type: String
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },
  { timestamps: true }
);

module.exports = model('Consultation', consultationSchema);