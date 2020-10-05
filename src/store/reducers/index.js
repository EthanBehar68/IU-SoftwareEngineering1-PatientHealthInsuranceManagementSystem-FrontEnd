import {combineReducers} from 'redux';
import dark from "./dark";
import user from "./user";

const rootReducer = combineReducers({
	dark,
	user
});

export default rootReducer;