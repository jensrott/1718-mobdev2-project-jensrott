const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../api/v1/models/User');

/* keys */
const devKeys = require('../config/keys_dev');
const keys = require('../config/keys');

/* Strategies */
const FacebookTokenStrategy = require('passport-facebook-token');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  /* Jwt strategy */

  const jwtStrategy = new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // where token is contained
      secretOrKey: keys.secretOrKey
    },
    (jwt_payload, done) => {
      //
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    }
  );
  passport.use(jwtStrategy);

  /* local strategy */
  const localStrategy = new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      // Find the user give the email
      const user = User.findOne({ email: email });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
      // compare the password
      user.comparePassword(password, function(isMatch) {
        // Comparepassword is helper function in User model
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  );
  passport.use(localStrategy);

  /* Facebook strategy*/
  const fbTokenStrategy = new FacebookTokenStrategy(
    {
      clientID: devKeys.clientID,
      clientSecret: devKeys.clientSecret,
      callbackURL: 'https://localhost:5000/api/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.upsertFbUser(accessToken, refreshToken, profile, function(
        err,
        user
      ) {
        return done(err, user);
      });
    }
  );
  passport.use(fbTokenStrategy);

  // Serialization
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // Deserialization
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticateFacebook: function() {
      return passport.authenticate('facebook', { session: false });
    }
  };
};
