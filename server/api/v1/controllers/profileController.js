const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// errors validation
const validateProfileInput = require('../validation/profile');
const validateGroupRideInput = require('../validation/groupride');
const validateFriendsInput = require('../validation/friends');

// Models
const Profile = require('../models/Profile');
const User = require('../models/User');
const fetch = require('node-fetch');

const multerMiddleware = require('../utils/multerMiddleware');

// @route       GET api/v1/profile/test
// @description Tests profile route
// @access      Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route       GET api/v1/profile/matrix/:origin/:destination
// @description Get the google maps distance matrix api
// @whatitdoes  Get the distance between two points
// @access      Public
exports.get_google_maps_distance = (req, res) => {
  fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
      req.params.origin
    }&destinations=${
      req.params.destination
    }&key=AIzaSyCcHAQfFXccCvZLeMc1c5xu374JVfgSL6U`
  )
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json(err));
};

// @route       GET api/v1/profile
// @description Get current users profile
// @access      Private
// @testpostman Maak een profiel aan en login, gebruik token en ga naar deze route
exports.get_current_user_profile = (req, res) => {
  // Met passport doen we authentication
  const errors = {};
  Profile.findOne({ user: req.user.id }) 
    .populate('user', ['name', 'avatar']) 
    .then(profile => {
      
      if (!profile) {
        errors.noprofile = 'There is no profile for this user!'; 
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

// @route       GET api/v1/profile/all
// @description Get all profiles
// @access      Public
exports.get_all_profiles = (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles!';
        return res.status(400).json();
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles!' }));
};

// @route       GET api/v1/profile/handle/:handle
// @description Get profile by handle
// @access      Public, iedereen kan de profielen zien
exports.get_profile_by_handle = (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user!';
        res.status(404).json(errors);
      }
      res.json(profile); // We geven het profiel
    })
    .catch(err => res.status(404).json(err));
};

// @route       GET api/v1/profile/user/:user_id
// @description Get profile by user ID
// @access      Public
exports.get_profile_by_user_id = (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user!';
        res.status(404).json(errors);
      }
      res.json(profile); // We geven het profiel
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user!' })
    );
};

// @route       POST api/v1/profile
// @description Create or edit users profile
// @access      Private
// @testpostman register,login,use token and go to route, add,update through the body

exports.create_or_edit_profile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Get fields
  const profileFields = {}; 

  profileFields.user = req.user.id; 
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.kind) profileFields.kind = req.body.kind;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  // bikes - Spilt into array
  if (typeof req.body.bikes !== 'undefined') {
    profileFields.bikes = req.body.bikes.split(','); // Split to array
  }

  // Social
  profileFields.social = {}; 
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile)); 
    } else {
      Profile.findOne({ handle: profileFields.handle })
        .then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        })
        .catch(err => console.log(err));
    }
  });
};

/* groupride toevoegen of verwijderen */

// @route   POST api/v1/profile/groupride
// @desc    Add a groupride to profile
// @access  Private

exports.create_groupride = (req, res) => {
  const { errors, isValid } = validateGroupRideInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      name: req.body.name,
      location: req.body.location,
      from_time: req.body.from_time,
      to_time: req.body.to_time,
      from_route: req.body.from_route,
      to_route: req.body.to_route,
      start_date: req.body.start_date,
      current: req.body.current,
      description: req.body.description
    };

    profile.groupride.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  });
};

// @route   POST api/v1/profile/friends
// @desc    Add friends to profile
// @access  Private
/* TODOO
router.post(
  '/friends',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateFriendsInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const c = {
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar,
      };

      // Add to exp array
      profile.friends.unshift(newFriend); // Niet in het begin toevoegen van array maar vanachter

      profile.save().then(profile => res.json(profile));
    });
  }
);
*/

// @route   DELETE api/v1/profile/groupride/:grp_id
// @desc    Delete groupride from profile
// @access  Private

exports.delete_groupride = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.groupride
        .map(item => item.id)
        .indexOf(req.params.grp_id); // Id of the groupride

      // Splice out of array
      profile.groupride.splice(removeIndex, 1);

      // Sav
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(400).json(err));
};

// @route       GET api/v1/profile/groupride/:grp_id
// @description Get groupride by ID
// @access      Public
exports.get_groupride_by_id = (req, res) => {
  const errors = {};
  Profile.findOne({ groupride: req.params.grp_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.nogroupride = 'There is no groupride for this user!';
        res.status(404).json(errors);
      }
      res.json(profile); // We geven het profiel
    })
    .catch(err => res.status(404).json(err));
};

// @route   DELETE api/v1/profile/friends/:frd_id
// @desc    Delete friends from profile
// @access  Private
exports.delete_friends = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.friends
        .map(item => item.id)
        .indexOf(req.params.frd_id); // Id of friends

      // Splice out of array
      profile.friends.splice(removeIndex, 1);

      // Sav
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(400).json(err));
};

// @route   DELETE api/v1/profile
// @desc    Delete user and profile
// @access  Private
exports.delete_user_profile = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }) 
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id }) 
        .then(() => res.json({ succes: true }));
    });
};

// @route   POST api/v1/profile/upload
// @desc    Upload an image
// @access  Private

// Doesn't work yet, cors problems.
exports.upload_image = (req, res) => {
  /*
  upload(req, res, err => {
    if(err) {
      res.json({msg: 'Something went wrong!'})
    } 
    console.log(req.file);
    res.json({msg: 'File was succesfully uploaded'});
  });
  res.send();
  next();
  */
};
