import rootReducer from './reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import socketMiddleware from '../utils/socketMiddleware';

export function configureStore(){
	const store = createStore(
		rootReducer, 
		compose(
			applyMiddleware(thunk),
			applyMiddleware(socketMiddleware()),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);

	return store;
}