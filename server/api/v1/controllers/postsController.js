const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../models/Post');
const Profile = require('../models/Profile');

const validatePostInput = require('../validation/posts');

// @route       POST api/v1/posts
// @description Create a post
// @access      Private
exports.create_post = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id // We safe the id from the user in the post
  });
  newPost.save().then(post => res.json(post));
};

// @route       GET api/v1/posts
// @description Get posts
// @access      Public Everyone can see the posts
exports.get_all_posts = (req, res) => {
  Post.find()
    .sort({ date: -1 }) // Descending
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: 'No posts found!' }));
};

// @route       GET api/v1/posts/:id
// @description Get post by id
// @access      Public

exports.get_post_by_id = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that id!' })
    );
};

// @route       DELETE api/v1/posts/:id
// @description Delete a post
// @access      Private

exports.delete_post_by_id = (req, res) => {
  Profile.findOne({ user: req.user.id }) // current user
    .then(profile => {
      Post.findById(req.params.id).then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          // Compare it to the user that is logged in
          res.status(401).json({ notauthorized: 'User not authorized' }); // We doen deze controle zodat een persoon die niet is ingelogd niet andere posts kan verwijderen
        }

        // Delete
        post
          .remove()
          .then(() => res.json({ succes: true }))
          .catch(err =>
            res.status(404).json({ postnotfound: 'No post found' })
          );
      });
    });
};

// @route       PATCH api/v1/posts/:id/softdelete
// @description softDelete a post
// @access      Private
exports.soft_delete_post_by_id = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndUpdate(
    id,
    {
      deleted_at: Date.now() // We find deleted_at and add current date
    },
    { new: true }
  )
    .then(post => {
      if (!post) {
        res.status(404).json({ notfoundPost: `No post found with ${$id}` });
      }
      res.send(post);
    })
    .catch(err => console.log(err));
};

// @route       PATCH api/v1/posts/:id/softundelete
// @description PostUnDelete a post
// @access      Private
exports.soft_undelete_post_by_id = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndUpdate(
    id,
    {
      deleted_at: null
    },
    { new: true }
  )
    .then(post => {
      if (!post) {
        res.status(404).json({ notfoundPost: `No post found with ${$id}` });
      }
      res.send(post);
    })
    .catch(err => console.log(err));
};

// @route       PATCH api/v1/posts/:id/edit
// @description Edit a post
// @access      Private
exports.edit_post_by_id = (req, res) => {
  // First check
  if (!req.body.text || !req.body.user) {
    res.status(400).json({ notdone: `Post with ${id} needs a text and user` });
  }
  // Get specific id from post
  const id = req.params.id;
  // Update the fields
  Post.findByIdAndUpdate(
    id,
    {
      text: req.body.text,
      user: req.body.user
    },
    { new: true }
  )
    .then(post => {
      if (!post) {
        res.status(404).json({ notfoundPost: `No post found with ${$id}` });
      }
      res.send(post);
    })
    .catch(err => console.log(err));
};

// @route       POST api/v1/posts/like/:id
// @description Like post
// @access      Private
exports.like_post_by_id = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id) // We vinden de post gelinkt aan een profiel
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: 'User already liked this post!' });
        }

        post.likes.unshift({ user: req.user.id }); // Add to the beginning of the array

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found!' }));
  });
};

// @route       POST api/v1/posts/unlike/:id
// @description Unlike post
// @access      Private

exports.unlike_post_by_id = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: 'You have not yet liked this post!' });
        }

        // Add the user id to the likes array
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id); // This will give us the user we want to remove it from the array

        post.likes.splice(removeIndex, 1);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found!' }));
  });
};

// @route       POST api/v1/posts/comment/:id
// @description Add comment to post
// @access      Private
exports.comment_post_by_id = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    // If any errors
    return res.status(400).json(errors);
  }
  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      // Add to comments array
      post.comments.unshift(newComment);

      // Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found!' }));
};

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
exports.remove_comment_by_id = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // Check to see if comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexists: 'Comment does not exist' });
      }

      // Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice comment out of array
      post.comments.splice(removeIndex, 1);

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
};
