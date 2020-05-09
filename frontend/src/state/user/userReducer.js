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
		// REQUEST 
		case GET_USER_REQUEST:
			return {
				...state,
				isLoading: true,
            };
        // SUCCESS
        case GET_USER_SUCCESS: {
            return {
                ...state,
                utilityOptions: action.payload.user,
                isLoading: false,
            };
        }
        // ERROR
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