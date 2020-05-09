// RXJS OPERATORS
import { catchError, mergeMap, map } from 'rxjs/operators';
// OBSERVABLE HELPERS
import { of } from 'rxjs/observable/of';
// RXJS OBSERVABLE
import { ofType } from 'redux-observable';
// AJAX
import { ajax } from 'rxjs/ajax';
// REDUX ACTIONS 
import {
	GET_USER_REQUEST,
	getUserSuccess,
    getUserError,
} from './userActions';

// TODO: Hit actual endpoint for users

const getUserEvent = (action$) => {
	return action$.pipe(
		ofType(GET_USER_REQUEST),
		mergeMap(({ payload: { userId } }) =>
			ajax.getJSON(`/users/${userId}/`).pipe(
				map(({ response }) => getUserSuccess(response)),
				catchError((err) => {
					return (
						of(getUserError(err))
					);
				})
			)
		)
	);
};

export default getUserEvent;