const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Use passport-local-mongoose to simplify email and password login with passport
const passportLocalMongoose = require('passport-local-mongoose');

const providerSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    date_of_birth: {
      type: Date
    },
    role: {
      type: String,
      enum: ['Medico','Enfermeria']
    },
    license: {
      type: Number,
      default: 0
    },
    place: {
      type: [Schema.Types.ObjectId],
      ref: "Place"
    }
  },
  { timestamps: true }
);

// Plug in passport-local-mongoose to Provider schema
providerSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',         // Email set as login requirement in place of username
  hashField: 'password'           // Store the hashfield provided by passport-local-mongoose into password field in User Schema
});

module.exports = model("Provider", providerSchema);