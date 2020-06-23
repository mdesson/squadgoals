import { combineReducers } from "redux";

// Combine all reducers into one; this is the expected behaviour of redux.
import userReducer from "./user/userReducer";
import squadReducer from "./squad/squadReducer";

const rootReducer = combineReducers({
  userReducer,
  squadReducer,
});

export default rootReducer;
