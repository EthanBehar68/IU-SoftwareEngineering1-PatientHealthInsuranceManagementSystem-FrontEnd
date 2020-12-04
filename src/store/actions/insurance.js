import {apiCall} from "../../services/api";
import jwt_decode from "jwt-decode";

import {UPDATE_USER, GET_PLANS, ADD_PLAN, UPDATE_PLAN} from "../types";

export const state_update_user = payload => ({
  type: UPDATE_USER,
  payload
});

export const state_get_plans = payload => ({
  type: GET_PLANS,
  payload
});

export const state_add_plan = payload => ({
  type: ADD_PLAN,
  payload
});

export const state_update_plan = payload => ({
  type: UPDATE_PLAN,
  payload
});

// Update Patient User Info
export const updateBasic = data => dispatch => {
  return apiCall('put', `/api/insurance/user`, data)
  .then(function(res) {
    dispatch(state_update_user(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

// Register Patient Medical Data
export const onboardInsurance = data => dispatch => {
  return apiCall('post', `/api/insurance/onboard`, data)
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
  return apiCall('put', `/api/insurance/details`, data)
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
  return apiCall('put', `/api/insurance/profilepic`, data)
  .then(function(res) {
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

// Update Patient Password
export const updatePassword = data => {
  return apiCall('put', `/api/insurance/password`, data)
  .then(function(res) {
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

/*--------------------------------------------------------*/

export const getPlans = id => dispatch => {
  return apiCall('get', `/api/insurance/plans/${id}`)
  .then(function(res) {
    dispatch(state_get_plans(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

export const addPlan = data => dispatch => {
  return apiCall('post', `/api/insurance/plan`, data)
  .then(function(res) {
    dispatch(state_add_plan(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

export const updatePlan = data => dispatch => {
  return apiCall('put', `/api/insurance/plan/${data.id}`, data)
  .then(function(res) {
    dispatch(state_update_plan(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};




