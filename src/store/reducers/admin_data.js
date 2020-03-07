import {GET_ADMIN_DATA, UPDATE_ADMIN_DATA} from '../types';

const admin_data = (state = [], action) => {
	switch(action.type) {
		case GET_ADMIN_DATA:
			return [...action.payload];
		case UPDATE_ADMIN_DATA:
			return [...state.filter(item => {
				return item.id !== action.payload.id;
			}), action.payload];
		default:
			return state;
	}
}

export default admin_data;