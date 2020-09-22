import {apiCall} from '../../services/api';
import {GET_EXAMPLE} from '../types';
import empty from 'is-empty';

export const state_get_example = payload => ({
	type: GET_EXAMPLE,
	payload
});

export const db_get_example = () => dispatch => {
	return apiCall('get', `/api/example`)
	.then(function(res) {
		dispatch(state_get_example(res));
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, message: err.error};
	});
}