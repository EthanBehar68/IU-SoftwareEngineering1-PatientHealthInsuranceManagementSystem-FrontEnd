import {GET_EXAMPLE} from '../types';

const example = (state = [], action) => {
	switch(action.type) {
		case GET_EXAMPLE:
			return [...action.payload];
		default:
			return state;
	}
}

export default example;