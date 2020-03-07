import {apiCall} from '../../services/api';
import {GET_PRODUCTS} from '../types';
import empty from 'is-empty';

export const state_get_products = payload => ({
	type: GET_PRODUCTS,
	payload
});

export const db_get_products = () => dispatch => {
	return apiCall('get', `/api/products/active`)
	.then(function(res) {
		dispatch(state_get_products(res));
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, message: err.error};
	});
}