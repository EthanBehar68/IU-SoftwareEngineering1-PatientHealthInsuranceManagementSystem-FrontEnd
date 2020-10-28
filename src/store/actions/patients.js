import {apiCall} from "../../services/api";
import jwt_decode from "jwt-decode";

import {UPDATE_USER, GET_DOCTORS} from "../types";

export const state_update_user = payload => ({
  type: UPDATE_USER,
  payload
});

export const state_get_doctors = payload => ({
  type: GET_DOCTORS,
  payload
});

// Update Patient User Info
export const updateBasic = data => dispatch => {
  return apiCall('put', `/api/patients/user`, data)
  .then(function(res) {
    dispatch(state_update_user(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

// Register Patient Medical Data
export const onboardPatient = data => dispatch => {
  return apiCall('post', `/api/patients/onboard`, data)
  .then(function(res) {
    dispatch(state_update_user(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

// Update Patient Medical Data
export const updateMedical = data => dispatch => {
  return apiCall('put', `/api/patients/details`, data)
  .then(function(res) {
    dispatch(state_update_user(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

// Update Patient Profile Picture
export const updateProfilePic = data => {
  return apiCall('put', `/api/patients/profilepic`, data)
  .then(function(res) {
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

// Update Patient Password
export const updatePassword = data => {
  return apiCall('put', `/api/patients/password`, data)
  .then(function(res) {
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

/*--------------------------------------------------------*/

export const getDoctors = data => dispatch => {
  return apiCall('post', `/api/doctorsearch`, data)
  .then(function(res) {
    dispatch(state_get_doctors(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

export const getDoctor = id => {
  return apiCall('get', `/api/doctorsearch/${id}`)
  .then(function(res) {
    return {complete: true, data: res};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};




