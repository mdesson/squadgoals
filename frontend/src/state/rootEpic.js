import { combineEpics } from "redux-observable";

import userEpics from "./user/userEpics";
import squadEpics from "./squad/squadEpics";

// Combine all epics into one; this is the expected behaviour of redux-observable.
const rootEpic = combineEpics(userEpics, squadEpics);

export default rootEpic;
