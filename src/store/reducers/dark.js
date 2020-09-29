import {SET_DARK} from '../types';

const example = (state = false, action) => {
	switch(action.type) {
		case SET_DARK:
			return action.payload;
		default:
			return state;
	}
}

export default example;