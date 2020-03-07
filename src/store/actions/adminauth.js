import {apiCall} from "../../services/api";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

import {GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from "../types";

// Login - get user token
export const loginUser = userData => dispatch => {
  return apiCall('post', `/api/login/admin`, userData)
  .then(function(res) {
    const token = res.token;
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);

    return apiCall('get', `/api/admin/${decoded.id}`)
    .then(function(res) {
      // Set current user
      dispatch(setCurrentAdmin({...decoded, ...res[0]}));
      return {complete: true};
    })
    .catch(function(err) {
      console.log(err);
      return {complete: false, message: err.data.error};
    });

  })
  .catch(function(err) {
    console.log(err);
    return {complete: false, message: err.data.error};
  });
};
// Set logged in user
export const setCurrentAdmin = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutAdmin = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentAdmin({}));
};