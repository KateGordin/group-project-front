import { apiUrl } from "../../config/constants";
import axios from "axios";

export const GET_EVENTS = "getEvents/events";
export const LOGIN_SUCCESS = "loginSuccess/events";
export const SET_DETAIL_EVENT = "getDetailEvent/events";
export const FILTER_EVENTS = "EVENTS_FILTERED";
export const UPDATE_TICKETS = "UPDATE_TICKETS";
export const UPDATE_EVENT_TICKETS = "UPDATE_EVENT_TICKETS";

export const loginSuccess = (artistWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: artistWithToken,
  };
};

const getEvents = (events) => ({
  type: GET_EVENTS,
  payload: { events },
});

export const fetchEvents = async (dispatch, getState) => {
  const response = await axios.get(`${apiUrl}/events`);
  dispatch(getEvents(response.data.events));
  console.log(response);
};

//get one specific event from back
export const getDetailEvent = async (id) => {
  const response = await axios.get(`${apiUrl}/events/${id}`);
  // console.log("!!!response", response.data);

  return {
    type: SET_DETAIL_EVENT,
    payload: response.data,
  };
};

//tickets
export const updateTicket =
  async (ticketId, numberOfTickets, type, token) => async (dispatch) => {
    const res = await axios.post(`${apiUrl}/events/buyticket`, {
      ticketId,
      numberOfTickets,
    });
    console.log("res tickets", res);
    dispatch({
      type,
      payload: res.data,
      token,
    });
  };

export const filterEvents = (events) => ({
  type: FILTER_EVENTS,
  payload: events,
});
