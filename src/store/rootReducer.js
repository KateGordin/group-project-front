import { combineReducers } from "redux";
import appState from "./appState/reducer";
import artist from "./artist/reducer";
import allArtist from "./allArtist/reducer";
import eventsReducer from "./event/reducer";

export default combineReducers({
  appState,
  artist,
  eventsReducer,
  allArtist,
});
