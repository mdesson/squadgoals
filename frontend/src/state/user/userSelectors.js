import { createSelector } from 'reselect';

console.log(store);


const userStateSelector = (state) => state.user;

export const userDetailsSelector = createSelector(
	[userStateSelector],
	(userState) => userState.user
);

export const userIsLoadingSelector = createSelector(
	[userStateSelector],
	(userState) => userState.isLoading
);
