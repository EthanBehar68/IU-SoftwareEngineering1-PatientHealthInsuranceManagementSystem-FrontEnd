import {combineReducers} from 'redux';
import auth from "./auth";
import errors from "./errors";
import footer from "./footer";
import admin_data from "./admin_data";
import products from "./products";
import productOptions from "./productOptions";

const rootReducer = combineReducers({
	auth,
	errors,
	footer,
	admin_data,
	products,
	productOptions
});

export default rootReducer;