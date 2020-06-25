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
  GET_SQUAD_REQUEST,
  getSquadSuccess,
  getSquadError,
  BROWSE_SQUADS_REQUEST,
  browseSquadsSuccess,
  browseSquadsError,
  POST_SQUAD_REQUEST,
  postSquadSuccess,
  postSquadError,
  PUT_SQUAD_REQUEST,
  putSquadSuccess,
  putSquadError,
  DELETE_SQUAD_REQUEST,
  deleteSquadSuccess,
  deleteSquadError,
} from "./squadActions";

const getSquadEvent = (action$) => {
  return action$.pipe(
    ofType(GET_SQUAD_REQUEST),
    mergeMap(({ payload: { squadId } }) =>
      xhr("GET", `/squads/${squadId}`).pipe(
        map((response) => getSquadSuccess(response)),
        catchError((err) => {
          return of(getSquadError(err));
        })
      )
    )
  );
};

const browseSquadsEvent = (action$) => {
  return action$.pipe(
    ofType(BROWSE_SQUADS_REQUEST),
    mergeMap(() =>
      xhr("GET", `/squads`).pipe(
        map((response) => browseSquadsSuccess(response)),
        catchError((err) => {
          return of(browseSquadsError(err));
        })
      )
    )
  );
};

const postSquadEvent = (action$) => {
  return action$.pipe(
    ofType(POST_SQUAD_REQUEST),
    mergeMap(({ payload: { squadInformation } }) =>
      xhr("POST", `/squads`, squadInformation).pipe(
        map((response) => postSquadSuccess(response)),
        catchError((err) => {
          return of(postSquadError(err));
        })
      )
    )
  );
};

const putSquadEvent = (action$) => {
  return action$.pipe(
    ofType(PUT_SQUAD_REQUEST),
    mergeMap(({ payload: { squadId, squadInformation } }) =>
      xhr("PUT", `/squads/${squadId}`, squadInformation).pipe(
        map((response) => putSquadSuccess(response)),
        catchError((err) => {
          return of(putSquadError(err));
        })
      )
    )
  );
};

const deleteSquadEvent = (action$) => {
  return action$.pipe(
    ofType(DELETE_SQUAD_REQUEST),
    mergeMap(({ payload: { squadId } }) =>
      xhr("DELETE", `/squads/${squadId}`).pipe(
        map((response) => deleteSquadSuccess(response)),
        catchError((err) => {
          return of(deleteSquadError(err));
        })
      )
    )
  );
};

export default combineEpics(
  getSquadEvent,
  browseSquadsEvent,
  postSquadEvent,
  putSquadEvent,
  deleteSquadEvent
);
