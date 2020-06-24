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
      ajax
        .getJSON(
          `http://${process.env.REACT_APP_BACKEND_HOST}/squads/${squadId}`
        )
        .pipe(
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
      ajax.getJSON(`http://${process.env.REACT_APP_BACKEND_HOST}/squads`).pipe(
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
      ajax
        .post(
          `http://${process.env.REACT_APP_BACKEND_HOST}/squads`,
          squadInformation,
          {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        )
        .pipe(
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
      ajax(`http://${process.env.REACT_APP_BACKEND_HOST}/squads/${squadId}`, {
        type: "PUT",
        data: { squadInformation },
      }).pipe(
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
      ajax(`http://${process.env.REACT_APP_BACKEND_HOST}/squads/${squadId}`, {
        type: "DELETE",
      }).pipe(
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
