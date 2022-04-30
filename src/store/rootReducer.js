import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
// import arts from "./arts/reducer";

export default combineReducers({
  appState,
  user,
  // arts,
});
