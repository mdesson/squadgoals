// rxjs Operators
import { catchError, mergeMap, map } from "rxjs/operators";
// Observable Helpers
import { of } from "rxjs/observable/of";
// rxjs Observable
import { combineEpics, ofType } from "redux-observable";
// Ajax
import { ajax } from "rxjs/ajax";
// Redux Actions
import {
  GET_USER_REQUEST,
  getUserSuccess,
  getUserError,
  POST_USER_REQUEST,
  postUserSuccess,
  postUserError,
} from "./userActions";

const getUserEvent = (action$) => {
  return action$.pipe(
    ofType(GET_USER_REQUEST),
    mergeMap(({ payload: { userId } }) =>
      ajax
        .getJSON(
          `http://${process.env.REACT_APP_BACKEND_HOST}:3100/users/${userId}/`
        )
        .pipe(
          map((response) => getUserSuccess(response)),
          catchError((err) => {
            return of(getUserError(err));
          })
        )
    )
  );
};

const postUserEvent = (action$) => {
  return action$.pipe(
    ofType(POST_USER_REQUEST),
    mergeMap(({ payload: { userInformation } }) =>
      ajax
        .post(
          `http://${process.env.REACT_APP_BACKEND_HOST}:3100/users/`,
          userInformation,
          { "Content-Type": "application/x-www-form-urlencoded" }
        )
        .pipe(
          map((response) => postUserSuccess(response)),
          catchError((err) => {
            return of(postUserError(err));
          })
        )
    )
  );
};

export default combineEpics(getUserEvent, postUserEvent);
