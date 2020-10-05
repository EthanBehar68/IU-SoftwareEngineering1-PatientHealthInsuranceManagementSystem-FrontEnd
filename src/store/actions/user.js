import {apiCall} from "../../services/api";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

import {SET_USER} from "../types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  return apiCall('post', `/api/register`, userData)
  .then(function(res) {
    const token = res.token;
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    
    dispatch(getUser({id: res.id, userType: res.userType}));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};
// Login - get user token
export const loginUser = userData => dispatch => {
  return apiCall('post', `/api/login`, userData)
  .then(function(res) {
    const token = res.token;
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    return dispatch(getUser(decoded));

  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

export const getUser = userData => dispatch => {
  return apiCall('get', `/api/${userData.userType === "insurance" ? "insurance" : `${userData.userType}s`}/${userData.id}`)
  .then(function(res) {
    // Set current user
    dispatch(setCurrentUser(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};