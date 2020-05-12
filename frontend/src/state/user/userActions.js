// REQUEST

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const getUserRequest = (userId) => {
	return {
		type: GET_USER_REQUEST,
		payload: { userId },
	};
};

// SUCCESS

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const getUserSuccess = (user) => {
	return {
		type: GET_USER_SUCCESS,
		payload: { user },
	};
};

// ERROR

export const GET_USER_ERROR = 'GET_USER_ERROR';
export const getUserError = (error) => ({
	type: GET_USER_ERROR,
	payload: { error },
});
