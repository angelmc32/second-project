// Configuration for passport/passport-local
const passport = require('passport')    // Require passport
const { Strategy: facebookStrategy } = require('passport-facebook');
const User = require('../models/User'); // Require model with passport-local-mongoose plugged in
const Provider = require('../models/Provider'); // Require model with passport-local-mongoose plugged in

// Define passport use with local strategy for User model
passport.use( 'local-user', User.createStrategy() );

// Define passport use with local strategy for Provider model
passport.use( 'local-provider', Provider.createStrategy() )

// Define passport use with Facebook strategy
passport.use( new facebookStrategy(
  {
    clientID: process.env.FBID,
    clientSecret: process.env.FBSECRET,
    callbackURL: 'http://localhost:3000/facebook/callback'
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
/*
passport.serializeUser( (entity, done) => {
  done(null, { id: entity.id, type: entity.type })
});

passport.deserializeUser( (object, done) => {
  switch(object.type) {
    case 'user':
      User.findById(object.id)
      .then( user => {
        if(user) done(null, user);
        else done(new Error(`User ID not found: ${object.id}`, null));
      });
      break;
    case 'provider':
      Provider.findById(object.id)
      .then( provider => {
        if(provider) done(null, provider);
        else done(new Error(`Provider ID not found: ${object.id}`, null));
      });
      break;
    default: 
      done(new Error(`No entity type: ${object.type}`, null));
  }
})
*/

passport.serializeUser((obj, done) => {
  if (obj instanceof Provider) {
    done(null, { id: obj.id, type: 'Provider' });
  } else {
    done(null, { id: obj.id, type: 'User' });
  }
});

passport.deserializeUser((obj, done) => {
  if (obj.type === 'Provider') {
    Provider.findById(obj.id).then((provider) => done(null, provider));
  } else {
    User.findById(obj.id).then((user) => done(null, user));
  }
});

/*
// Use static serialize and deserialize of model for passport session support
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

// Use static serialize and deserialize of model for passport session support
passport.serializeUser( Provider.serializeUser() );
passport.deserializeUser( Provider.deserializeUser() );
*/
module.exports = passport;  // Export passport