import {SET_SOCKET_STATUS, SETUP_SOCKET_STATUS} from '../types';

const socket = (state = {timerId: '', status: ''}, action) => {
	switch(action.type) {
		case SET_SOCKET_STATUS:
			return {...state, ...action.payload};
		default:
			return state;
	}
}

export default socket;