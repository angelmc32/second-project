const mongoose = require('mongoose'); // Require mongoose to create model schema
const { Schema, model } = mongoose;   // Destructure Schema and model from mongoose

// Use passport-local-mongoose to simplify username/email and password login with passport
const passportLocalMongoose = require('passport-local-mongoose');

// User Schema declaration
const userSchema = new Schema(
  {
    email: {
      type: String
    },
    username: {
      type: String
    },
    password: {
      type: String
    },
    facebook_id: {
      type: String
    }
  },
  { timestamps: true }
);

// Plug in passport-local-mongoose to User schema
userSchema.plugin(passportLocalMongoose, {
  usernameQueryFields: ['email'], // Add email as an option for login
  hashField: 'password'           // Store the hashfield provided by passport-local-mongoose into password field in User Schema
});

module.exports = model('User', userSchema); // Export User Schema as User Model
