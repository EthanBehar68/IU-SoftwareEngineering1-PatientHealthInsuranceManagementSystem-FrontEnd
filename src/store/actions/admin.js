import {SET_CURRENT_USER, GET_ADMIN_DATA, UPDATE_ADMIN_DATA, GET_PRODUCT_OPTIONS} from "../types";
import empty from 'is-empty';
import {saveAs} from 'file-saver';
import {apiCall} from '../../services/api';
import {flatten} from 'flat';

export const state_get_admin = payload => ({
	type: SET_CURRENT_USER,
	payload
});

export const state_get_admin_data = payload => ({
	type: GET_ADMIN_DATA,
	payload
});

export const state_update_admin_data = payload => ({
	type: UPDATE_ADMIN_DATA,
	payload
});

export const state_get_product_options = payload => ({
	type: GET_PRODUCT_OPTIONS,
	payload
});

export const db_get_admin = user => dispatch => {
	return apiCall('get', `/api/admin/${user.id}`)
	.then(function(res) {
		dispatch(state_get_admin({...user, ...res[0]}));
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, message: err};
	});
}

export const db_admin_get_products = data => dispatch => {
	return apiCall('post', `/api/admin/products`, data)
	.then(function(res) {
		dispatch(state_get_admin_data(res));
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, message: err};
	});
}

export const db_admin_get_product_options = data => dispatch => {
	return apiCall('get', `/api/admin/products/options`)
	.then(function(res) {
		dispatch(state_get_product_options(res));
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, message: err};
	});
}

export const db_add_product = product => dispatch => {
	return apiCall('post', `/api/admin/product/add`, {...product, price: product.price * 100})
	.then(function(res) {
		dispatch(db_admin_get_products({page: 1, amount: 25}))
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, message: err};
	});
}

export const db_admin_get_orders = data => dispatch => {
	return apiCall('post', `/api/admin/orders`, data)
	.then(function(res) {
		dispatch(state_get_admin_data(res));
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, message: err};
	});
}

export const db_get_export_file = (file_name) => dispatch => {
	return apiCall('get', `/api/admin/export`, { responseType: 'blob' })
	.then(function(res) {
		saveAs(res, `${file_name}.xlsx`);
		return {complete: true};
	})
	.catch(function(err) {
		console.log(err);
		return {complete: false, message: err};
	});
}

export const db_export_table = (table, filter, file_name) => dispatch => {
	return apiCall('post', `/api/admin/export`, { table: table, filter: filter })
	.then(function(res) {
		dispatch(db_get_export_file(file_name));
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, message: err};
	});
}

export const db_update_product_active = data => dispatch => {
	return apiCall('put', `/api/admin/product/status`, data)
	.then(function(res) {
		dispatch(state_update_admin_data(data));
		return {complete: true};
	})
	.catch(function(error) {
		return {complete: false, message: error.data.error};
	});
}

