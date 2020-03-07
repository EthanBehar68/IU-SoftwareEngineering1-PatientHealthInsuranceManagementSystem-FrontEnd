import {apiCall} from '../../services/api';

export const db_charge_customer = data => dispatch => {
	return apiCall('post', `/api/payments/charge`, data)
	.then(function(res) {
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, message: err.error};
	});
}