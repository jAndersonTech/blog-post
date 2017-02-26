import { LOGIN_USER } from '../actions';

const INITIAL_STATE = { uid: "" };

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		
		case LOGIN_USER:
			return action.payload ? { uid: action.payload.uid } : state;
		default:
			return state;
	}
}