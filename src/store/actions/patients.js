import {apiCall} from "../../services/api";
import jwt_decode from "jwt-decode";

import {UPDATE_USER} from "../types";

export const state_update_user = payload => ({
  type: UPDATE_USER,
  payload
});

// Register User
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