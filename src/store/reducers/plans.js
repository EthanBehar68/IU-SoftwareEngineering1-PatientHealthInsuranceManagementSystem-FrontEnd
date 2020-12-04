import {GET_PLANS, UPDATE_PLAN, ADD_PLAN} from '../types';

const plans = (state = [], action) => {
	switch(action.type) {
		case GET_PLANS:
			return [...action.payload];
		case UPDATE_PLAN:
			return state.map(function(plan) {
				if(plan.id === action.payload.id) {
					return action.payload;
				} else {
					return plan;
				}
			});
		case ADD_PLAN:
			return [...state, action.payload];
		default:
			return state;
	}
}

export default plans;