import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  ARTIST_UPDATED,
  EVENT_POST_SUCCESS,
  EVENT_DELETE_SUCCESS,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  image: null,
  isArtist: false,
  event: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    //update user profile
    case ARTIST_UPDATED:
      return { ...state, ...action.payload };

    //post event
    case EVENT_POST_SUCCESS:
      return {
        ...state,
        event: [...state.event, { ...action.payload }],
      };

    //delete event
    case EVENT_DELETE_SUCCESS:
      const id = action.payload;
      const newEvents = state.event.filter((eve) => eve.id !== id);
      return {
        ...state,
        event: newEvents,
      };

    default:
      return state;
  }
}
