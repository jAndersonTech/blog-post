import { FETCH_POSTS, FETCH_SELECTED_POST } from '../actions';

const INITIAL_STATE = { all: [], post: null };

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		
		case FETCH_POSTS:
			return { ...state, all: action.payload };
		case FETCH_SELECTED_POST:
			return { ...state, post: action.payload };
		default:
			return state;
	}
}