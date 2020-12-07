import {apiCall} from "../../services/api";
import jwt_decode from "jwt-decode";
import empty from "is-empty";
import moment from "moment";

import {UPDATE_USER, GET_DOCTORS, GET_PLANS, GET_APPOINTMENTS, UPDATE_APPOINTMENTS, ADD_APPOINTMENT} from "../types";
import {socket_join_room} from './conversations';

export const state_update_user = payload => ({
  type: UPDATE_USER,
  payload
});

export const state_get_doctors = payload => ({
  type: GET_DOCTORS,
  payload
});

export const state_get_plans = payload => ({
  type: GET_PLANS,
  payload
});

export const state_get_appointments = payload => ({
  type: GET_APPOINTMENTS,
  payload
});

export const state_update_appointments = payload => ({
  type: UPDATE_APPOINTMENTS,
  payload
});

export const state_add_appointment = payload => ({
  type: ADD_APPOINTMENT,
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

/*--------------------------------------------------------*/

export const getAppointments = data => dispatch => {
  return apiCall('post', `/api/bookappointment/get`, data)
  .then(function(res) {
    dispatch(state_get_appointments(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

export const addAppointment = data => dispatch => {
  return apiCall('post', `/api/bookappointment`, data)
  .then(function(res) {
    dispatch(state_add_appointment(res));
    dispatch(socket_join_room({
      userTyping: false, 
      userConnected: false, 
      meConnected: false, 
      messages: [],
      unread: 0,
      time: moment().format(),
      room_id: `${res.id}appt`,
      user_type: 'patient',
      user_id: data.pid
    }));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

export const getPatientAppointments = id => dispatch => {
  return apiCall('get', `/api/patients/${id}/myappointments`)
  .then(function(res) {
    dispatch(state_get_appointments(res));
    return {complete: true};
  })
  .catch(function(err) {
    console.log(err)
    return {complete: false, error: err.data.error};
  });
};

/*--------------------------------------------------------*/

export const addReview = (data, appointment, name) => dispatch => {
  return apiCall('post', `/api/patients/addreview`, data)
  .then(function(res) {
    dispatch(state_update_appointments({...appointment, doctor: {...appointment.doctor, reviews: [...appointment.doctor.reviews, {...res, patientname: name}]}}));
    return {complete: true, data: res};
  })
  .catch(function(err) {
    console.log(err);
    return {complete: false, error: err.data.error};
  });
};

/*--------------------------------------------------------*/

export const getPlans = data => dispatch => {
  return apiCall('post', `/api/insurancesearch`, data)
  .then(function(res) {
    dispatch(state_get_plans(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

export const getSimilarPlans = id => dispatch => {
  return apiCall('get', `/api/insurancesearch/similar/${id}`)
  .then(function(res) {
    dispatch(state_get_plans(res));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

export const addPlan = data => dispatch => {
  return apiCall('post', `/api/patients/insurance/add`, data)
  .then(function(res) {
    dispatch(state_update_user({id: data.id, insurance: res}));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

export const updatePlan = data => dispatch => {
  return apiCall('put', `/api/patients/insurance/update`, data)
  .then(function(res) {
    dispatch(state_update_user({id: data.id, insurance: res}));
    return {complete: true};
  })
  .catch(function(err) {
    return {complete: false, error: err.data.error};
  });
};

