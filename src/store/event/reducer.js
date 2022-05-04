import {
  LOGIN_SUCCESS,
  GET_EVENTS,
  SET_DETAIL_EVENT,
  FILTER_EVENTS,
  UPDATE_TICKETS,
  UPDATE_EVENT_TICKETS,
} from "./actions";

const initialState = {
  login: null,
  events: [],
  filteredEvents: [],
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

    //update tickets foe detail page
    case UPDATE_TICKETS: {
      console.log("action????", action);
      return {
        ...state,
        detailPage: { ...state.detailPage, tickets: [action.payload] },
      };
    }

    //update tickets for event page
    case UPDATE_EVENT_TICKETS: {
      state.events.forEach((event) => {
        if (event.id === action.payload.eventId) {
          event.tickets = [action.payload];
        }
      });
      return {
        ...state,
        events: [...state.events],
      };
    }

    case SET_DETAIL_EVENT:
      // console.log("action", action);
      return { ...state, detailPage: action.payload };
    case FILTER_EVENTS: {
      const filteredEvents = state.events.filter((event) => {
        return (
          event.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          event.artist.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      });
      return {
        ...state,
        filteredEvents: filteredEvents,
      };
    }

    default: {
      return state;
    }
  }
}
