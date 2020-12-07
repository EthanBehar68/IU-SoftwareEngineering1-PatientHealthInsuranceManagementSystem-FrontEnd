import {apiCall} from '../../services/api';
import empty from 'is-empty';
import {APPEND_MESSAGES, ADD_MESSAGE, UPDATE_CONVERSATION, UPDATE_CONVERSATIONS, ADD_CONVERSATION, PREPEND_MESSAGES, SET_SOCKET_STATUS, USER_TYPING} from '../types';

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
	event: 'join_room',
	emit: true,
	handle: ADD_CONVERSATION,
	payload
});

export const socket_join_page = payload => ({
	event: 'join_page',
	emit: true,
	payload
});

export const socket_leave_page = payload => ({
	event: 'leave_page',
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

export const state_listen_for_user_connect = () => ({
	event: 'user_connected',
	handle: UPDATE_CONVERSATION
});

export const state_listen_for_user_disconnect = () => ({
	event: 'user_disconnected',
	handle: UPDATE_CONVERSATION
});

export const socket_register_listeners = data => dispatch => {
	dispatch(state_listen_for_conversations());
	dispatch(state_listen_for_messages());
	dispatch(state_listen_for_typing());
	dispatch(state_listen_for_user_connect());
	dispatch(state_listen_for_user_disconnect());
	dispatch(first_socket_connect(data));
}
