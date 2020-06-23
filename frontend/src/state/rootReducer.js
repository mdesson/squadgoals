import { combineReducers } from "redux";

// Combine all reducers into one; this is the expected behaviour of redux.
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
