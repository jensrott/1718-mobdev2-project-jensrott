// Seeding fake data
console.log('This script populates some test posts to your database. Specified database as argument - e.g.: seeder mongodb://your_username:your_password@your_dabase_url');

const async = require('async');
const mongoose = require('mongoose');
const faker = require('faker');

/*
Models
*/
const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return;
}

/*
Faker
*/
faker.local = 'nl';

/*
Mongoose
*/
const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
Variables
*/
let users = [];
let profiles = [];
let posts = [];

let likes = [];
let comments = [];

function createPosts(user, text,name,avatar, likes, comments, cb) {
    const postDetail = {user: user, text: text, name: name, avatar: avatar, likes: likes, comments: comments};
    const post = new Post(postDetail);

    post.save((err) => {
        if (err) {
            cb(err, null);
            return;
          }
          console.log('New Post: ' + post);
          posts.push(post);
          cb(null, post);
    });
}

function createPosts(cb) {
    async.parallel([
      function(callback) {
        createPosts(faker.lorem.word, 
            faker.lorem.paragraph(), 
            faker.lorem.word, 
            faker.internet.email(),
            generateRandomLikes(), 
            generateComments(), 
            callback);
      },
    ],
    cb);
  }

  function generateRandomLikes() {
    console.log('likes')
  }

  function generateComments() {
    console.log('comments')
  }

  /*
Asynchronous series
*/
async.series([
    createPosts,
  ],
  function(err, results) {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
    }
    mongoose.connection.close();
  });