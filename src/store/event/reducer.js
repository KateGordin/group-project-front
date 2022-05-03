import { LOGIN_SUCCESS, GET_EVENTS, SET_DETAIL_EVENT } from "./actions";

const initialState = {
  login: null,
  events: [],
  detailPage: null,
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_EVENTS: {
      return {
        ...state,
        loading: false,
        events: [...action.payload.events],
      };
    }

    case SET_DETAIL_EVENT:
      // console.log("action", action);
      return { ...state, detailPage: action.payload };

    default: {
      return state;
    }
  }
}
