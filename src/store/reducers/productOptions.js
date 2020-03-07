import {GET_PRODUCT_OPTIONS} from '../types';

const productOptions = (state = [], action) => {
	switch(action.type) {
		case GET_PRODUCT_OPTIONS:
			return [...action.payload];
		default:
			return state;
	}
}

export default productOptions;