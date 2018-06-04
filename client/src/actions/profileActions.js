import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/v1/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data // Actual profile
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE, 
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/v1/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get groupride by handle
export const getGroupRideById = grp_id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/v1/profile/groupride/${grp_id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Create or edit Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/v1/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// later add group ride
export const addGroupRide = (grpData, history) => dispatch => {
  axios
    .post('/api/v1/profile/groupride', grpData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add friends
export const addFriends = (frdData, history) => dispatch => {
  axios
    .post('/api/v1/profile/friends', frdData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete groupRide
export const deleteGroupRide = id => dispatch => {
  if (window.confirm('Are you sure?')) {
    axios
      .delete(`/api/v1/profile/groupride/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data // Groupride is now gone from profile
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

// Delete friends
export const deleteFriends = id => dispatch => {
  if (window.confirm('Are you sure?')) {
    axios
      .delete(`/api/v1/profile/friends/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data // Friends are now gone from profile
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

export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure?')) {
    axios
      .delete('/api/v1/profile')
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {} // User is leeg
        });
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/v1/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const uploadImage = () => {
  // Uploading image axios post request naar api
};

// Profile loading while fetching
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
