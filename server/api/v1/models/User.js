const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  picture: {
    data: String
  },
  
  date: {
    type: Date,
    default: Date.now
  },

  facebookProvider: {
    id: { type: String, required: false },
    token: { type: String, required: false }
  }
});


/* I added the hashing of the password with bcrypt in my usersController */
/*
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});
*/

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};


UserSchema.methods.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
  let that = this;
  return this.findOne({
      'facebookProvider.id': profile.id
  }, function(err, user) {
      if (!user) {
          var newUser = new that({
              fullName: profile.displayName,
              email: profile.emails[0].value,
              facebookProvider: {
                  id: profile.id,
                  token: accessToken
              }
          });

          newUser.save(function(error, savedUser) {
              if (error) {
                  console.log(error);
              }
              return cb(error, savedUser);
          });
      } else {
          return cb(err, user);
      }
  });
};


module.exports = mongoose.model('users', UserSchema);
