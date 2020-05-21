import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_ERROR,
	POST_USER_REQUEST,
	POST_USER_SUCCESS,
	POST_USER_ERROR,
} from './userActions';

const initialState = {
	user: {},
	isLoading: false,
	isSubmitting: false,
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
		case GET_USER_ERROR: {
			return {
				...state,
				isLoading: false,
			};
		}
		case POST_USER_REQUEST: {
			return {
				...state,
				isSubmitting: true,
			};
		}
		case POST_USER_SUCCESS: {
			return {
				...state,
				isSubmitting: false,
			};
		}
		case POST_USER_ERROR: {
			return {
				...state,
				isSubmitting: false,
			}
		}
		
		default:
			return state;
	}
};

export default userReducer;