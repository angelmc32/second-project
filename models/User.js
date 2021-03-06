const mongoose = require('mongoose'); // Require mongoose to create model schema
const { Schema, model } = mongoose;   // Destructure Schema and model from mongoose

// Use passport-local-mongoose to simplify email and password login with passport
const passportLocalMongoose = require('passport-local-mongoose');

// User Schema declaration
const userSchema = new Schema(
  {
    email: {
      type: String
    },
    password: {
      type: String
    },
    facebook_id: {
      type: String
    },
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    date_of_birth: {
      type: Date
    }
  },
  { timestamps: true }
);

// Plug in passport-local-mongoose to User schema
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',         // Email set as login requirement in place of username
  hashField: 'password'           // Store the hashfield provided by passport-local-mongoose into password field in User Schema
});

module.exports = model('User', userSchema); // Export User Schema as User Model