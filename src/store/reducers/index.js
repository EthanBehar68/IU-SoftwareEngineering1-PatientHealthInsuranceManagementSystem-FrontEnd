import {combineReducers} from 'redux';
import dark from "./dark";
import user from "./user";
import doctors from "./doctors";
import appointments from "./appointments";
import conversations from "./conversations";
import socket from "./socket";

const rootReducer = combineReducers({
	dark,
	user,
	doctors,
	appointments,
	conversations,
	socket
});

export default rootReducer;