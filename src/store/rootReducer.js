import { combineReducers } from "redux";
import appState from "./appState/reducer";
import artist from "./artist/reducer";
// import arts from "./arts/reducer";

export default combineReducers({
  appState,
  artist,
  // arts,
});
