// RxJS Operators
import { catchError, mergeMap, map } from "rxjs/operators";
// Observable Helpers
import { of } from "rxjs/observable/of";
// RxJS Observable
import { combineEpics, ofType } from "redux-observable";
// Epic Helper
import xhr from "../epicHelper";

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
      xhr("GET", `/users/${userId}`).pipe(
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
      xhr("POST", `/users`, userInformation).pipe(
        map((response) => postUserSuccess(response)),
        catchError((err) => {
          return of(postUserError(err));
        })
      )
    )
  );
};

export default combineEpics(getUserEvent, postUserEvent);
