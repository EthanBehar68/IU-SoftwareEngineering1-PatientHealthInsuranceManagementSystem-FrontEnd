import {SET_USER} from '../types';

const user = (state = {}, action) => {
	switch(action.type) {
		case SET_USER:
			return action.payload;
		default:
			return state;
	}
}

export default user;