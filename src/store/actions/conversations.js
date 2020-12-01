import {apiCall} from '../../services/api';
import empty from 'is-empty';
import {APPEND_MESSAGES, ADD_MESSAGE, UPDATE_CONVERSATION, UPDATE_CONVERSATIONS, PREPEND_MESSAGES, SET_SOCKET_STATUS, USER_TYPING} from '../types';

export const first_socket_connect = payload => ({
	event: 'socketConnect',
	emit: true,
	payload
});

export const add_message = payload => ({
	event: 'send_chat',
	emit: true,
	payload
});

export const user_typing = payload => ({
	event: 'user_typing',
	emit: true,
	payload
});

export const socket_join_room = payload => ({
	event: 'joinroom',
	emit: true,
	payload
});

export const socket_leave_room = payload => ({
	event: 'leaveroom',
	emit: true,
	payload
});

export const state_update_conversation = payload => ({
	type: UPDATE_CONVERSATION,
	room_id: payload.room_id,
	payload
});

export const state_prepend_messages = payload => ({
	type: PREPEND_MESSAGES,
	payload
});

export const state_append_messages = payload => ({
	type: APPEND_MESSAGES,
	payload
});

export const state_listen_for_conversations = () => ({
	event: 'add_conversations',
	handle: UPDATE_CONVERSATIONS
});

export const state_listen_for_messages = () => ({
	event: 'chat_received',
	handle: ADD_MESSAGE
});

export const state_listen_for_typing = () => ({
	event: 'user_typing_received',
	handle: USER_TYPING
});

export const state_listen_for_notifications = () => ({
	event: 'update_notifications',
	handle: UPDATE_CONVERSATION
});

export const state_detect_socket_status = payload => ({
	handle: SET_SOCKET_STATUS,
	check: true,
	payload
});

export const state_setup_socket_status = payload => ({
	type: SET_SOCKET_STATUS,
	payload
})

export const socket_register_listeners = data => dispatch => {
	dispatch(state_listen_for_conversations());
	dispatch(state_listen_for_messages());
	dispatch(state_listen_for_notifications());
	dispatch(state_listen_for_typing());
	dispatch(first_socket_connect(data));
}

export const check_socket_status = (payload) => dispatch => {
	dispatch(state_detect_socket_status(payload));
	setTimeout(() => dispatch(state_detect_socket_status(payload)), 1000);
	const timerId = setInterval(() => dispatch(state_detect_socket_status(payload)), 2000);
	dispatch(state_setup_socket_status({timerId: timerId}));
}

export const db_append_chat_messages = (job_id, customer_included, offset) => (dispatch, getState) => {
	const user = getState().user;
	return apiCall('get', `/messages/${job_id}?customer_included=${customer_included}&offset=${offset}`)
	.then(function(res) {
		dispatch(state_append_messages({job_id: job_id, customer_included: customer_included, messages: res}));
		dispatch(state_update_conversation({job_id: job_id, customer_included: customer_included, noMoreMessages: res.length === 0, room_id: `${customer_included ? 'customer' : 'worker'}${job_id}`, user_id: user.id}));
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, error: err.data.error};
	});
}

export const db_prepend_chat_messages = (job_id, customer_included, id) => (dispatch, getState) => {
	const user = getState().user;
	return apiCall('get', `/messages/prepend/${job_id}?customer_included=${customer_included}&id=${id}`)
	.then(function(res) {
		dispatch(state_prepend_messages({job_id: job_id, customer_included: customer_included, messages: res}));
		dispatch(state_update_conversation({job_id: job_id, customer_included: customer_included, noMoreMessages: res.length === 30, room_id: `${customer_included ? 'customer' : 'worker'}${job_id}`, user_id: user.id}));
		return {complete: true};
	})
	.catch(function(err) {
		return {complete: false, error: err.data.error};
	});
}
