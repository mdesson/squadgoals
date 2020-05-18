// REQUEST

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const getUserRequest = (userId) => {
	return {
		type: GET_USER_REQUEST,
		payload: { userId },
	};
};

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const postUserRequest = (userInformation) => {
	return {
		type: POST_USER_REQUEST,
		payload: { userInformation },
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

export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const postUserSuccess = () => {
	return {
		type: POST_USER_SUCCESS,
	};
};

// ERROR

export const GET_USER_ERROR = 'GET_USER_ERROR';
export const getUserError = (error) => ({
	type: GET_USER_ERROR,
	payload: { error },
});

export const POST_USER_ERROR = 'POST_USER_ERROR';
export const postUserError = (error) => ({
	type: POST_USER_ERROR,
	payload: { error },
});
