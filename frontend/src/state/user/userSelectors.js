import { createSelector } from 'reselect';

const userStateSelector = (state) => state.user;

export const userSelector = createSelector(
	[userStateSelector],
	(userState) => userState.user
);

export const userIsLoadingSelector = createSelector(
	[userStateSelector],
	(userState) => userState.isLoading
);
