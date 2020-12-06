import {GET_APPOINTMENTS, UPDATE_APPOINTMENTS, ADD_APPOINTMENT} from '../types';

const appointments = (state = [], action) => {
	switch(action.type) {
		case GET_APPOINTMENTS:
			return [...action.payload];
		case UPDATE_APPOINTMENTS:
			return state.map(function(appt) {
				if(appt.id === action.payload.id) {
					return action.payload;
				} else {
					return appt;
				}
			});
		case ADD_APPOINTMENT:
			return [...state, action.payload];
		default:
			return state;
	}
}

export default appointments;