import { createSelector } from 'reselect';

const userStateSelector = (state) => state.userReducer;

export const userDetailsSelector = createSelector(
	[userStateSelector],
	(userState) => userState.user
);

export const userIsLoadingSelector = createSelector(
	[userStateSelector],
	(userState) => userState.isLoading
);
