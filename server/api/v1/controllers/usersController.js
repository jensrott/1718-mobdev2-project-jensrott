const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

const utils = require('../utils/utils');
const { generateToken, sendToken } = require('../utils/utils');

// @route       POST api/v1/users/register
// @description Register user
// @access      Public
exports.register_user = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors.email);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm' // Default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        // We hash the password with bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
};

/* Login user with jsonwebtokens , works perfect */
// @route   POST api/v1/users/login
// @desc    Login User / Returning JWT , Using it to access private routes
// @access  Public
exports.login_user = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      // Compare password with what we filled in
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        const token = utils.createToken(payload); // Create token with a helper function in utils

        res.status(200).json({
          success: true,
          token: 'Bearer ' + token // We get the token
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
};

/* Login user with local strategy */
// @route   POST api/v1/users/local/login
// @desc    Login User / Returning JWT Token
// @access  Public
exports.local_login = (req, res) => {
  (req, res, next, user) => {
    if (user) {
      res.json({ id: req.user.id, username: req.user.username });
    } else {
      res.status(404).json({ errors: 'Oops' });
    }
  };
};

// @route          GET api/v1/users/current
// @desc           Return current user
// @access         Private
// @testpostman    Put Authorization token in the header and you will see logged in user
exports.get_current_user = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

/* Trying to make facebook auth work... */

// @route   GET api/v1/users/auth/facebook/redirect
// @desc    Generate facebook auth token if logged in
// @access  Private
exports.generate_facebook_auth_token = (req, res) => {
  jwt.sign(
    // Accesstoken
    req.user.id,
    keys.secretOrKey, // 'secret'
    { expiresIn: 3600 },
    (err, token) => {
      res.status(200).json({
        succes: true,
        token: token,
        strategy: 'facebook-tokens'
      });
    }
  );
};

// @route   GET api/v1/users/auth/facebook
// @desc    Check the facebook status
// @access  Private
(exports.check_facebook_auth = (req, res) => {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }
  req.auth = {
    id: req.user.id
  };

  next();
}),
  generateToken,
  sendToken;

// @route   GET api/v1/users/auth/facebook/callback
// @desc    We get here if we are succesfully logged in with facebook
// @access  Private
exports.successful_facebook_auth = (req, res) => {
  res.json({ hello: 'hello' }); // If it was succesful
};
