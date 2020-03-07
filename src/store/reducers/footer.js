import {SET_FOOTER} from '../types';

const footer = (state = "", action) => {
	switch(action.type) {
		case SET_FOOTER:
			return action.payload;
		default:
			return state;
	}
}

export default footer;