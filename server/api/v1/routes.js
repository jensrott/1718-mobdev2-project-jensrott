const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const usersController = require('./controllers/usersController');
const profileController = require('./controllers/profileController');
const postsController = require('./controllers/postsController');

/* Post Controller */
router.post("/posts", passport.authenticate('jwt', { session: false }), postsController.create_post);
router.get("/posts",  postsController.get_all_posts);
router.get("/posts/:id",  postsController.get_post_by_id);
router.patch("/posts/:id/softdelete",  passport.authenticate('jwt', { session: false }), postsController.soft_delete_post_by_id);
router.patch("/posts/:id/softundelete",  passport.authenticate('jwt', { session: false }), postsController.soft_undelete_post_by_id);
router.put("/posts/:id/edit",passport.authenticate('jwt', { session: false }), postsController.edit_post_by_id);
router.post("/posts/like/:id", passport.authenticate('jwt', { session: false }), postsController.like_post_by_id);
router.post("/posts/unlike/:id", passport.authenticate('jwt', { session: false }), postsController.unlike_post_by_id);
router.post("/posts/comment/:id", passport.authenticate('jwt', { session: false }), postsController.comment_post_by_id);
router.delete("/posts/comment/:id/:comment_id", passport.authenticate('jwt', { session: false }), postsController.remove_comment_by_id);
router.delete("/posts/:id",passport.authenticate('jwt', { session: false }), postsController.delete_post_by_id);


/* Profile Controller */
router.get("/profile/matrix/:origin/:destination", profileController.get_google_maps_distance);
router.get("/profile",passport.authenticate('jwt', { session: false }), profileController.get_current_user_profile);
router.get("/profile/all", profileController.get_all_profiles);
router.get("/profile/handle/:handle", profileController.get_profile_by_handle);
router.get("/profile/user/:user_id", profileController.get_profile_by_user_id);
router.post("/profile", passport.authenticate('jwt', { session: false }), profileController.create_or_edit_profile);
router.post("/profile/groupride",passport.authenticate('jwt', { session: false }), profileController.create_groupride);
router.delete("/profile/groupride/:grp_id",passport.authenticate('jwt', { session: false }), profileController.delete_groupride);
router.get("/profile/groupride/:grp_id", profileController.get_groupride_by_id);
router.delete("/profile/friends/:frd_id",passport.authenticate('jwt', { session: false }), profileController.delete_friends);
router.delete("/profile", passport.authenticate('jwt', { session: false }), profileController.delete_user_profile);
router.post("/profile/upload", passport.authenticate('jwt', { session: false }), profileController.upload_image);

/* Users Controller */
router.post("/users/register", usersController.register_user);
router.post("/users/login", usersController.login_user);
router.post("/users/local/login",passport.authenticate('jwt', { session: false }), usersController.local_login);
router.get("/users/current",passport.authenticate('jwt', { session: false }), usersController.get_current_user);

/* Facebook */
router.post("/users/auth/facebook/redirect",passport.authenticate('jwt', { session: false }), usersController.generate_facebook_auth_token);
router.post("/users/auth/facebook",passport.authenticate('jwt', { session: false }), usersController.check_facebook_auth);
router.get("/users/auth/facebook",passport.authenticate('facebook-token', { session: false }), usersController.successful_facebook_auth);

module.exports = router;