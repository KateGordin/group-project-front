import { LOGIN_SUCCESS, GET_EVENTS } from "./actions";

const initialState = {
  login: null,
  events: [],
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

    default: {
      return state;
    }
  }
}
