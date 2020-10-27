import {combineReducers} from 'redux';
import dark from "./dark";
import user from "./user";
import doctors from "./doctors";

const rootReducer = combineReducers({
	dark,
	user,
	doctors
});

export default rootReducer;