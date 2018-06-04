import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  SOFT_DELETE_POST,
  SOFT_UNDELETE_POST,
  EDIT_POST
} from './types';

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/v1/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/v1/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get specific Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/v1/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Delete Post
export const deletePost = id => dispatch => {
  if (window.confirm('Are you sure?')) { 
  axios
    .delete(`/api/v1/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};

// Soft delete post
export const softDeletePost = id => dispatch => {
  axios.patch(`/api/v1/posts/${id}/softdelete`)
  .then(res => {
    dispatch({
      type: SOFT_DELETE_POST,
      payload: id
    })
  })
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }))
}

// Soft delete post
export const softUndeletePost = id => dispatch => {
  axios.patch(`/api/v1/posts/${id}/softundelete`)
  .then(res => {
    dispatch({
      type: SOFT_UNDELETE_POST,
      payload: id,
    })
  })
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }))
}

export const editPost = id => dispatch => {
  axios.put(`/api/v1/posts/${id}/edit`)
    .then(res => {
      dispatch({
        type: EDIT_POST,
      })
    }).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }))
}

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/v1/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/v1/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/v1/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/v1/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
