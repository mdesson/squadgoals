import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_ERROR,
} from './userActions';

const initialState = {
	user: {},
	isLoading: false,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case GET_USER_SUCCESS: {
			return {
				...state,
				user: action.payload.user,
				isLoading: false,
			};
		}
		case GET_USER_ERROR:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};

export default userReducer;