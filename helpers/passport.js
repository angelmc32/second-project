// Configuration for passport/passport-local
const passport = require('passport')    // Require passport
const { Strategy: facebookStrategy } = require('passport-facebook');
const User = require('../models/User'); // Require model with passport-local-mongoose plugged in

// Define passport use with local strategy
passport.use( User.createStrategy() );

// Define passport use with Facebook strategy
passport.use( new facebookStrategy(
  {
    clientID: process.env.FBID,
    clientSecret: process.env.FBSECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  (accesToken, refreshToken, profile, done) => {

    User.findOne( { facebook_id: profile.id } )
    .then( user => {

      if( user ) return done(null, user)

      const { id } = profile;

      User.create({ facebook_id: id })
      .then( user => done(null, user) )
      .catch( error => done(error) );

      })
    .catch( error => done(error) );
    }
  )
);

// Use static serialize and deserialize of model for passport session support
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

module.exports = passport;  // Export passport