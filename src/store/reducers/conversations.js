import {APPEND_MESSAGES, UPDATE_CONVERSATION, UPDATE_CONVERSATIONS, ADD_MESSAGE, PREPEND_MESSAGES, USER_TYPING} from '../types';

const mockState = [
	{
		room_id: '123appt',
		user_id: 0,
		user_type: 'patient',
		unread: 0,
		time: '2020-06-15T20:24:32.747Z',
		messages: [],
		userTyping: false,
		userConnected: false
	}
]

const conversations = (state = [], action) => {
	switch(action.type) {
		case UPDATE_CONVERSATION:
			return state.map(function(convo) {
				if(convo.room_id === action.payload.room_id) {
					return {...convo, ...action.payload};
				} else {
					return convo;
				}
			});
		case UPDATE_CONVERSATIONS:
			return action.payload.map(function(convo) {
				const existing = state.filter(c => (c.room_id === convo.room_id));
				return existing.length === 0 ? convo : {...existing[0], ...convo};
			});
		case USER_TYPING:
			return state.map(function(convo) {
				if(convo.room_id === action.payload.room_id) {
					return {...convo, userTyping: action.payload.userTyping};
				} else {
					return convo;
				}
			});
		case APPEND_MESSAGES:
			return state.map(function(convo) {
				if(convo.room_id === action.payload.room_id){
					return {
						...convo,
						messages: [...convo.messages, ...action.payload.messages]
					};
				} else {
					return convo;
				}
			});
		case PREPEND_MESSAGES:
			return state.map(function(convo) {
				if(convo.room_id === action.payload.room_id){
					return {
						...convo,
						messages: [...action.payload.messages, ...convo.messages]
					};
				} else {
					return convo;
				}
			});
		case ADD_MESSAGE:
			return state.map(function(convo) {
				if(convo.room_id === action.payload[0].room_id){
					return {
						...convo,
						messages: [...convo.messages, ...action.payload]
					};
				} else {
					return convo;
				}
			});
		default:
			return state;
	}
}

export default conversations;