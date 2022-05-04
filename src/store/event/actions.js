import { apiUrl } from "../../config/constants";
import axios from "axios";

export const GET_EVENTS = "getEvents/events";
export const LOGIN_SUCCESS = "loginSuccess/events";
export const SET_DETAIL_EVENT = "getDetailEvent/events";


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
  console.log("!!!response", response.data);

  return {
    type: SET_DETAIL_EVENT,
    payload: response.data,
  };
};




