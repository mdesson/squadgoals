import { combineEpics } from "redux-observable";

import userEpics from "./user/userEpics";

// Combine all epics into one; this is the expected behaviour of redux-observable.
const rootEpic = combineEpics(userEpics);

export default rootEpic;
